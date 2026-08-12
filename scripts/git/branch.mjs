import { execFileSync, spawnSync } from "node:child_process";

import { confirm, input, select } from "@inquirer/prompts";

import {
  branchTypes,
  getDefaultBaseBranch,
  isKebabCase,
  isValidReleaseVersion,
  minimumBranchSlugLength,
} from "./branch-policy.mjs";
import { getWorkspaceScopes } from "./scopes.mjs";

const isDryRun = process.argv.includes("--dry-run");

function runGit(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function runGitInteractive(args) {
  execFileSync("git", args, {
    stdio: "inherit",
  });
}

function gitSucceeds(args) {
  return (
    spawnSync("git", args, {
      stdio: "ignore",
    }).status === 0
  );
}

function getCurrentBranch() {
  return runGit(["branch", "--show-current"]);
}

function getLocalBranches() {
  return runGit(["for-each-ref", "--format=%(refname:short)", "refs/heads/"])
    .split(/\r?\n/)
    .filter(Boolean);
}

function getRemoteBranches() {
  return runGit(["for-each-ref", "--format=%(refname:short)", "refs/remotes/"])
    .split(/\r?\n/)
    .filter((branch) => branch && !branch.endsWith("/HEAD"));
}

function hasOriginRemote() {
  return gitSucceeds(["remote", "get-url", "origin"]);
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveRecommendedBase(defaultBase, localBranches, remoteBranches) {
  if (localBranches.includes(defaultBase)) {
    return defaultBase;
  }

  const originBase = `origin/${defaultBase}`;

  if (remoteBranches.includes(originBase)) {
    return originBase;
  }

  return null;
}

function isRecommendedBase(baseBranch, defaultBase, remoteBranches) {
  if (baseBranch === defaultBase) {
    return true;
  }

  return remoteBranches.some((remoteBranch) => {
    if (remoteBranch !== baseBranch) {
      return false;
    }

    const [, ...parts] = remoteBranch.split("/");

    return parts.join("/") === defaultBase;
  });
}

function branchExists(branchName, remoteBranches) {
  const localExists = gitSucceeds(["show-ref", "--verify", "--quiet", `refs/heads/${branchName}`]);

  const remoteExists = remoteBranches.some((remoteBranch) => {
    const [, ...parts] = remoteBranch.split("/");

    return parts.join("/") === branchName;
  });

  return localExists || remoteExists;
}

async function chooseScope() {
  const scopes = getWorkspaceScopes();

  const scope = await select({
    message: "Select the branch scope:",
    choices: [
      ...scopes.map((value) => ({
        name: value,
        value,
      })),
      {
        name: "custom",
        value: "custom",
        description: "Enter a custom kebab-case scope",
      },
    ],
  });

  if (scope !== "custom") {
    return scope;
  }

  return input({
    message: "Enter a custom scope:",
    required: true,
    validate(value) {
      return isKebabCase(value.trim()) || "Scope must use kebab-case.";
    },
  });
}

async function createBranchName(type) {
  if (type === "release") {
    const version = await input({
      message: "Enter the release version:",
      required: true,
      validate(value) {
        return (
          isValidReleaseVersion(value.trim()) || 'Use a version such as "1.0.0" or "2.0.0-beta.1".'
        );
      },
    });

    return `release/${version.trim()}`;
  }

  const scope = await chooseScope();

  const description = await input({
    message: "Describe the branch:",
    required: true,
    validate(value) {
      const slug = slugify(value);

      if (slug.length < minimumBranchSlugLength) {
        return `Description must produce a slug of at least ${minimumBranchSlugLength} characters.`;
      }

      return isKebabCase(slug) || "Description must produce a valid kebab-case slug.";
    },
  });

  return `${type}/${scope.trim()}/${slugify(description)}`;
}

async function maybeFetchOrigin() {
  if (!hasOriginRemote()) {
    return;
  }

  const shouldFetch = await confirm({
    message: "Fetch latest remote branches from origin?",
    default: false,
  });

  if (!shouldFetch) {
    return;
  }

  if (isDryRun) {
    console.log("\n[dry-run] Skipping: git fetch origin --prune\n");
    return;
  }

  runGitInteractive(["fetch", "origin", "--prune"]);
}

async function chooseBaseBranch(type) {
  await maybeFetchOrigin();

  const currentBranch = getCurrentBranch();
  const localBranches = getLocalBranches();
  const remoteBranches = getRemoteBranches();

  const defaultBase = getDefaultBaseBranch(type);

  const recommendedBase = resolveRecommendedBase(defaultBase, localBranches, remoteBranches);

  const choices = [];

  if (recommendedBase) {
    choices.push({
      name: `Recommended: ${recommendedBase}`,
      value: {
        kind: "branch",
        branch: recommendedBase,
      },
    });
  } else {
    choices.push({
      name: `Recommended: ${defaultBase}`,
      value: {
        kind: "unavailable",
      },
      disabled: `"${defaultBase}" does not exist locally or on origin`,
    });
  }

  if (currentBranch) {
    choices.push({
      name: `Current branch: ${currentBranch}`,
      value: {
        kind: "branch",
        branch: currentBranch,
      },
    });
  }

  if (localBranches.length > 0) {
    choices.push({
      name: "Choose another local branch",
      value: {
        kind: "local",
      },
    });
  }

  if (remoteBranches.length > 0) {
    choices.push({
      name: "Choose a remote branch",
      value: {
        kind: "remote",
      },
    });
  }

  const selection = await select({
    message: "Choose the base branch:",
    choices,
  });

  if (selection.kind === "branch") {
    return selection.branch;
  }

  if (selection.kind === "local") {
    return select({
      message: "Select a local base branch:",
      choices: localBranches.map((branch) => ({
        name: branch,
        value: branch,
      })),
    });
  }

  if (selection.kind === "remote") {
    return select({
      message: "Select a remote base branch:",
      choices: remoteBranches.map((branch) => ({
        name: branch,
        value: branch,
      })),
    });
  }

  throw new Error("Unable to select a base branch.");
}

async function confirmBaseBranch(type, baseBranch) {
  const defaultBase = getDefaultBaseBranch(type);
  const remoteBranches = getRemoteBranches();

  if (isRecommendedBase(baseBranch, defaultBase, remoteBranches)) {
    return;
  }

  const message =
    type === "hotfix"
      ? `Hotfix branches normally start from "${defaultBase}". Using "${baseBranch}" may include unreleased changes. Continue?`
      : `Recommended base for "${type}" is "${defaultBase}", but you selected "${baseBranch}". Continue?`;

  const shouldContinue = await confirm({
    message,
    default: false,
  });

  if (!shouldContinue) {
    console.log("Branch creation cancelled.");
    process.exit(0);
  }
}

async function handleDirtyTree(branchName) {
  const status = runGit(["status", "--porcelain"]);

  if (!status) {
    return false;
  }

  if (isDryRun) {
    console.log("\n[dry-run] Working tree contains uncommitted changes.");
    console.log("[dry-run] No files will be modified or stashed.\n");

    return false;
  }

  const action = await select({
    message: "You have uncommitted changes. How should they be handled?",
    choices: [
      {
        name: "Continue with the changes",
        value: "continue",
        description: "Git may refuse the switch if files would be overwritten",
      },
      {
        name: "Stash changes, create branch, then re-apply them",
        value: "stash",
      },
      {
        name: "Cancel",
        value: "cancel",
      },
    ],
  });

  if (action === "cancel") {
    console.log("Branch creation cancelled.");
    process.exit(0);
  }

  if (action === "continue") {
    return false;
  }

  runGitInteractive(["stash", "push", "-u", "-m", `branch-wizard:${branchName}`]);

  return true;
}

async function main() {
  const type = await select({
    message: "Select the branch type:",
    choices: branchTypes.map(({ name, value }) => ({
      name,
      value,
    })),
  });

  const branchName = await createBranchName(type);

  if (!gitSucceeds(["check-ref-format", "--branch", branchName])) {
    throw new Error(`Git rejected the branch name "${branchName}".`);
  }

  let remoteBranches = getRemoteBranches();

  if (branchExists(branchName, remoteBranches)) {
    throw new Error(`Branch "${branchName}" already exists.`);
  }

  const baseBranch = await chooseBaseBranch(type);

  await confirmBaseBranch(type, baseBranch);

  remoteBranches = getRemoteBranches();

  if (branchExists(branchName, remoteBranches)) {
    throw new Error(`Branch "${branchName}" already exists.`);
  }

  console.log("\n----------------------------------------");
  console.log(`Branch: ${branchName}`);
  console.log(`Base:   ${baseBranch}`);
  console.log("----------------------------------------\n");

  const shouldCreate = await confirm({
    message: isDryRun ? "Finish this dry run?" : "Create this branch?",
    default: true,
  });

  if (!shouldCreate) {
    console.log("Branch creation cancelled.");
    return;
  }

  const stashed = await handleDirtyTree(branchName);

  if (isDryRun) {
    console.log(`\n[dry-run] git switch --no-track -c ${branchName} ${baseBranch}\n`);

    return;
  }

  try {
    runGitInteractive(["switch", "--no-track", "-c", branchName, baseBranch]);
  } catch (error) {
    if (stashed) {
      console.error("\nBranch creation failed. Your changes are still available in the Git stash.");
    }

    throw error;
  }

  if (stashed) {
    try {
      runGitInteractive(["stash", "pop", "--index"]);
    } catch {
      console.error("\nBranch was created, but Git could not cleanly re-apply the stash.");
      console.error("Resolve the stash conflicts manually.");

      process.exitCode = 1;

      return;
    }
  }

  console.log(`\nCreated and switched to "${branchName}".`);
}

main().catch((error) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("\nBranch creation cancelled.");
    process.exit(130);
  }

  console.error(error instanceof Error ? `\n${error.message}` : "\nUnexpected error.");

  process.exit(1);
});
