import { Switch } from "@/components/ui";
import { Moon, Sun } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleTheme } from "@/slices/ui-slice";

type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const { className } = props;
  const currentTheme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();
  const handleChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={cn(
        "transition-colors duration-200 h-12 rounded bg-gray-light flex justify-center items-center gap-5 dark:bg-gray-super-dark",
        className
      )}
    >
      <Sun />
      <Switch
        aria-label="theme toggle button"
        checked={currentTheme === "dark"}
        aria-checked={currentTheme === "dark"}
        onCheckedChange={handleChange}
      />
      <Moon />
    </div>
  );
};
