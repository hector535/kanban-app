import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-[0.8125rem] text-black font-medium leading-[1.4375rem] ring-offset-white file:border-0 file:text-sm file:font-medium placeholder:text-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:border-[#828FA3]/50 dark:ring-offset-slate-950 dark:placeholder:text-white/25 dark:focus-visible:ring-slate-300",
          hasError ? "border-red dark:border-red" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
