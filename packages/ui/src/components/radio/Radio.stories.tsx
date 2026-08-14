import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn } from "storybook/test";

import { Radio } from ".";

const meta = {
  title: "Form Controls/Radio",
  component: Radio,

  parameters: {
    layout: "centered",
  },

  args: {
    "aria-label": "Example radio",
  },

  argTypes: {
    controlSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },

  play: async ({ args, canvas, userEvent }) => {
    const radio = canvas.getByRole("radio", {
      name: "Example radio",
    });

    await expect(radio).not.toBeChecked();

    await userEvent.tab();
    await expect(radio).toHaveFocus();

    await userEvent.keyboard(" ");

    await expect(radio).toBeChecked();
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Selected: Story = {
  args: {
    defaultChecked: true,
  },

  play: async ({ canvas }) => {
    const radio = canvas.getByRole("radio", {
      name: "Example radio",
    });

    await expect(radio).toBeChecked();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Radio controlSize="sm" aria-label="Small radio" defaultChecked />

      <Radio controlSize="md" aria-label="Medium radio" defaultChecked />

      <Radio controlSize="lg" aria-label="Large radio" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },

  play: async ({ canvas }) => {
    const radio = canvas.getByRole("radio", {
      name: "Example radio",
    });

    await expect(radio).toBeDisabled();
    await expect(radio).toBeChecked();
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <Radio aria-invalid="true" aria-describedby="plan-error" />

        <span className="text-body-sm text-foreground">Select this plan</span>
      </label>

      <p id="plan-error" className="text-body-sm text-danger-text">
        You must select a plan.
      </p>
    </div>
  ),

  play: async ({ canvas }) => {
    const radio = canvas.getByRole("radio", {
      name: "Select this plan",
    });

    await expect(radio).toHaveAttribute("aria-invalid", "true");

    await expect(radio).toHaveAttribute("aria-describedby", "plan-error");
  },
};

export const Group: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-body-sm text-foreground mb-3">Choose a plan</legend>

      <label className="flex items-center gap-2">
        <Radio name="plan" value="basic" defaultChecked />

        <span className="text-body-sm text-foreground">Basic</span>
      </label>

      <label className="flex items-center gap-2">
        <Radio name="plan" value="pro" />

        <span className="text-body-sm text-foreground">Pro</span>
      </label>

      <label className="flex items-center gap-2">
        <Radio name="plan" value="enterprise" />

        <span className="text-body-sm text-foreground">Enterprise</span>
      </label>
    </fieldset>
  ),

  play: async ({ canvas, userEvent }) => {
    const basic = canvas.getByRole("radio", {
      name: "Basic",
    });

    const pro = canvas.getByRole("radio", {
      name: "Pro",
    });

    const enterprise = canvas.getByRole("radio", {
      name: "Enterprise",
    });

    await expect(basic).toBeChecked();
    await expect(pro).not.toBeChecked();
    await expect(enterprise).not.toBeChecked();

    await userEvent.tab();

    await expect(basic).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");

    await expect(basic).not.toBeChecked();
    await expect(pro).toBeChecked();
    await expect(enterprise).not.toBeChecked();
    await expect(pro).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");

    await expect(basic).not.toBeChecked();
    await expect(pro).not.toBeChecked();
    await expect(enterprise).toBeChecked();
    await expect(enterprise).toHaveFocus();
  },
};

export const NativeFormAttributes: Story = {
  args: {
    name: "notifications",
    value: "email",
    required: true,
  },

  play: async ({ canvas }) => {
    const radio = canvas.getByRole("radio", {
      name: "Example radio",
    });

    await expect(radio).toHaveAttribute("name", "notifications");

    await expect(radio).toHaveAttribute("value", "email");

    await expect(radio).toBeRequired();
  },
};

export const BidirectionalLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <label dir="ltr" className="flex items-center gap-2">
        <Radio defaultChecked />

        <span className="text-body-sm text-foreground">Email notifications</span>
      </label>

      <label dir="rtl" className="flex items-center gap-2">
        <Radio defaultChecked />

        <span className="text-body-sm text-foreground">اعلان‌های ایمیلی</span>
      </label>
    </div>
  ),

  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("radio", {
        name: "Email notifications",
      }),
    ).toBeChecked();

    await expect(
      canvas.getByRole("radio", {
        name: "اعلان‌های ایمیلی",
      }),
    ).toBeChecked();
  },
};

export const ClassNameContract: Story = {
  render: () => (
    <Radio
      aria-label="Class name radio"
      className="test-radio-root"
      inputClassName="test-radio-input"
    />
  ),

  play: async ({ canvas }) => {
    const radio = canvas.getByRole("radio", {
      name: "Class name radio",
    });

    await expect(radio).toHaveClass("test-radio-input");

    await expect(radio).not.toHaveClass("test-radio-root");

    await expect(radio.parentElement).toHaveClass("test-radio-root");

    await expect(radio.parentElement).not.toHaveClass("test-radio-input");
  },
};
