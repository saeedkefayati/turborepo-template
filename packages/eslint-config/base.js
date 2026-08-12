import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      perfectionist,
      turbo: turboPlugin,
    },

    rules: {
      "turbo/no-undeclared-env-vars": "warn",

      /*
       * Import order:
       *
       * 1. JavaScript side effects
       * 2. Node built-ins
       * 3. React
       * 4. Frameworks
       * 5. Third-party packages
       * 6. Workspace packages
       * 7. Internal aliases
       * 8. Parent imports
       * 9. Sibling imports
       * 10. Index imports
       * 11. Styles
       * 12. Side-effect styles
       */
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",

          fallbackSort: {
            type: "type-import-first",
            order: "asc",
          },

          newlinesBetween: 1,
          newlinesInside: 0,

          internalPattern: ["^@/"],

          /*
           * Required so style side-effect imports can be moved
           * to the final import group.
           *
           * Their relative order is preserved below with
           * `type: "unsorted"`.
           */
          sortSideEffects: true,

          groups: [
            {
              group: "side-effect",
              type: "unsorted",
            },

            ["type-builtin", "value-builtin"],

            "react",

            "framework",

            ["type-external", "value-external"],

            "workspace",

            ["type-internal", "value-internal"],

            ["type-parent", "value-parent"],

            ["type-sibling", "value-sibling"],

            ["type-index", "value-index"],

            "unknown",

            "style",

            {
              newlinesBetween: 0,
            },

            {
              group: "side-effect-style",
              type: "unsorted",
            },
          ],

          customGroups: [
            {
              groupName: "react",
              elementNamePattern: ["^react$", "^react/", "^react-dom$", "^react-dom/"],
            },

            {
              groupName: "framework",
              elementNamePattern: ["^next$", "^next/", "^@storybook/"],
            },

            {
              groupName: "workspace",
              elementNamePattern: "^@repo/",
            },
          ],
        },
      ],

      "perfectionist/sort-named-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],
    },
  },

  {
    files: ["**/*.{ts,tsx,mts,cts}"],

    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },

  {
    ignores: ["dist/**", "build/**", "coverage/**", "storybook-static/**"],
  },
];
