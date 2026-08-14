import { cn } from "@/lib/cn";

import type { TextareaProps } from "./Textarea.types";
import { textareaVariants } from "./Textarea.variants";

export function Textarea({ ref, className, controlSize, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        textareaVariants({
          controlSize,
        }),
        className,
      )}
      {...props}
    />
  );
}
