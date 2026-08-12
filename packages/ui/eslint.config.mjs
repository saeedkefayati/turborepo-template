import storybook from "eslint-plugin-storybook";

import { config as reactConfig } from "@repo/eslint-config/react-internal";

export default [...reactConfig, ...storybook.configs["flat/recommended"]];
