import { cn } from "@/lib/cn";

import type { InputProps } from "./Input.types";
import { inputVariants } from "./Input.variants";

export function Input({ ref, className, controlSize, type = "text", ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        inputVariants({
          controlSize,
        }),
        className,
      )}
      {...props}
    />
  );
}
