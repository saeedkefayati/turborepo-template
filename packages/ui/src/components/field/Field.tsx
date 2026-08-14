import { cn } from "@/lib/cn";

import type { FieldDescriptionProps, FieldErrorProps, FieldProps } from "./Field.types";

export function Field({ ref, className, ...props }: FieldProps) {
  return <div ref={ref} className={cn("grid gap-2", className)} {...props} />;
}

export function FieldDescription({ ref, className, ...props }: FieldDescriptionProps) {
  return (
    <p
      ref={ref}
      className={cn("font-body text-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function FieldError({ ref, className, ...props }: FieldErrorProps) {
  return (
    <p ref={ref} className={cn("font-body text-body-sm text-danger-text", className)} {...props} />
  );
}
