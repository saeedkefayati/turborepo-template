import { createElement } from "react";

import { Button, ToggleButton } from "storybook/internal/components";
import { addons, types, useGlobals } from "storybook/manager-api";

const ADDON_ID = "repo/environment-controls";
const THEME_TOOL_ID = `${ADDON_ID}/theme`;
const DIRECTION_TOOL_ID = `${ADDON_ID}/direction`;

type Direction = "ltr" | "rtl";
type ThemeMode = "system" | "light" | "dark";

function getThemeMode(value: unknown): ThemeMode {
  if (value === "light" || value === "dark") {
    return value;
  }

  return "system";
}

function getNextThemeMode(themeMode: ThemeMode): ThemeMode {
  switch (themeMode) {
    case "system":
      return "light";

    case "light":
      return "dark";

    case "dark":
      return "system";
  }
}

function ThemeControl() {
  const [globals, updateGlobals] = useGlobals();

  const themeMode = getThemeMode(globals.themeMode);
  const nextThemeMode = getNextThemeMode(themeMode);

  return createElement(
    Button,
    {
      padding: "small",
      variant: "ghost",
      ariaLabel: `Theme: ${themeMode.toUpperCase()} — switch to ${nextThemeMode.toUpperCase()}`,
      onClick: () => {
        updateGlobals({
          themeMode: nextThemeMode,
        });
      },
    },
    themeMode.toUpperCase(),
  );
}

function DirectionToggle() {
  const [globals, updateGlobals] = useGlobals();

  const direction: Direction = globals.direction === "rtl" ? "rtl" : "ltr";

  const nextDirection: Direction = direction === "ltr" ? "rtl" : "ltr";

  return createElement(
    ToggleButton,
    {
      padding: "small",
      variant: "ghost",
      pressed: direction === "rtl",
      ariaLabel: `Switch direction to ${nextDirection.toUpperCase()}`,
      tooltip: `Direction: ${direction.toUpperCase()} — switch to ${nextDirection.toUpperCase()}`,
      onClick: () => {
        updateGlobals({
          direction: nextDirection,
        });
      },
    },
    direction.toUpperCase(),
  );
}

addons.register(ADDON_ID, () => {
  addons.add(THEME_TOOL_ID, {
    type: types.TOOL,
    title: "Theme",
    match: ({ tabId, viewMode }) => !tabId && viewMode === "story",
    render: ThemeControl,
  });

  addons.add(DIRECTION_TOOL_ID, {
    type: types.TOOL,
    title: "Writing direction",
    match: ({ tabId, viewMode }) => !tabId && viewMode === "story",
    render: DirectionToggle,
  });
});
