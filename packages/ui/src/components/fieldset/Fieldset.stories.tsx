import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect } from "storybook/test";

import { Checkbox } from "../checkbox";
import { FieldDescription } from "../field";
import { Label } from "../label";
import { Radio } from "../radio";

import { Fieldset, Legend } from ".";

const meta = {
  title: "Form Controls/Fieldset",
  component: Fieldset,

  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RadioGroup: Story = {
  render: () => (
    <Fieldset className="w-72">
      <Legend>Choose a plan</Legend>

      <div className="mt-3 grid gap-3">
        <Label className="inline-flex items-center gap-3 font-normal">
          <Radio name="plan" value="basic" defaultChecked />

          <span>Basic</span>
        </Label>

        <Label className="inline-flex items-center gap-3 font-normal">
          <Radio name="plan" value="pro" />

          <span>Pro</span>
        </Label>

        <Label className="inline-flex items-center gap-3 font-normal">
          <Radio name="plan" value="enterprise" />

          <span>Enterprise</span>
        </Label>
      </div>
    </Fieldset>
  ),

  play: async ({ canvas, userEvent }) => {
    const group = canvas.getByRole("group", {
      name: "Choose a plan",
    });

    const basic = canvas.getByRole("radio", {
      name: "Basic",
    });

    const pro = canvas.getByRole("radio", {
      name: "Pro",
    });

    await expect(group).toBeInTheDocument();
    await expect(basic).toBeChecked();
    await expect(pro).not.toBeChecked();

    await userEvent.click(canvas.getByText("Pro"));

    await expect(pro).toBeChecked();
    await expect(basic).not.toBeChecked();
  },
};

export const CheckboxGroup: Story = {
  render: () => (
    <Fieldset className="w-72">
      <Legend>Notifications</Legend>

      <div className="mt-3 grid gap-3">
        <Label className="inline-flex items-center gap-3 font-normal">
          <Checkbox name="email" />

          <span>Email updates</span>
        </Label>

        <Label className="inline-flex items-center gap-3 font-normal">
          <Checkbox name="product" />

          <span>Product announcements</span>
        </Label>
      </div>
    </Fieldset>
  ),

  play: async ({ canvas, userEvent }) => {
    const group = canvas.getByRole("group", {
      name: "Notifications",
    });

    const email = canvas.getByRole("checkbox", {
      name: "Email updates",
    });

    await expect(group).toBeInTheDocument();
    await expect(email).not.toBeChecked();

    await userEvent.click(canvas.getByText("Email updates"));

    await expect(email).toBeChecked();
  },
};

export const Disabled: Story = {
  render: () => (
    <Fieldset disabled className="w-72">
      <Legend>Account visibility</Legend>

      <div className="mt-3 grid gap-3">
        <Label className="inline-flex items-center gap-3 font-normal">
          <Radio name="visibility" value="public" defaultChecked />

          <span>Public</span>
        </Label>

        <Label className="inline-flex items-center gap-3 font-normal">
          <Radio name="visibility" value="private" />

          <span>Private</span>
        </Label>
      </div>
    </Fieldset>
  ),

  play: async ({ canvas }) => {
    const group = canvas.getByRole("group", {
      name: "Account visibility",
    });

    const publicOption = canvas.getByRole("radio", {
      name: "Public",
    });

    const privateOption = canvas.getByRole("radio", {
      name: "Private",
    });

    await expect(group).toHaveAttribute("disabled");

    await expect(publicOption).toBeDisabled();
    await expect(privateOption).toBeDisabled();
  },
};

export const WithDescription: Story = {
  render: () => (
    <Fieldset className="w-72" aria-describedby="contact-description">
      <Legend>Contact preferences</Legend>

      <FieldDescription id="contact-description" className="mt-2">
        Choose how we may contact you.
      </FieldDescription>

      <div className="mt-3 grid gap-3">
        <Label className="inline-flex items-center gap-3 font-normal">
          <Checkbox />

          <span>Email</span>
        </Label>

        <Label className="inline-flex items-center gap-3 font-normal">
          <Checkbox />

          <span>SMS</span>
        </Label>
      </div>
    </Fieldset>
  ),

  play: async ({ canvas }) => {
    const group = canvas.getByRole("group", {
      name: "Contact preferences",
    });

    const description = canvas.getByText("Choose how we may contact you.");

    await expect(group).toHaveAttribute("aria-describedby", "contact-description");

    await expect(description).toHaveAttribute("id", "contact-description");
  },
};

export const Bidirectional: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-8">
      <Fieldset dir="ltr">
        <Legend>Preferred contact method</Legend>

        <div className="mt-3 grid gap-3">
          <Label className="inline-flex items-center gap-3 font-normal">
            <Radio name="contact-en" defaultChecked />

            <span>Email</span>
          </Label>

          <Label className="inline-flex items-center gap-3 font-normal">
            <Radio name="contact-en" />

            <span>Phone</span>
          </Label>
        </div>
      </Fieldset>

      <Fieldset dir="rtl">
        <Legend>روش ارتباط ترجیحی</Legend>

        <div className="mt-3 grid gap-3">
          <Label className="inline-flex items-center gap-3 font-normal">
            <Radio name="contact-fa" defaultChecked />

            <span>ایمیل</span>
          </Label>

          <Label className="inline-flex items-center gap-3 font-normal">
            <Radio name="contact-fa" />

            <span>تلفن</span>
          </Label>
        </div>
      </Fieldset>
    </div>
  ),

  play: async ({ canvas }) => {
    const english = canvas.getByRole("group", {
      name: "Preferred contact method",
    });

    const persian = canvas.getByRole("group", {
      name: "روش ارتباط ترجیحی",
    });

    await expect(english).toHaveAttribute("dir", "ltr");

    await expect(persian).toHaveAttribute("dir", "rtl");
  },
};
