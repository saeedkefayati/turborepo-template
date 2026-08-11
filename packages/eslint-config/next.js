import pluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { globalIgnores } from "eslint/config";
import globals from "globals";

import { config as baseConfig } from "./base.js";

export const nextJsConfig = [
  ...baseConfig,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  {
    ...pluginReact.configs.flat.recommended,

    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,

      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },

  {
    plugins: {
      "@next/next": pluginNext,
    },

    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },

  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },

    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  eslintConfigPrettier,
];
