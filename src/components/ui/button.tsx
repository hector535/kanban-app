import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center select-none whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-purple text-white hover:bg-purple-light",
        secondary:
          "bg-purple/10 text-purple hover:bg-purple/20 dark:bg-white dark:hover:bg-purple/10",
        destructive: "bg-red text-white hover:bg-red-light",
        ghost: "bg-transparent text-black hover:bg-slate-200",
      },
      size: {
        default:
          "h-10 rounded-[1.25rem] text-[0.8125rem] font-medium leading-[1.4375rem] px-4",
        lg: "h-12 rounded-3xl text-[0.9375rem] font-bold leading-[1.1875rem] px-8",
        icon: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
