import { join } from "node:path";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

const vitestConfig = defineConfig({
  test: {
    projects: [
      {
        extends: true,

        plugins: [
          storybookTest({
            configDir: join(import.meta.dirname, ".storybook"),
          }),
        ],

        test: {
          name: "storybook",

          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
