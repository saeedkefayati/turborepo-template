# Turborepo Template

[![CI](https://github.com/saeedkefayati/turborepo-template/actions/workflows/ci.yml/badge.svg)](https://github.com/saeedkefayati/turborepo-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

![Turborepo](https://img.shields.io/badge/Turborepo-000000?style=flat-square&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=000000)
![Docusaurus](https://img.shields.io/badge/Docusaurus-3ECC5F?style=flat-square&logo=docusaurus&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

A production-oriented TypeScript monorepo template for building modern web applications, engineering documentation, and reusable React design systems.

The repository provides a shared development workflow around Turborepo, pnpm, Next.js, Docusaurus, Storybook, automated quality gates, cross-platform tooling, and Vercel deployments.

## Live Deployments

| Project | Description               | Live                                                       |
| ------- | ------------------------- | ---------------------------------------------------------- |
| Web     | Next.js application       | [Open Web](https://web-turborepo-template.vercel.app)      |
| Docs    | Engineering documentation | [Open Docs](https://docs-turborepo-template.vercel.app)    |
| UI      | Storybook design system   | [Open Storybook](https://ui-turborepo-template.vercel.app) |

## Overview

This repository contains three primary deployable workspaces:

| Workspace     | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `apps/web`    | Main Next.js application                        |
| `apps/docs`   | Engineering documentation powered by Docusaurus |
| `packages/ui` | Shared React design system and Storybook        |

The repository also contains shared packages for TypeScript and ESLint configuration.

## Tech Stack

### Applications

- Next.js
- React
- TypeScript
- Docusaurus

### Design System

- React
- Storybook
- Tailwind CSS
- Class Variance Authority
- clsx
- tailwind-merge

The design system includes:

- semantic design tokens
- light, dark, and system themes
- LTR and RTL support
- accessibility-focused components
- Storybook documentation and browser tests
- reusable form controls and primitives
- SSR-friendly and framework-neutral component architecture

### Tooling

- Turborepo
- pnpm workspaces
- mise
- ESLint
- Prettier
- Remark
- Vitest
- Playwright
- Lefthook
- Commitlint
- Commitizen / cz-git
- GitHub Actions
- Vercel

## Repository Structure

```text
.
├── apps
│   ├── docs
│   └── web
│
├── packages
│   ├── eslint-config
│   ├── typescript-config
│   └── ui
│
├── scripts
│   └── git
│
├── .github
│   └── workflows
│
├── lefthook.yml
├── mise.toml
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

### `apps/web`

The main application built with Next.js.

### `apps/docs`

The engineering documentation site built with Docusaurus.

Documentation covers:

- architecture
- development workflows
- tooling
- design-system conventions
- CI and quality gates
- maintenance
- Architecture Decision Records

### `packages/ui`

A framework-neutral and SSR-friendly React design-system package.

It currently includes foundations and components such as:

- Button
- Input
- Textarea
- Checkbox
- Radio
- Switch
- Select
- Label
- Field
- Fieldset
- Legend

Storybook is used as the development, documentation, testing, and deployment surface for the design system.

## Getting Started

### Prerequisites

The repository uses `mise` to provision the pinned Node.js and pnpm toolchain.

Clone the repository:

```bash
git clone https://github.com/saeedkefayati/turborepo-template.git
cd turborepo-template
```

Install the pinned toolchain and dependencies:

```bash
mise trust
mise install --locked
pnpm install --frozen-lockfile
```

## Development

Start all development environments:

```bash
pnpm dev
```

The default local services are:

```text
Web        http://localhost:3000
Docs       http://localhost:3001
Storybook  http://localhost:6006
```

Individual workspaces can also be started separately.

### Web

```bash
pnpm --filter web dev
```

### Docs

```bash
pnpm --filter docs dev
```

### Storybook

```bash
pnpm --filter @repo/ui dev
```

## Quality Commands

### Full Repository Verification

Run the complete repository quality contract with:

```bash
pnpm verify
```

The full verification workflow covers:

- formatting
- MDX validation
- linting
- TypeScript checks
- browser tests
- accessibility checks
- application builds
- Storybook production build

### Individual Commands

```bash
pnpm format:check
pnpm lint
pnpm check-types
pnpm test
pnpm build
```

## Git Workflow

The repository uses a Git Flow-inspired workflow.

```text
main
└── production-ready history

develop
└── integration branch
```

Regular development branches are created from `develop`.

Examples:

```text
feat/ui/new-component
fix/web/navigation-issue
refactor/ui/form-controls
docs/docs/update-workflow
chore/repo/update-tooling
```

Production hotfixes branch from `main`.

Release branches use:

```text
release/<version>
```

### Create a Branch

The repository provides an interactive branch workflow:

```bash
pnpm branch
```

Validate the current branch name with:

```bash
pnpm branch:validate
```

## Commits

Commit messages follow Conventional Commits and require a scope.

Examples:

```text
feat(ui): add dialog component
fix(web): correct navigation state
docs(workflows): document release process
chore(repo): update tooling
```

An interactive commit workflow is available:

```bash
pnpm commit
```

Commit messages are validated automatically by Commitlint.

## Git Hooks

Lefthook provides local repository quality gates.

Local hooks validate areas such as:

- branch policy
- formatting
- MDX
- linting
- TypeScript
- tests
- builds
- commit messages

Local hooks provide fast developer feedback, while remote CI remains the final repository quality boundary.

## Continuous Integration

GitHub Actions validates pull requests and protected branches.

The repository uses tiered CI execution so lightweight changes do not always require the complete platform matrix.

The stable aggregate remote quality signal is:

```text
CI Gate
```

Required remote checks must pass before a protected branch can be merged.

## Cross-Platform Support

The repository is designed around portable Node.js-based tooling and targets development and CI workflows across multiple operating systems and architectures.

The current CI strategy validates supported glibc Linux, macOS, and Windows environments.

Additional targets, including Linux musl environments, are tracked in the engineering documentation and roadmap.

## Design System

The UI package is designed to remain framework-neutral and SSR-friendly.

Applications remain responsible for concerns such as:

- locale selection
- translations
- routing
- document language
- application theme persistence

The design system owns:

- semantic design tokens
- resolved theme styling
- direction-compatible component styling
- component accessibility
- Storybook validation

Horizontal styling favors CSS logical properties so components work correctly in both LTR and RTL environments.

The design-system implementation avoids unnecessary client-only behavior so primitive components can remain compatible with React and server-rendered frameworks such as Next.js.

## Testing

The UI package uses Storybook-integrated browser tests with Vitest and Playwright.

Current validation includes:

- component interactions
- accessibility checks
- LTR and RTL behavior
- light and dark theme behavior
- component API contracts
- production Storybook builds

Visual regression and application-level E2E testing are tracked as planned improvements in the roadmap.

## Deployment

The monorepo is deployed to Vercel as three independent projects backed by the same Git repository.

```text
apps/web
└── Next.js application

apps/docs
└── Docusaurus documentation

packages/ui
└── Static Storybook
```

The deployment model is:

```text
feature branch / pull request
└── Preview Deployment

main
└── Production Deployment
```

Each deployable workspace uses its own Vercel project configuration, deployment history, environment variables, and domain.

## Documentation

Detailed engineering documentation lives in:

```text
apps/docs/content
```

The documentation contains the authoritative explanations for repository architecture and engineering decisions.

A deployed version is available through the [live documentation](https://docs-turborepo-template.vercel.app).

When implementation and documentation disagree, the repository should be updated so both describe the same engineering contract.

## Architecture Decisions

Material architectural and workflow decisions are documented as Architecture Decision Records.

Existing ADRs remain historical records even when later decisions supersede part of their behavior.

New material decisions should generally be captured in new ADRs instead of rewriting architectural history.

## Roadmap

Planned improvements include:

- [ ] Add automated dependency update management
- [ ] Define the release and versioning workflow
- [ ] Add visual regression testing for the design system
- [ ] Expand CI coverage to Linux musl environments
- [ ] Add application-level E2E testing as product workflows grow
- [ ] Evaluate extending Turborepo remote caching beyond Vercel deployments

The roadmap may evolve as the repository and its applications grow.

## Contributing

Before opening a pull request:

```bash
pnpm verify
git diff --check
```

Regular development pull requests should target `develop`.

Production promotion happens through a pull request from `develop` to `main`.

Pull requests must satisfy the repository's required remote quality checks before merging.

## License

This project is licensed under the MIT License.

See the [LICENSE](./LICENSE) file for details.
