import { cn } from "@/lib/cn";

import type { RadioProps } from "./Radio.types";
import { radioVariants } from "./Radio.variants";

export function Radio({ ref, className, controlSize, ...props }: RadioProps) {
  return (
    <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
      <input
        ref={ref}
        type="radio"
        className={cn(
          "peer absolute inset-0 size-full cursor-pointer opacity-0",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed",
          className,
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
