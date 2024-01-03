import { Switch } from "@/components/ui";
import { Moon, Sun } from "@/components/icons";
import { cn } from "@/lib/utils";

type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "h-12 rounded bg-gray-light flex justify-center items-center gap-5 dark:bg-gray-super-dark",
        className
      )}
    >
      <Sun />
      <Switch />
      <Moon />
    </div>
  );
};
