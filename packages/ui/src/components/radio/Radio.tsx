import { cn } from "@/lib/cn";

import type { RadioProps } from "./Radio.types";
import { radioVariants } from "./Radio.variants";

export function Radio({ ref, className, inputClassName, controlSize, ...props }: RadioProps) {
  return (
    <span
      className={cn("relative inline-flex size-6 shrink-0 items-center justify-center", className)}
    >
      <input
        ref={ref}
        type="radio"
        className={cn(
          "peer absolute inset-0 size-full cursor-pointer opacity-0",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed",
          inputClassName,
        )}
        {...props}
      />

      <span
        aria-hidden="true"
        className={radioVariants({
          controlSize,
        })}
      />
    </span>
  );
}
