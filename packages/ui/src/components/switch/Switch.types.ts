import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { switchVariants } from "./Switch.variants";

export type SwitchProps = Omit<ComponentPropsWithRef<"input">, "type" | "role" | "aria-checked"> &
  VariantProps<typeof switchVariants>;
