import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { radioVariants } from "./Radio.variants";

export type RadioProps = Omit<ComponentPropsWithRef<"input">, "type"> &
  VariantProps<typeof radioVariants>;
