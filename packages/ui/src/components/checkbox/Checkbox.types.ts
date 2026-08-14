import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { checkboxVariants } from "./Checkbox.variants";

export type CheckboxProps = Omit<ComponentPropsWithRef<"input">, "type"> &
  VariantProps<typeof checkboxVariants>;
