import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { inputVariants } from "./Input.variants";

export type InputProps = ComponentPropsWithRef<"input"> & VariantProps<typeof inputVariants>;
