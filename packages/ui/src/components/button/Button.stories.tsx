import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn } from "storybook/test";

import { Button } from ".";

const meta = {
  title: "Primitives/Button",
  component: Button,

  parameters: {
    layout: "centered",
  },

  args: {
    children: "Button",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClick: fn(),
  },

  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", {
      name: "Button",
    });

    await expect(button).toBeEnabled();
    await expect(button).toHaveAttribute("type", "button");

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },

  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", {
      name: "Button",
    });

    await expect(button).toBeDisabled();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading",
  },

  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", {
      name: "Loading",
    });

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
