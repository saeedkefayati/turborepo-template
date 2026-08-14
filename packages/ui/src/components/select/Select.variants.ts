import { cva } from "class-variance-authority";

export const selectVariants = cva(
  [
    "w-full min-w-0 appearance-none",
    "rounded-control border border-control-border",
    "bg-background text-foreground shadow-control",
    "font-body text-start",
    "transition-colors duration-fast ease-standard",
    "focus-visible:border-focus focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-focus",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-danger",
    "aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger",
  ],
  {
    variants: {
      controlSize: {
        sm: "h-8 ps-3 pe-9 text-body-sm",
        md: "h-10 ps-3 pe-10 text-body-sm",
        lg: "h-12 ps-4 pe-11 text-body",
      },
    },

    defaultVariants: {
      controlSize: "md",
    },
  },
);
