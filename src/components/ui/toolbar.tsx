import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { Logo, ArrowDown, Plus, VerticalDots } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { cn } from "@/lib/utils";
import { toggleField } from "@/slices/ui-slice";
import { shallowEqual } from "react-redux";

export const Toolbar = () => {
  const isMenuOpened = useAppSelector((state) => state.ui.showMenu);
  const { board, columns } = useAppSelector((state) => {
    const board = state.app.boards[state.app.selectedBoardId] || {
      columnIds: [],
    };
    const columns = board.columnIds.map(
      (columnId) => state.app.columns[columnId]
    );

    return { board, columns };
  }, shallowEqual);

  const dispatch = useAppDispatch();

  const handleAddNewTaskClick = () => {
    dispatch(toggleField({ name: "showNewTaskForm" }));
  };

  const handleMenuClick = () => {
    dispatch(toggleField({ name: "showMenu" }));
  };

  const handleEditBoardClick = () => {
    dispatch(toggleField({ name: "showEditBoardForm" }));
  };

  const handleDeleteBoardClick = () => {
    dispatch(toggleField({ name: "showDeleteBoardConfirmation" }));
  };

  return (
    <header
      className={
        "transition-colors duration-200 h-[var(--height-toolbar)] bg-white flex md:grid md:grid-cols-[auto_1fr] dark:bg-gray-very-dark"
      }
    >
      <div
        className={cn(
          "grid items-center pl-4 w-[2.7rem] h-full overflow-hidden transition-[width,colors] duration-250 ease-out md:w-[12.5rem] md:pl-6 md:border-r md:border-gray-light dark:border-gray-dark",
          isMenuOpened && "md:w-[var(--width-sidebar)] md:delay-310"
        )}
      >
        <Logo className="transition-colors duration-200 dark:[&>path]:fill-white" />
      </div>

      <div className="flex items-center justify-between px-4 w-full md:px-6">
        <Button
          variant="ghost"
          className="rounded-md gap-2 px-0 dark:hover:bg-slate-700 md:hidden"
          onClick={handleMenuClick}
        >
          <span className="transition-colors duration-200 text-h-lg text-black dark:text-white">
            {board?.name || "Select a board"}
          </span>
          <ArrowDown className="relative top-0.5" />
        </Button>

        <h1 className="transition-colors duration-200 hidden text-xl font-bold text-black md:block xl:text-2xl dark:text-white">
          {board?.name || "Select a board"}
        </h1>

        <Button
          size="icon"
          className="ml-auto rounded-3xl w-12 h-8 md:hidden"
          onClick={handleAddNewTaskClick}
          disabled={!board || columns.length === 0}
        >
          <Plus />
          <span className="sr-only">Add new task</span>
        </Button>

        <Button
          size="lg"
          className="hidden md:inline-flex ml-auto"
          onClick={handleAddNewTaskClick}
          disabled={!board || columns.length === 0}
        >
          + Add New Task
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger disabled={!board} asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-7 w-7 rounded-sm hover:bg-slate-200"
            >
              <VerticalDots />
              <span className="sr-only">Board menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="text-b-lg text-gray focus:text-gray"
              onClick={handleEditBoardClick}
            >
              Edit Board
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-b-lg text-red focus:text-red"
              onClick={handleDeleteBoardClick}
            >
              Delete Board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
