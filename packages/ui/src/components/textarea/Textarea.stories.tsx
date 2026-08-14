import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn } from "storybook/test";

import { Textarea } from ".";

const meta = {
  title: "Form Controls/Textarea",
  component: Textarea,

  parameters: {
    layout: "centered",
  },

  args: {
    "aria-label": "Example textarea",
    placeholder: "Enter a message",
  },

  argTypes: {
    controlSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },

  play: async ({ args, canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox", {
      name: "Example textarea",
    });

    await expect(textarea).toBeEnabled();

    await userEvent.type(textarea, "Hello from Textarea");

    await expect(textarea).toHaveValue("Hello from Textarea");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <Textarea controlSize="sm" aria-label="Small textarea" placeholder="Small" />

      <Textarea controlSize="md" aria-label="Medium textarea" placeholder="Medium" />

      <Textarea controlSize="lg" aria-label="Large textarea" placeholder="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Disabled content",
  },

  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", {
      name: "Example textarea",
    });

    await expect(textarea).toBeDisabled();
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "Read-only content",
  },

  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", {
      name: "Example textarea",
    });

    await expect(textarea).toHaveAttribute("readonly");
    await expect(textarea).toHaveValue("Read-only content");
  },
};

export const Invalid: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <Textarea
        aria-label="Message"
        aria-invalid="true"
        aria-describedby="message-error"
        defaultValue="Invalid message"
      />

      <p id="message-error" className="text-body-sm text-danger-text">
        Enter a valid message.
      </p>
    </div>
  ),

  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", {
      name: "Message",
    });

    await expect(textarea).toHaveAttribute("aria-invalid", "true");
    await expect(textarea).toHaveAttribute("aria-describedby", "message-error");
  },
};

export const NativeRowsAndColumns: Story = {
  args: {
    rows: 6,
    cols: 36,
    defaultValue: "Native rows and cols remain available.",
  },

  play: async ({ canvas }) => {
    const textarea = canvas.getByRole("textbox", {
      name: "Example textarea",
    });

    await expect(textarea).toHaveAttribute("rows", "6");
    await expect(textarea).toHaveAttribute("cols", "36");
  },
};

export const AutomaticDirection: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <Textarea
        dir="auto"
        aria-label="Automatic RTL textarea"
        defaultValue="این متن باید به صورت خودکار راست به چپ نمایش داده شود."
      />

      <Textarea
        dir="auto"
        aria-label="Automatic LTR textarea"
        defaultValue="This text should automatically use left-to-right direction."
      />
    </div>
  ),
};

export const Bidirectional: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <Textarea
        dir="ltr"
        aria-label="LTR textarea"
        defaultValue="Left-to-right multiline content."
      />

      <Textarea
        dir="rtl"
        aria-label="RTL textarea"
        defaultValue="این یک محتوای چندخطی راست به چپ است."
      />
    </div>
  ),

  play: async ({ canvas }) => {
    const ltrTextarea = canvas.getByRole("textbox", {
      name: "LTR textarea",
    });

    const rtlTextarea = canvas.getByRole("textbox", {
      name: "RTL textarea",
    });

    await expect(ltrTextarea).toHaveAttribute("dir", "ltr");
    await expect(rtlTextarea).toHaveAttribute("dir", "rtl");
  },
};
