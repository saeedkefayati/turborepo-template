import { cn } from "@/lib/cn";

import type { FieldsetProps, LegendProps } from "./Fieldset.types";

export function Fieldset({ ref, className, ...props }: FieldsetProps) {
  return <fieldset ref={ref} className={cn("m-0 min-w-0 border-0 p-0", className)} {...props} />;
}

export function Legend({ ref, className, ...props }: LegendProps) {
  return (
    <legend
      ref={ref}
      className={cn("font-body text-body-sm text-foreground p-0 font-medium", className)}
      {...props}
    />
  );
}
