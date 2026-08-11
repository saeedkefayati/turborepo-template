import type { Meta, StoryObj } from "@storybook/react-vite";

function Setup() {
  return (
    <div className="bg-background text-foreground flex min-h-80 min-w-80 items-center justify-center p-8">
      <div className="border-border bg-surface-elevated rounded-2xl border p-8 shadow-xl">
        <h1 className="text-2xl font-bold">UI Design System</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          Design tokens and themes are configured successfully.
        </p>

        <button
          type="button"
          className="bg-primary text-primary-foreground hover:bg-primary-hover mt-6 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          Theme works
        </button>
      </div>
    </div>
  );
}

const meta = {
  title: "Setup/Storybook",
  component: Setup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Setup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
