import { cn } from "@/lib/cn";

import type { SwitchProps } from "./Switch.types";
import { switchVariants } from "./Switch.variants";

export function Switch({
  ref,
  className,
  inputClassName,
  controlSize,
  dir,
  ...props
}: SwitchProps) {
  return (
    <span dir={dir} className={cn("relative inline-flex h-6 shrink-0 items-center", className)}>
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        dir={dir}
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
        className={switchVariants({
          controlSize,
        })}
      >
        <span />
      </span>
    </span>
  );
}
