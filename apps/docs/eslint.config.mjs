import globals from "globals";

import { config as reactConfig } from "@repo/eslint-config/react-internal";

export default [
  ...reactConfig,

  {
    files: ["docusaurus.config.ts", "sidebars.ts"],

    languageOptions: {
      globals: globals.node,
    },
  },

  {
    ignores: [".docusaurus/**", "build/**"],
  },
];
