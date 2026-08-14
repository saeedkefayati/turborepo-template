import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn } from "storybook/test";

import { Checkbox } from ".";

const meta = {
  title: "Form Controls/Checkbox",
  component: Checkbox,

  parameters: {
    layout: "centered",
  },

  args: {
    "aria-label": "Example checkbox",
  },

  argTypes: {
    controlSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },

  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", {
      name: "Example checkbox",
    });

    await expect(checkbox).not.toBeChecked();

    await userEvent.tab();
    await expect(checkbox).toHaveFocus();

    await userEvent.keyboard(" ");

    await expect(checkbox).toBeChecked();
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },

  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox", {
      name: "Example checkbox",
    });

    await expect(checkbox).toBeChecked();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Checkbox controlSize="sm" aria-label="Small checkbox" defaultChecked />

      <Checkbox controlSize="md" aria-label="Medium checkbox" defaultChecked />

      <Checkbox controlSize="lg" aria-label="Large checkbox" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },

  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox", {
      name: "Example checkbox",
    });

    await expect(checkbox).toBeDisabled();
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <Checkbox aria-invalid="true" aria-describedby="terms-error" />

        <span className="text-body-sm text-foreground">Accept the terms</span>
      </label>

      <p id="terms-error" className="text-body-sm text-danger-text">
        You must accept the terms.
      </p>
    </div>
  ),

  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox", {
      name: "Accept the terms",
    });

    await expect(checkbox).toHaveAttribute("aria-invalid", "true");

    await expect(checkbox).toHaveAttribute("aria-describedby", "terms-error");
  },
};

export const NativeFormAttributes: Story = {
  args: {
    name: "notifications",
    value: "enabled",
    required: true,
  },

  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole("checkbox", {
      name: "Example checkbox",
    });

    await expect(checkbox).toHaveAttribute("name", "notifications");

    await expect(checkbox).toHaveAttribute("value", "enabled");

    await expect(checkbox).toBeRequired();
  },
};

export const BidirectionalLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <label dir="ltr" className="flex items-center gap-2">
        <Checkbox defaultChecked />

        <span className="text-body-sm text-foreground">Enable notifications</span>
      </label>

      <label dir="rtl" className="flex items-center gap-2">
        <Checkbox defaultChecked />

        <span className="text-body-sm text-foreground">فعال‌سازی اعلان‌ها</span>
      </label>
    </div>
  ),

  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("checkbox", {
        name: "Enable notifications",
      }),
    ).toBeChecked();

    await expect(
      canvas.getByRole("checkbox", {
        name: "فعال‌سازی اعلان‌ها",
      }),
    ).toBeChecked();
  },
};
