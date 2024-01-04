import { Logo, ArrowDown, Plus, VerticalDots } from "@/components/icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { cn } from "@/lib/utils";
import { setDialogVisibility } from "@/slices/ui-slice";

export const Toolbar = () => {
  const isSideBarOpened = useAppSelector(
    (state) => state.ui.dialogs.showBoardSelection
  );
  const dispatch = useAppDispatch();

  const handleDeleteBoard = () => {
    dispatch(
      setDialogVisibility({
        name: "showBoardDeletion",
        visibility: true,
      })
    );
  };

  return (
    <header
      className={cn(
        "h-[var(--height-toolbar)] bg-white flex md:grid md:grid-cols-[auto_1fr] dark:bg-gray-very-dark",
        isSideBarOpened && "relative z-[100] pointer-events-auto"
      )}
    >
      <div
        className={cn(
          "grid items-center pl-4 w-[2.7rem] h-full overflow-hidden transition-[width] duration-250 ease-out md:w-[12.5rem] md:pl-6 md:border-r md:border-gray-light dark:border-gray-dark",
          isSideBarOpened && "md:w-[var(--width-sidebar)] md:delay-310"
        )}
      >
        <Logo className="dark:[&>path]:fill-white" />
      </div>

      <div className="flex items-center justify-between px-4 w-full md:px-6">
        <Button
          variant="ghost"
          className="rounded-md gap-2 px-0 dark:hover:bg-slate-700 md:hidden"
        >
          <span className="text-h-lg text-black dark:text-white">
            Platform Launch
          </span>
          <ArrowDown className="relative top-0.5" />
        </Button>

        <h1 className="hidden md:block text-xl font-bold text-black dark:text-white">
          Platform Launch
        </h1>

        <Button size="icon" className="ml-auto rounded-3xl w-12 h-8 md:hidden">
          <Plus />
        </Button>

        <Button size="lg" className="hidden md:inline-flex ml-auto">
          + Add New Task
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-4 h-5 w-1">
              <VerticalDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-b-lg text-gray focus:text-gray">
              Edit Board
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-b-lg text-red focus:text-red"
              onClick={handleDeleteBoard}
            >
              Delete Board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
