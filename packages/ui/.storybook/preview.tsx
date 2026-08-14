import type { ReactNode } from "react";
import { useEffect } from "react";

import type { Preview } from "@storybook/react-vite";

import "../src/styles/index.css";
import "./preview.css";

type Direction = "ltr" | "rtl";
type ThemeMode = "system" | "light" | "dark";
type ResolvedTheme = Exclude<ThemeMode, "system">;

type StoryEnvironmentProps = {
  children: ReactNode;
  direction: Direction;
  themeMode: ThemeMode;
};

function resolveSystemTheme(mediaQuery: MediaQueryList): ResolvedTheme {
  return mediaQuery.matches ? "dark" : "light";
}

function StoryEnvironment({ children, direction, themeMode }: StoryEnvironmentProps) {
  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const resolvedTheme = themeMode === "system" ? resolveSystemTheme(mediaQuery) : themeMode;

      root.setAttribute("data-theme", resolvedTheme);
    };

    applyTheme();

    if (themeMode !== "system") {
      return;
    }

    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [themeMode]);

  return (
    <div dir={direction} className="contents">
      {children}
    </div>
  );
}

const preview: Preview = {
  globalTypes: {
    themeMode: {
      description: "Theme preference",
    },

    direction: {
      description: "Writing direction",
    },
  },

  initialGlobals: {
    themeMode: "dark",
    direction: "ltr",
  },

  decorators: [
    (Story, context) => {
      const themeMode: ThemeMode =
        context.globals.themeMode === "system" || context.globals.themeMode === "light"
          ? context.globals.themeMode
          : "dark";

      const direction: Direction = context.globals.direction === "rtl" ? "rtl" : "ltr";

      return (
        <StoryEnvironment themeMode={themeMode} direction={direction}>
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
