import React from "react";
import { cn } from "@/lib/utils";

interface ArrowDownProps extends React.ComponentPropsWithoutRef<"svg"> {}

const ArrowDown = React.forwardRef<SVGSVGElement, ArrowDownProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        className={cn(className)}
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="7"
        viewBox="0 0 9 7"
        fill="none"
      >
        <path d="M1 1L5 5L9 1" stroke="#635FC7" stroke-width="2" />
      </svg>
    );
  }
);

ArrowDown.displayName = "ArrowDown";

export { ArrowDown };
