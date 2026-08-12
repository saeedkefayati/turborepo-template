import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "./Button.variants";

export type ButtonProps = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };
