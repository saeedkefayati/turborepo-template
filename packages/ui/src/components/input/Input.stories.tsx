import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn } from "storybook/test";

import { Input } from ".";

const meta = {
  title: "Form Controls/Input",
  component: Input,

  parameters: {
    layout: "centered",
  },

  args: {
    "aria-label": "Example input",
    placeholder: "Enter a value",
  },

  argTypes: {
    controlSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },

  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", {
      name: "Example input",
    });

    await expect(input).toBeEnabled();

    await userEvent.type(input, "Hello");

    await expect(input).toHaveValue("Hello");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input controlSize="sm" aria-label="Small input" placeholder="Small" />

      <Input controlSize="md" aria-label="Medium input" placeholder="Medium" />

      <Input controlSize="lg" aria-label="Large input" placeholder="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled value",
    readOnly: true,
  },

  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", {
      name: "Example input",
    });

    await expect(input).toBeDisabled();
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: "Read-only value",
  },

  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", {
      name: "Example input",
    });

    await expect(input).toHaveAttribute("readonly");
    await expect(input).toHaveValue("Read-only value");
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Input
        aria-label="Email address"
        aria-invalid="true"
        aria-describedby="email-error"
        defaultValue="invalid-email"
      />

      <p id="email-error" className="text-body-sm text-danger-text">
        Enter a valid email address.
      </p>
    </div>
  ),

  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", {
      name: "Email address",
    });

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("aria-describedby", "email-error");
  },
};

export const AutomaticDirection: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input
        dir="auto"
        aria-label="Automatic RTL direction"
        defaultValue="این متن به صورت خودکار راست به چپ نمایش داده می‌شود"
      />

      <Input
        dir="auto"
        aria-label="Automatic LTR direction"
        defaultValue="This text is automatically displayed left to right"
      />
    </div>
  ),
};

export const NativeInputTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input type="email" aria-label="Email" placeholder="name@example.com" />

      <Input type="password" aria-label="Password" placeholder="Password" />

      <Input type="search" aria-label="Search" placeholder="Search" />

      <Input type="url" aria-label="Website" placeholder="https://example.com" />
    </div>
  ),
};

export const NativeSizeAttribute: Story = {
  args: {
    size: 24,
    defaultValue: "Native size attribute",
  },

  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", {
      name: "Example input",
    });

    await expect(input).toHaveAttribute("size", "24");
  },
};

export const Bidirectional: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input dir="ltr" aria-label="LTR input" defaultValue="Left-to-right content" />

      <Input dir="rtl" aria-label="RTL input" defaultValue="این ورودی راست به چپ است" />
    </div>
  ),

  play: async ({ canvas }) => {
    const ltrInput = canvas.getByRole("textbox", {
      name: "LTR input",
    });

    const rtlInput = canvas.getByRole("textbox", {
      name: "RTL input",
    });

    await expect(ltrInput).toHaveAttribute("dir", "ltr");
    await expect(rtlInput).toHaveAttribute("dir", "rtl");
  },
};
