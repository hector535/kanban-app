import React from "react";
import { cn } from "@/lib/utils";

interface PlusProps extends React.ComponentPropsWithoutRef<"svg"> {}

const Plus = React.forwardRef<SVGSVGElement, PlusProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        className={cn(className)}
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M7.368 12V7.344H12V4.632H7.368V0H4.656V4.632H0V7.344H4.656V12H7.368Z"
          fill="white"
        />
      </svg>
    );
  }
);

Plus.displayName = "Plus";

export { Plus };
