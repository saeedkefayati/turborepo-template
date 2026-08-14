import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { selectVariants } from "./Select.variants";

export type SelectProps = Omit<ComponentPropsWithRef<"select">, "multiple" | "size" | "className"> &
  VariantProps<typeof selectVariants> & {
    className?: string;
    selectClassName?: string;
  };
