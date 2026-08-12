export const protectedBranches = ["main", "develop"];

export const branchTypes = [
  {
    value: "feat",
    name: "feat:     A new feature",
    defaultBase: "develop",
  },
  {
    value: "fix",
    name: "fix:      A non-production bug fix",
    defaultBase: "develop",
  },
  {
    value: "hotfix",
    name: "hotfix:   An urgent production fix",
    defaultBase: "main",
  },
  {
    value: "refactor",
    name: "refactor: Code restructuring without changing behavior",
    defaultBase: "develop",
  },
  {
    value: "docs",
    name: "docs:     Documentation changes",
    defaultBase: "develop",
  },
  {
    value: "test",
    name: "test:     Add or update tests",
    defaultBase: "develop",
  },
  {
    value: "chore",
    name: "chore:    Repository maintenance and tooling",
    defaultBase: "develop",
  },
  {
    value: "release",
    name: "release:  Prepare a versioned release",
    defaultBase: "develop",
  },
];

export const regularBranchTypes = branchTypes
  .map(({ value }) => value)
  .filter((value) => value !== "release");

export const minimumBranchSlugLength = 5;

export const kebabCasePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const releaseVersionPattern =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

export function getBranchType(type) {
  return branchTypes.find(({ value }) => value === type) ?? null;
}

export function getDefaultBaseBranch(type) {
  return getBranchType(type)?.defaultBase ?? null;
}

export function isProtectedBranch(branch) {
  return protectedBranches.includes(branch);
}

export function isKebabCase(value) {
  return kebabCasePattern.test(value);
}

export function isValidReleaseVersion(value) {
  return releaseVersionPattern.test(value);
}
