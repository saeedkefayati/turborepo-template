import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn } from "storybook/test";

import { Switch } from ".";

const meta = {
  title: "Form Controls/Switch",
  component: Switch,

  parameters: {
    layout: "centered",
  },

  args: {
    "aria-label": "Example switch",
  },

  argTypes: {
    controlSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },

  play: async ({ args, canvas, userEvent }) => {
    const switchControl = canvas.getByRole("switch", {
      name: "Example switch",
    });

    await expect(switchControl).not.toBeChecked();

    await userEvent.tab();
    await expect(switchControl).toHaveFocus();

    await userEvent.keyboard(" ");

    await expect(switchControl).toBeChecked();
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },

  play: async ({ canvas }) => {
    const switchControl = canvas.getByRole("switch", {
      name: "Example switch",
    });

    await expect(switchControl).toBeChecked();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch controlSize="sm" aria-label="Small switch" defaultChecked />

      <Switch controlSize="md" aria-label="Medium switch" defaultChecked />

      <Switch controlSize="lg" aria-label="Large switch" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch aria-label="Disabled off switch" disabled />

      <Switch aria-label="Disabled on switch" disabled defaultChecked />
    </div>
  ),

  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("switch", {
        name: "Disabled off switch",
      }),
    ).toBeDisabled();

    await expect(
      canvas.getByRole("switch", {
        name: "Disabled on switch",
      }),
    ).toBeDisabled();
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <Switch aria-invalid="true" aria-describedby="notifications-error" />

        <span className="text-body-sm text-foreground">Enable notifications</span>
      </label>

      <p id="notifications-error" className="text-body-sm text-danger-text">
        This setting requires your attention.
      </p>
    </div>
  ),

  play: async ({ canvas }) => {
    const switchControl = canvas.getByRole("switch", {
      name: "Enable notifications",
    });

    await expect(switchControl).toHaveAttribute("aria-invalid", "true");

    await expect(switchControl).toHaveAttribute("aria-describedby", "notifications-error");
  },
};

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-3">
      <Switch />

      <span className="text-body-sm text-foreground">Reduce motion</span>
    </label>
  ),

  play: async ({ canvas, userEvent }) => {
    const switchControl = canvas.getByRole("switch", {
      name: "Reduce motion",
    });

    await expect(switchControl).not.toBeChecked();

    await userEvent.click(canvas.getByText("Reduce motion"));

    await expect(switchControl).toBeChecked();

    await expect(canvas.getByText("Reduce motion")).toBeInTheDocument();
  },
};

export const NativeFormAttributes: Story = {
  args: {
    name: "notifications",
    value: "enabled",
    required: true,
  },

  play: async ({ canvas }) => {
    const switchControl = canvas.getByRole("switch", {
      name: "Example switch",
    });

    await expect(switchControl).toHaveAttribute("name", "notifications");

    await expect(switchControl).toHaveAttribute("value", "enabled");

    await expect(switchControl).toBeRequired();
  },
};

export const BidirectionalLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <label dir="ltr" className="flex items-center gap-3">
        <Switch defaultChecked />

        <span className="text-body-sm text-foreground">Email notifications</span>
      </label>

      <label dir="rtl" className="flex items-center gap-3">
        <Switch defaultChecked />

        <span className="text-body-sm text-foreground">اعلان‌های ایمیلی</span>
      </label>
    </div>
  ),

  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("switch", {
        name: "Email notifications",
      }),
    ).toBeChecked();

    await expect(
      canvas.getByRole("switch", {
        name: "اعلان‌های ایمیلی",
      }),
    ).toBeChecked();
  },
};
