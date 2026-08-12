import { defineConfig } from "cz-git";

import { getWorkspaceScopes } from "./scripts/git/scopes.mjs";

const commitTypes = [
  {
    value: "feat",
    name: "feat:     A new feature",
  },
  {
    value: "fix",
    name: "fix:      A bug fix",
  },
  {
    value: "refactor",
    name: "refactor: A code change that neither fixes a bug nor adds a feature",
  },
  {
    value: "perf",
    name: "perf:     A code change that improves performance",
  },
  {
    value: "test",
    name: "test:     Add or update tests",
  },
  {
    value: "docs",
    name: "docs:     Documentation-only changes",
  },
  {
    value: "style",
    name: "style:    Formatting or code-style changes",
  },
  {
    value: "build",
    name: "build:    Build system or dependency changes",
  },
  {
    value: "ci",
    name: "ci:       CI configuration or scripts",
  },
  {
    value: "chore",
    name: "chore:    Repository maintenance and tooling",
  },
  {
    value: "revert",
    name: "revert:   Revert a previous commit",
  },
];

const commitTypeValues = commitTypes.map(({ value }) => value);

export default defineConfig({
  extends: ["@commitlint/config-conventional"],

  rules: {
    "type-enum": [2, "always", commitTypeValues],

    "type-empty": [2, "never"],

    "scope-empty": [2, "never"],
    "scope-case": [2, "always", "kebab-case"],

    "subject-empty": [2, "never"],
    "subject-min-length": [2, "always", 10],

    "header-max-length": [2, "always", 100],
  },

  prompt: {
    messages: {
      type: "Select the type of change:",
      scope: "Select the scope of this change:",
      customScope: "Enter a custom scope:",
      subject: "Write a short imperative description:",
      body: "Provide a longer description if needed (optional):\n",
      breaking: "Describe the breaking change (optional):\n",
      footerPrefixSelect: "Does this change reference an issue?",
      customFooterPrefix: "Enter the issue prefix:",
      footer: 'Enter issue references, e.g. "#123":\n',
      confirmCommit: "Create this commit?",
    },

    types: commitTypes,

    scopes: getWorkspaceScopes(),

    allowCustomScopes: true,
    allowEmptyScopes: false,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",

    useEmoji: false,

    minSubjectLength: 10,
    maxHeaderLength: 100,

    markBreakingChangeMode: true,
    allowBreakingChanges: commitTypeValues,

    issuePrefixes: [
      {
        value: "Refs",
        name: "Refs:      Reference an issue",
      },
      {
        value: "Fixes",
        name: "Fixes:     Fix an issue",
      },
      {
        value: "Closes",
        name: "Closes:    Close an issue",
      },
    ],

    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    customIssuePrefixAlign: "bottom",
    customIssuePrefixAlias: "custom",
    emptyIssuePrefixAlias: "skip",

    confirmColorize: true,
  },
});
