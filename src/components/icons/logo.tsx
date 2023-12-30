import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.ComponentPropsWithoutRef<"svg"> {}

const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        className={cn(className)}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <rect width="6" height="25" rx="2" fill="#635FC7" />
        <rect
          opacity="0.75"
          x="9"
          width="6"
          height="25"
          rx="2"
          fill="#635FC7"
        />
        <rect
          opacity="0.5"
          x="18"
          width="6"
          height="25"
          rx="2"
          fill="#635FC7"
        />
      </svg>
    );
  }
);

Logo.displayName = "Logo";

export { Logo };
