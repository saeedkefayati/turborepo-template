import { cva } from "class-variance-authority";

export const radioVariants = cva(
  [
    "pointer-events-none inline-flex shrink-0 items-center justify-center",
    "rounded-full border border-control-border",
    "bg-background shadow-control",
    "after:block after:rounded-full after:bg-primary-foreground",
    "after:scale-0 after:transition-transform",
    "after:duration-fast after:ease-standard",
    "transition-colors duration-fast ease-standard",
    "peer-checked:border-primary peer-checked:bg-primary",
    "peer-checked:after:scale-100",
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
        sm: "size-4 after:size-1.5",
        md: "size-5 after:size-2",
        lg: "size-6 after:size-2.5",
      },
    },

    defaultVariants: {
      controlSize: "md",
    },
  },
);
