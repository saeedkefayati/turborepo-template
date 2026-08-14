import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect } from "storybook/test";

import { Checkbox } from "../checkbox";
import { Input } from "../input";

import { Label } from ".";

const meta = {
  title: "Form Controls/Label",
  component: Label,

  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Label htmlFor="email">Email address</Label>

      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  ),

  play: async ({ canvas, userEvent }) => {
    const label = canvas.getByText("Email address");

    const input = canvas.getByLabelText("Email address");

    await userEvent.click(label);

    await expect(input).toHaveFocus();
  },
};

export const WrappingControl: Story = {
  render: () => (
    <Label className="inline-flex items-center gap-3">
      <Checkbox />

      <span>Receive product updates</span>
    </Label>
  ),

  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", {
      name: "Receive product updates",
    });

    await expect(checkbox).not.toBeChecked();

    await userEvent.click(canvas.getByText("Receive product updates"));

    await expect(checkbox).toBeChecked();
  },
};

export const LongContent: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Label htmlFor="organization">
        Organization or company name used for billing and account administration
      </Label>

      <Input id="organization" defaultValue="Example Company" />
    </div>
  ),
};

export const Bidirectional: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="plan-en" dir="ltr">
          Plan name
        </Label>

        <Input id="plan-en" dir="ltr" defaultValue="Professional" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="plan-fa" dir="rtl">
          نام پلن
        </Label>

        <Input id="plan-fa" dir="rtl" defaultValue="حرفه‌ای" />
      </div>
    </div>
  ),

  play: async ({ canvas }) => {
    const englishLabel = canvas.getByText("Plan name");

    const persianLabel = canvas.getByText("نام پلن");

    await expect(englishLabel).toHaveAttribute("dir", "ltr");

    await expect(persianLabel).toHaveAttribute("dir", "rtl");

    await expect(canvas.getByLabelText("Plan name")).toHaveAttribute("dir", "ltr");

    await expect(canvas.getByLabelText("نام پلن")).toHaveAttribute("dir", "rtl");
  },
};
