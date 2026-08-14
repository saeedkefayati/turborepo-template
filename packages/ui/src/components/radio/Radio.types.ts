import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { radioVariants } from "./Radio.variants";

export type RadioProps = Omit<ComponentPropsWithRef<"input">, "type" | "className"> &
  VariantProps<typeof radioVariants> & {
    className?: string;
    inputClassName?: string;
  };
