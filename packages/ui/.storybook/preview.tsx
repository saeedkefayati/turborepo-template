import { type ReactNode, useEffect } from "react";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react-vite";

import "../src/styles/index.css";
import "./preview.css";

type Direction = "ltr" | "rtl";

type StoryEnvironmentProps = {
  children: ReactNode;
  direction: Direction;
};

function StoryEnvironment({ children, direction }: StoryEnvironmentProps) {
  useEffect(() => {
    const root = document.documentElement;
    const previousDir = root.getAttribute("dir");

    root.setAttribute("dir", direction);

    return () => {
      if (previousDir) {
        root.setAttribute("dir", previousDir);
      } else {
        root.removeAttribute("dir");
      }
    };
  }, [direction]);

  return (
    <div dir={direction} className="contents">
      {children}
    </div>
  );
}

const preview: Preview = {
  globalTypes: {
    direction: {
      description: "Writing direction",
      toolbar: {
        items: [
          {
            value: "ltr",
            title: "LTR",
          },
          {
            value: "rtl",
            title: "RTL",
          },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    direction: "ltr",
  },

  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),

    (Story, context) => {
      const direction: Direction = context.globals.direction === "rtl" ? "rtl" : "ltr";

      return (
        <StoryEnvironment direction={direction}>
          <Story />
        </StoryEnvironment>
      );
    },
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
      test: "error",
    },
  },
};

export default preview;
