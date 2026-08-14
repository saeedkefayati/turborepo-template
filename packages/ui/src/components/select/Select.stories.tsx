import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn } from "storybook/test";

import { Select } from ".";

const meta = {
  title: "Form Controls/Select",
  component: Select,

  parameters: {
    layout: "centered",
  },

  args: {
    "aria-label": "Example select",
  },

  argTypes: {
    controlSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="">Select an option</option>
    <option value="basic">Basic</option>
    <option value="pro">Pro</option>
    <option value="enterprise">Enterprise</option>
  </>
);

export const Default: Story = {
  args: {
    children: options,
    defaultValue: "",
    onChange: fn(),
  },

  play: async ({ args, canvas, userEvent }) => {
    const select = canvas.getByRole("combobox", {
      name: "Example select",
    });

    await expect(select).toHaveValue("");

    await userEvent.selectOptions(select, "pro");

    await expect(select).toHaveValue("pro");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Select controlSize="sm" aria-label="Small select" defaultValue="basic">
        {options}
      </Select>

      <Select controlSize="md" aria-label="Medium select" defaultValue="pro">
        {options}
      </Select>

      <Select controlSize="lg" aria-label="Large select" defaultValue="enterprise">
        {options}
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: options,
    disabled: true,
    defaultValue: "basic",
  },

  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", {
      name: "Example select",
    });

    await expect(select).toBeDisabled();
    await expect(select).toHaveValue("basic");
  },
};

export const Required: Story = {
  args: {
    children: options,
    required: true,
    defaultValue: "",
  },

  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", {
      name: "Example select",
    });

    await expect(select).toBeRequired();
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Select aria-label="Plan" aria-invalid="true" aria-describedby="plan-error" defaultValue="">
        {options}
      </Select>

      <p id="plan-error" className="text-body-sm text-danger-text">
        You must select a plan.
      </p>
    </div>
  ),

  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", {
      name: "Plan",
    });

    await expect(select).toHaveAttribute("aria-invalid", "true");

    await expect(select).toHaveAttribute("aria-describedby", "plan-error");
  },
};

export const DisabledPlaceholder: Story = {
  render: () => (
    <Select aria-label="Country" defaultValue="" className="w-72">
      <option value="" disabled>
        Select a country
      </option>

      <option value="ir">Iran</option>
      <option value="de">Germany</option>
      <option value="jp">Japan</option>
    </Select>
  ),

  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", {
      name: "Country",
    });

    await expect(select).toHaveValue("");
  },
};

export const NativeFormAttributes: Story = {
  args: {
    children: options,
    name: "plan",
    required: true,
    defaultValue: "pro",
  },

  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", {
      name: "Example select",
    });

    await expect(select).toHaveAttribute("name", "plan");

    await expect(select).toBeRequired();
    await expect(select).toHaveValue("pro");
  },
};

export const Bidirectional: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Select dir="ltr" aria-label="English plan" defaultValue="pro">
        <option value="basic">Basic</option>
        <option value="pro">Pro</option>
      </Select>

      <Select dir="rtl" aria-label="Persian plan" defaultValue="professional">
        <option value="basic">پایه</option>
        <option value="professional">حرفه‌ای</option>
      </Select>
    </div>
  ),

  play: async ({ canvas }) => {
    const english = canvas.getByRole("combobox", {
      name: "English plan",
    });

    const persian = canvas.getByRole("combobox", {
      name: "Persian plan",
    });

    await expect(english).toHaveAttribute("dir", "ltr");
    await expect(persian).toHaveAttribute("dir", "rtl");

    await expect(english.parentElement).toHaveAttribute("dir", "ltr");

    await expect(persian.parentElement).toHaveAttribute("dir", "rtl");
  },
};
