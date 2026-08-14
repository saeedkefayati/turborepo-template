import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect } from "storybook/test";

import { Button } from "../../components/button";

function Accessibility() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="space-y-3">
          <p className="text-label text-accent-foreground">Design System</p>

          <h1 className="font-display text-heading">Accessibility Foundations</h1>

          <p className="font-body text-body text-muted-foreground max-w-3xl">
            Visual and interaction checks for focus visibility, semantic color roles, keyboard
            navigation, reduced motion, and accessible control states.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="font-display text-title">Keyboard Focus</h2>

          <div className="flex flex-wrap items-center gap-4">
            <Button>Primary action</Button>

            <Button variant="outline">Secondary action</Button>

            <a
              href="#focus-target"
              className="text-accent-foreground rounded-control text-label focus-visible:ring-focus focus-visible:ring-offset-background px-3 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Keyboard link
            </a>
          </div>

          <p id="focus-target" className="text-body-sm text-muted-foreground">
            Use the Tab key to verify that every interactive element exposes a clearly visible focus
            indicator.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-title">Semantic Contrast</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border-border bg-surface-elevated rounded-card border p-5">
              <p className="text-label text-foreground">Foreground</p>

              <p className="text-body-sm text-muted-foreground mt-2">
                Secondary content uses the muted foreground semantic token.
              </p>

              <p className="text-label text-accent-foreground mt-4">Accent foreground</p>
            </div>

            <div className="border-control-border bg-background rounded-control border p-5">
              <p className="text-label">Interactive boundary</p>

              <p className="text-body-sm text-muted-foreground mt-2">
                Control boundaries use a stronger semantic token than decorative borders.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-title">Control States</h2>

          <div className="flex flex-wrap items-center gap-4">
            <Button>Enabled</Button>

            <Button disabled>Disabled</Button>

            <Button loading>Loading</Button>

            <Button variant="danger">Destructive</Button>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-title">Reduced Motion</h2>

          <div className="border-border bg-surface-elevated rounded-card flex items-center gap-4 border p-5">
            <span
              aria-hidden="true"
              className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
            />

            <div>
              <p className="text-label">Motion-aware activity indicator</p>

              <p className="text-body-sm text-muted-foreground mt-1">
                Non-essential animation stops when the user requests reduced motion.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Accessibility",
  component: Accessibility,

  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Accessibility>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const primaryAction = canvas.getByRole("button", {
      name: "Primary action",
    });

    const disabledAction = canvas.getByRole("button", {
      name: "Disabled",
    });

    await expect(primaryAction).toBeEnabled();
    await expect(disabledAction).toBeDisabled();

    await userEvent.tab();

    await expect(primaryAction).toHaveFocus();
  },
};
