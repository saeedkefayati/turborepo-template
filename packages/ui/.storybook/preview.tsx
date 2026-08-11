import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react-vite";

import "../src/styles/index.css";
import "./preview.css";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
  ],

  parameters: {
    backgrounds: {
      disable: true,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
