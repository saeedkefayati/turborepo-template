import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect } from "storybook/test";

import { Input } from "../input";
import { Select } from "../select";
import { Textarea } from "../textarea";

import { Field, FieldDescription, FieldError, FieldLabel } from ".";

const meta = {
  title: "Form Controls/Field",
  component: Field,

  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="email">Email address</FieldLabel>

      <Input
        id="email"
        type="email"
        aria-describedby="email-description"
        placeholder="name@example.com"
      />

      <FieldDescription id="email-description">
        We will never share your email address.
      </FieldDescription>
    </Field>
  ),

  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Email address");

    await expect(input).toHaveAttribute("aria-describedby", "email-description");

    await expect(canvas.getByText("We will never share your email address.")).toHaveAttribute(
      "id",
      "email-description",
    );
  },
};

export const Invalid: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="username">Username</FieldLabel>

      <Input
        id="username"
        defaultValue="ab"
        aria-invalid="true"
        aria-describedby="username-error"
      />

      <FieldError id="username-error">Username must contain at least 3 characters.</FieldError>
    </Field>
  ),

  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Username");

    await expect(input).toHaveAttribute("aria-invalid", "true");

    await expect(input).toHaveAttribute("aria-describedby", "username-error");

    await expect(canvas.getByText("Username must contain at least 3 characters.")).toHaveAttribute(
      "id",
      "username-error",
    );
  },
};

export const WithTextarea: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="message">Message</FieldLabel>

      <Textarea
        id="message"
        rows={4}
        aria-describedby="message-description"
        placeholder="Write your message..."
      />

      <FieldDescription id="message-description">Maximum 500 characters.</FieldDescription>
    </Field>
  ),

  play: async ({ canvas }) => {
    const textarea = canvas.getByLabelText("Message");

    await expect(textarea).toHaveAttribute("aria-describedby", "message-description");
  },
};

export const WithSelect: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="plan">Plan</FieldLabel>

      <Select id="plan" defaultValue="" aria-describedby="plan-description">
        <option value="" disabled>
          Select a plan
        </option>

        <option value="basic">Basic</option>

        <option value="pro">Pro</option>
      </Select>

      <FieldDescription id="plan-description">You can change your plan later.</FieldDescription>
    </Field>
  ),

  play: async ({ canvas, userEvent }) => {
    const select = canvas.getByLabelText("Plan");

    await expect(select).toHaveValue("");

    await userEvent.selectOptions(select, "pro");

    await expect(select).toHaveValue("pro");
  },
};

export const Bidirectional: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-6">
      <Field dir="ltr">
        <FieldLabel htmlFor="name-en">Display name</FieldLabel>

        <Input id="name-en" defaultValue="Saeed" />

        <FieldDescription>This name is visible to other users.</FieldDescription>
      </Field>

      <Field dir="rtl">
        <FieldLabel htmlFor="name-fa">نام نمایشی</FieldLabel>

        <Input id="name-fa" defaultValue="سعید" />

        <FieldDescription>این نام برای سایر کاربران نمایش داده می‌شود.</FieldDescription>
      </Field>
    </div>
  ),

  play: async ({ canvas }) => {
    const english = canvas.getByLabelText("Display name");

    const persian = canvas.getByLabelText("نام نمایشی");

    await expect(english.closest("[dir]")).toHaveAttribute("dir", "ltr");

    await expect(persian.closest("[dir]")).toHaveAttribute("dir", "rtl");
  },
};
