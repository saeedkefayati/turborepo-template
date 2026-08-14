import { cn } from "@/lib/cn";

import type { LabelProps } from "./Label.types";

export function Label({ ref, className, ...props }: LabelProps) {
  return (
    <label
      ref={ref}
      className={cn("font-body text-body-sm text-foreground font-medium", className)}
      {...props}
    />
  );
}
