import { cn } from "@/lib/cn";

import type { CheckboxProps } from "./Checkbox.types";
import { checkboxVariants } from "./Checkbox.variants";

export function Checkbox({ ref, className, inputClassName, controlSize, ...props }: CheckboxProps) {
  return (
    <span
      className={cn("relative inline-flex size-6 shrink-0 items-center justify-center", className)}
    >
      <input
        ref={ref}
        type="checkbox"
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
        className={checkboxVariants({
          controlSize,
        })}
      >
        <svg viewBox="0 0 16 16" fill="none" className="size-3/4" aria-hidden="true">
          <path
            d="M3.5 8.5 6.5 11.5 12.5 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}
