import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-control",
    "font-body text-label",
    "transition-colors duration-fast ease-standard",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-focus",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-primary text-primary-foreground", "shadow-control", "hover:bg-primary-hover"],

        secondary: ["bg-surface-muted text-foreground", "hover:bg-surface"],

        outline: [
          "border border-control-border",
          "bg-transparent text-foreground",
          "hover:bg-surface-muted",
        ],

        ghost: ["bg-transparent text-foreground", "hover:bg-surface-muted"],

        danger: ["bg-danger text-danger-foreground", "hover:bg-danger-hover"],
      },

      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-5",
        icon: "size-10",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
