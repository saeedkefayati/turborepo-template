import { cn } from "@/lib/cn";

import type { ButtonProps } from "./Button.types";
import { buttonVariants } from "./Button.variants";

export function Button({
  ref,
  className,
  variant,
  size,
  loading = false,
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        />
      ) : null}

      {children}
    </button>
  );
}
