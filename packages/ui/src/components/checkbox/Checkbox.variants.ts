import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  [
    "pointer-events-none inline-flex shrink-0 items-center justify-center",
    "rounded-xs border border-control-border",
    "bg-background text-transparent shadow-control",
    "transition-colors duration-fast ease-standard",
    "peer-checked:border-primary peer-checked:bg-primary",
    "peer-checked:text-primary-foreground",
    "peer-focus-visible:border-focus",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-focus",
    "peer-focus-visible:ring-offset-2",
    "peer-focus-visible:ring-offset-background",
    "peer-disabled:opacity-50",
    "peer-aria-invalid:border-danger",
    "peer-aria-invalid:ring-danger",
  ],
  {
    variants: {
      controlSize: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },

    defaultVariants: {
      controlSize: "md",
    },
  },
);
