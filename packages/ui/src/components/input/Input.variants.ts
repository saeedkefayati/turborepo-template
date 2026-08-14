import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full min-w-0",
    "rounded-control border border-control-border",
    "bg-background text-foreground shadow-control",
    "font-body text-start",
    "placeholder:text-muted-foreground",
    "transition-colors duration-fast ease-standard",
    "focus-visible:border-focus focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-focus",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default read-only:bg-surface-muted",
    "aria-invalid:border-danger",
    "aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger",
  ],
  {
    variants: {
      controlSize: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-10 px-3 text-body-sm",
        lg: "h-12 px-4 text-body",
      },
    },

    defaultVariants: {
      controlSize: "md",
    },
  },
);
