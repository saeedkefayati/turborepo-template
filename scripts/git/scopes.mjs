import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(currentDir, "../..");

const workspaceRoots = ["apps", "packages"];

function getPackageScope(packageDir) {
  const packageJsonPath = join(packageDir, "package.json");

  if (!existsSync(packageJsonPath)) {
    return null;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

  if (typeof packageJson.name !== "string") {
    return null;
  }

  const segments = packageJson.name.split("/");

  return segments.at(-1) ?? null;
}

export function getWorkspaceScopes() {
  const scopes = new Set(["repo"]);

  for (const workspaceRoot of workspaceRoots) {
    const workspacePath = join(repoRoot, workspaceRoot);

    if (!existsSync(workspacePath)) {
      continue;
    }

    const entries = readdirSync(workspacePath, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const packageDir = join(workspacePath, entry.name);
      const scope = getPackageScope(packageDir);

      if (scope) {
        scopes.add(scope);
      }
    }
  }

  return [...scopes].sort((a, b) => {
    if (a === "repo") {
      return -1;
    }

    if (b === "repo") {
      return 1;
    }

    return a.localeCompare(b, "en", {
      numeric: true,
    });
  });
}
