import React from "react";
import { Button, Input } from "@/components/ui";
import { Cross } from "@/components/icons";

type InputRowProps = {
  hasError?: boolean;
  onRemove: () => void;
} & React.ComponentPropsWithoutRef<"input">;

export const InputRow = React.forwardRef<HTMLInputElement, InputRowProps>(
  (props, ref) => {
    const { hasError, onRemove, ...restProps } = props;

    return (
      <div className="flex items-center gap-4">
        <Input ref={ref} hasError={hasError} {...restProps} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="transition-transform hover:bg-transparent hover:scale-125"
          onClick={onRemove}
        >
          <Cross className={`${hasError ? "[&>rect]:fill-red" : ""}`} />
        </Button>
      </div>
    );
  }
);
