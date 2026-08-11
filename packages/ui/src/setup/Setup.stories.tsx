import type { Meta, StoryObj } from "@storybook/react-vite";

function Setup() {
  return (
    <div className="flex min-h-80 min-w-80 items-center justify-center bg-zinc-950 p-8">
      <div className="rounded-2xl bg-zinc-900 p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white">UI Design System</h1>

        <p className="mt-2 text-sm text-zinc-400">
          Storybook + Tailwind CSS are configured successfully.
        </p>

        <button
          type="button"
          className="mt-6 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          Tailwind works
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
