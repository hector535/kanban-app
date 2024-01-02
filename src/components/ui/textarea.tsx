import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-16 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-[0.8125rem] text-black font-medium leading-[1.4375rem] ring-offset-white placeholder:text-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:border-[#828FA3]/50 dark:ring-offset-slate-950 dark:placeholder:text-white/25 dark:focus-visible:ring-slate-300",
          hasError ? "border-red dark:border-red" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
