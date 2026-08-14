import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { selectVariants } from "./Select.variants";

export type SelectProps = Omit<ComponentPropsWithRef<"select">, "multiple" | "size"> &
  VariantProps<typeof selectVariants>;
