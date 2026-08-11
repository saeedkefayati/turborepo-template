import type { Meta, StoryObj } from "@storybook/react-vite";

function Setup() {
  return (
    <div>
      <h1>UI Design System</h1>
      <p>Storybook is configured successfully.</p>
    </div>
  );
}

const meta = {
  title: "Setup/Storybook",
  component: Setup,
} satisfies Meta<typeof Setup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
