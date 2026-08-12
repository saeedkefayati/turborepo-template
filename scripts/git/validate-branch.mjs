import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

import {
  isKebabCase,
  isProtectedBranch,
  isValidReleaseVersion,
  minimumBranchSlugLength,
  regularBranchTypes,
} from "./branch-policy.mjs";

function runGit(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function gitAcceptsBranchName(branchName) {
  try {
    execFileSync("git", ["check-ref-format", "--branch", branchName], {
      stdio: "ignore",
    });

    return true;
  } catch {
    return false;
  }
}

export function validateBranchName(branchName) {
  const errors = [];

  if (!branchName) {
    return ["Branch name cannot be empty."];
  }

  if (!gitAcceptsBranchName(branchName)) {
    return [`Git rejected "${branchName}" as an invalid branch name.`];
  }

  if (isProtectedBranch(branchName)) {
    return [];
  }

  const parts = branchName.split("/");
  const type = parts[0];

  if (type === "release") {
    if (parts.length !== 2) {
      return ['Release branches must use "release/<version>".'];
    }

    const version = parts[1];

    if (!isValidReleaseVersion(version)) {
      errors.push('Release version must look like "1.0.0" or "2.0.0-beta.1".');
    }

    return errors;
  }

  if (parts.length !== 3) {
    return ['Regular branches must use "<type>/<scope>/<slug>".'];
  }

  const [, scope, slug] = parts;

  if (!regularBranchTypes.includes(type)) {
    errors.push(`Branch type must be one of: ${regularBranchTypes.join(", ")}.`);
  }

  if (!isKebabCase(scope)) {
    errors.push("Branch scope must use kebab-case.");
  }

  if (!isKebabCase(slug)) {
    errors.push("Branch slug must use kebab-case.");
  }

  if (slug.length < minimumBranchSlugLength) {
    errors.push(`Branch slug must contain at least ${minimumBranchSlugLength} characters.`);
  }

  return errors;
}

function printPolicy() {
  console.error("\nExpected branch formats:");
  console.error("  main");
  console.error("  develop");
  console.error("  <type>/<scope>/<slug>");
  console.error("  release/<version>");
  console.error(`\nAllowed regular types: ${regularBranchTypes.join(", ")}`);
}

function assertValidBranch(branchName) {
  const errors = validateBranchName(branchName);

  if (errors.length === 0) {
    console.log(`Branch "${branchName}" follows the branch policy.`);

    return true;
  }

  console.error(`\nInvalid branch name: "${branchName}"`);

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  printPolicy();

  return false;
}

function validateCurrentBranch() {
  const branchName = runGit(["branch", "--show-current"]);

  if (!branchName) {
    console.error("Cannot validate branch name while HEAD is detached.");

    return false;
  }

  return assertValidBranch(branchName);
}

function validatePushRefs() {
  const input = readFileSync(0, "utf8");

  if (!input.trim()) {
    return true;
  }

  const branches = new Set();

  for (const line of input.trim().split(/\r?\n/)) {
    const [localRef, , remoteRef] = line.trim().split(/\s+/);

    if (localRef === "(delete)") {
      continue;
    }

    if (!remoteRef?.startsWith("refs/heads/")) {
      continue;
    }

    branches.add(remoteRef.slice("refs/heads/".length));
  }

  let valid = true;

  for (const branchName of branches) {
    if (!assertValidBranch(branchName)) {
      valid = false;
    }
  }

  return valid;
}

function validateNamedBranch() {
  const nameIndex = process.argv.indexOf("--name");
  const branchName = process.argv[nameIndex + 1];

  if (!branchName) {
    console.error('Usage: validate-branch.mjs --name "<branch>"');

    return false;
  }

  return assertValidBranch(branchName);
}

function main() {
  let valid;

  if (process.argv.includes("--stdin")) {
    valid = validatePushRefs();
  } else if (process.argv.includes("--name")) {
    valid = validateNamedBranch();
  } else {
    valid = validateCurrentBranch();
  }

  if (!valid) {
    process.exitCode = 1;
  }
}

main();
