import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Board, EyeSlash } from "@/components/icons";
import { ThemeSwitcher } from "@/components/app";
import { useAppDispatch, useAppSelector, useViewport } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { selectBoard } from "@/slices/app-slice";

type MenuListItemProps = {
  name: string;
  className?: string;
  selected?: boolean;
  Icon: React.ElementType;
} & React.ComponentPropsWithoutRef<"button">;

const MenuListItem = (props: MenuListItemProps) => {
  const { name, selected, className, Icon, ...restProps } = props;

  return (
    <button
      type="button"
      className={`transition-colors duration-200 relative flex items-center gap-3 rounded-r-[6.25rem] h-12 w-[95%] max-w-[16.25rem] pl-6 text-[0.9375rem] font-bold  ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 ${
        selected && "text-white bg-purple"
      } 
      ${
        !selected &&
        "hover:bg-purple/10 hover:text-purple [&>svg>path]:hover:fill-purple dark:hover:bg-white"
      } 
      ${className}`}
      {...restProps}
    >
      <Icon
        className={
          selected ? "transition-colors duration-200 [&>path]:fill-white" : ""
        }
      />
      <span className="relative -top-[1px]">{name}</span>
    </button>
  );
};

export const MenuDialog = () => {
  const showDialog = useAppSelector((state) => state.ui.showMenu);
  const boards = useAppSelector((state) => state.app.boards);
  const selectedBoardId = useAppSelector((state) => state.app.selectedBoardId);
  const boardIds = Object.keys(boards);

  const dispatch = useAppDispatch();

  const { vw } = useViewport();
  const [displayAsModal, setDisplayAsModal] = useState(vw < 768);

  const handleDialogHide = () => {
    dispatch(toggleField({ name: "showMenu" }));
  };

  const handleCreateOptionClick = () => {
    dispatch(toggleField({ name: "showNewBoardForm" }));
  };

  const handleBoardOptionClick = (boardId: string) => {
    dispatch(selectBoard(boardId));
  };

  useEffect(() => {
    setDisplayAsModal(vw < 768);
  }, [vw]);

  return (
    <Dialog
      open={showDialog}
      modal={displayAsModal}
      onOpenChange={() => vw < 768 && handleDialogHide()}
    >
      <DialogContent className="gap-4 top-[calc(var(--height-toolbar)+15px)] translate-y-0 py-4 px-6 max-w-[20rem] md:w-[var(--width-sidebar)] md:top-[var(--height-toolbar)] md:bottom-0 md:left-0 md:data-[state=open]:animate-slide-in md:data-[state=closed]:animate-slide-out md:py-8 md:shadow-none md:border-t-0 md:rounded-r-none md:gap-[1.125rem] md:grid-rows-[auto_auto_1fr_auto]">
        <DialogHeader>
          <DialogTitle className="text-xs font-bold tracking-[2.4px] uppercase text-gray">
            All Boards ({boardIds.length})
          </DialogTitle>
        </DialogHeader>

        <div className="-ml-6 max-h-[18rem] md:max-h-none py-2 overflow-auto">
          {boardIds.map((id) => {
            const board = boards[id];

            return (
              <MenuListItem
                key={id}
                Icon={Board}
                name={board.name}
                selected={selectedBoardId === id}
                onClick={() => handleBoardOptionClick(id)}
              />
            );
          })}

          <MenuListItem
            className="text-purple [&>svg>path]:fill-purple"
            name="+ Create New Board"
            Icon={Board}
            onClick={handleCreateOptionClick}
          />
        </div>

        <ThemeSwitcher className="mx-[-0.5rem] md:self-end" />

        <MenuListItem
          name="Hide Sidebar"
          className="-ml-6 hidden md:flex"
          Icon={EyeSlash}
          onClick={handleDialogHide}
        />
      </DialogContent>
    </Dialog>
  );
};
