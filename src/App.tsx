import clsx from "clsx";
import { Toaster } from "@/components/ui/toaster";
import { Button, Toolbar } from "@/components/ui";
import { Eye } from "@/components/icons";
import { DialogContainers, MainView } from "@/components/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { useEffect } from "react";

function App() {
  const showMenu = useAppSelector((state) => state.ui.showMenu);
  const currentTheme = useAppSelector((state) => state.ui.theme);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleField({ name: "showMenu" }));
  };

  useEffect(() => {
    if (currentTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [currentTheme]);

  return (
    <>
      <Toolbar />

      <main
        className={clsx(
          "mt-[var(--height-toolbar)] h-[calc(100vh-var(--height-toolbar)-18px)] transition-[margin] duration-700",
          showMenu && "md:ml-[var(--width-sidebar)]"
        )}
      >
        <MainView />
      </main>

      <DialogContainers />

      {!showMenu && (
        <Button
          size="icon"
          className="hidden md:inline-flex fixed w-14 h-12 left-0 bottom-8 rounded-r-[6.25rem]"
          onClick={handleClick}
        >
          <Eye className="relative -left-0.5 w-[18px] h-[14px]" />
          <span className="sr-only">sidebar menu toggle button</span>
        </Button>
      )}

      <Toaster />
    </>
  );
}

export default App;
