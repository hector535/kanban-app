import React from "react";
import { cn } from "@/lib/utils";

interface VerticalDotsProps extends React.ComponentPropsWithoutRef<"svg"> {}

const VerticalDots = React.forwardRef<SVGSVGElement, VerticalDotsProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        className={cn(className)}
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="16"
        viewBox="0 0 4 16"
        fill="none"
      >
        <circle cx="1.84615" cy="1.84615" r="1.84615" fill="#828FA3" />
        <circle cx="1.84615" cy="8.00045" r="1.84615" fill="#828FA3" />
        <circle cx="1.84615" cy="14.1538" r="1.84615" fill="#828FA3" />
      </svg>
    );
  }
);

VerticalDots.displayName = "VerticalDots";

export { VerticalDots };
