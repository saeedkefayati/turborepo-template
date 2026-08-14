import type { ComponentPropsWithRef } from "react";

import type { VariantProps } from "class-variance-authority";

import type { textareaVariants } from "./Textarea.variants";

export type TextareaProps = ComponentPropsWithRef<"textarea"> &
  VariantProps<typeof textareaVariants>;
