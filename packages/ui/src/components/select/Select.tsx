import { cn } from "@/lib/cn";

import type { SelectProps } from "./Select.types";
import { selectVariants } from "./Select.variants";

export function Select({
  ref,
  className,
  selectClassName,
  controlSize,
  children,
  dir,
  ...props
}: SelectProps) {
  return (
    <span dir={dir} className={cn("relative inline-flex w-full", className)}>
      <select
        ref={ref}
        dir={dir}
        className={cn(
          selectVariants({
            controlSize,
          }),
          selectClassName,
        )}
        {...props}
      >
        {children}
      </select>

      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="text-muted-foreground pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2"
      >
        <path
          d="m4 6 4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
