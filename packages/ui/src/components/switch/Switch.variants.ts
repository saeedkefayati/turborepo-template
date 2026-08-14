import { cva } from "class-variance-authority";

export const switchVariants = cva(
  [
    "pointer-events-none relative inline-flex shrink-0 items-center",
    "rounded-pill border border-control-border",
    "bg-surface-muted shadow-control",
    "transition-colors duration-fast ease-standard",
    "peer-checked:border-primary peer-checked:bg-primary",
    "peer-focus-visible:border-focus",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-focus",
    "peer-focus-visible:ring-offset-2",
    "peer-focus-visible:ring-offset-background",
    "peer-disabled:opacity-50",
    "peer-aria-invalid:border-danger",
    "peer-aria-invalid:ring-danger",
    "[&>span]:absolute [&>span]:start-0.5",
    "[&>span]:rounded-full [&>span]:bg-muted-foreground",
    "[&>span]:transition-[inset-inline-start]",
    "[&>span]:duration-fast [&>span]:ease-standard",
    "peer-checked:[&>span]:bg-primary-foreground",
  ],
  {
    variants: {
      controlSize: {
        sm: ["h-4 w-7 [&>span]:size-3", "peer-checked:[&>span]:start-[0.875rem]"],
        md: ["h-5 w-9 [&>span]:size-4", "peer-checked:[&>span]:start-[1.125rem]"],
        lg: ["h-6 w-11 [&>span]:size-5", "peer-checked:[&>span]:start-[1.375rem]"],
      },
    },

    defaultVariants: {
      controlSize: "md",
    },
  },
);
