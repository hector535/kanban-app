import React from "react";
import { cn } from "@/lib/utils";

interface CrossProps extends React.ComponentPropsWithoutRef<"svg"> {}

const Cross = React.forwardRef<SVGSVGElement, CrossProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        className={cn(className)}
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
      >
        <rect
          x="12.728"
          width="3"
          height="18"
          transform="rotate(45 12.728 0)"
          fill="#828FA3"
        />
        <rect
          y="2.12109"
          width="3"
          height="18"
          transform="rotate(-45 0 2.12109)"
          fill="#828FA3"
        />
      </svg>
    );
  }
);

Cross.displayName = "Cross";

export { Cross };
