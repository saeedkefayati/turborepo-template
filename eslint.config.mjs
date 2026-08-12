import globals from "globals";

import { config } from "./packages/eslint-config/base.js";

export default [
  ...config,

  {
    files: ["scripts/**/*.{js,mjs,cjs}"],

    languageOptions: {
      globals: globals.node,
    },
  },
];
