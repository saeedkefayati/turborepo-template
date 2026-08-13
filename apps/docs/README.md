# Documentation

This workspace contains the project engineering documentation powered by Docusaurus.

## Development

From the repository root:

```bash
pnpm --filter docs dev
```

The documentation site runs at:

```text
http://localhost:3001
```

## Build

```bash
pnpm --filter docs build
```

## Type checking

```bash
pnpm --filter docs check-types
```

## Linting

```bash
pnpm --filter docs lint
```

## MDX formatting

Format documentation content:

```bash
pnpm --filter docs format:mdx
```

Validate documentation content:

```bash
pnpm --filter docs check:mdx
```

The root repository formatting commands automatically coordinate Prettier and Remark:

```bash
pnpm format
pnpm format:check
```

Prettier handles regular repository files.

Remark handles:

```text
apps/docs/content/**/*.mdx
```

## Production preview

```bash
pnpm --filter docs serve
```

## Content

Documentation content lives under:

```text
apps/docs/content/
```

Documentation pages use the `.mdx` extension.

Top-level and nested sidebar categories are generated from the filesystem.

Category behavior and generated landing pages are configured through:

```text
_category_.json
```

Individual documents use MDX front matter for metadata such as titles and sidebar ordering.

The documentation site is configured in docs-only mode, so documentation routes are served from the site root.
