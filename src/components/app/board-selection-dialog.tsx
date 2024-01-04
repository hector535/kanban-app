import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Board, EyeSlash } from "@/components/icons";
import { ThemeSwitcher } from "@/components/app";
import { useAppDispatch, useAppSelector, useViewport } from "@/hooks";
import { useEffect, useState } from "react";
import { setDialogVisibility } from "@/slices/ui-slice";

const boards = [
  {
    id: 1,
    name: "Platform Launch",
    selected: true,
  },
  {
    id: 2,
    name: "Marketing Plan",
    selected: false,
  },
  {
    id: 3,
    name: "Roadmap",
    selected: false,
  },
];

type MenuOptionProps = {
  name: string;
  selected?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

const MenuItem = (props: MenuOptionProps) => {
  const { name, selected, className, ...restProps } = props;

  return (
    <button
      type="button"
      className={`relative flex items-center gap-3 rounded-r-[6.25rem] h-12 w-[90%] max-w-[16.25rem] pl-6 text-[0.9375rem] font-bold ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 ${
        selected && "text-white bg-purple"
      } ${className}`}
      {...restProps}
    >
      <Board className={selected ? "[&>path]:fill-white" : ""} />
      <span className="relative -top-[1px]">{name}</span>
    </button>
  );
};

const MenuItemList = () => {
  return (
    <ul className="-ml-6 max-h-[18rem] py-2 overflow-auto">
      {boards.map(({ id, ...props }) => (
        <MenuItem key={id} {...props} />
      ))}

      <MenuItem
        className="text-purple [&>svg>path]:fill-purple"
        name="+ Create New Board"
      />
    </ul>
  );
};

export const BoardSelectionDialog = () => {
  const showDialog = useAppSelector(
    (state) => state.ui.dialogs.showBoardSelection
  );
  const dispatch = useAppDispatch();

  const { vw } = useViewport();
  const [displayAsModal, setDisplayAsModal] = useState(vw < 768);

  const handleHideDialog = () => {
    dispatch(
      setDialogVisibility({
        name: "showBoardSelection",
        visibility: false,
      })
    );
  };

  useEffect(() => {
    setDisplayAsModal(vw < 768);
  }, [vw]);

  return (
    <Dialog open={showDialog} modal={displayAsModal}>
      <DialogContent className="gap-4 top-[calc(var(--height-toolbar)+15px)] translate-y-0 py-4 px-6 max-w-[20rem] md:w-[var(--width-sidebar)] md:top-[var(--height-toolbar)] md:bottom-0 md:left-0 md:data-[state=open]:animate-slide-in md:data-[state=closed]:animate-slide-out md:py-8 md:shadow-none md:border-t-0 md:rounded-r-none md:gap-[1.125rem] md:grid-rows-[auto_auto_1fr_auto]">
        <DialogHeader>
          <DialogTitle className="text-xs font-bold tracking-[2.4px] uppercase text-gray">
            All Boards (3)
          </DialogTitle>
        </DialogHeader>

        <MenuItemList />

        <ThemeSwitcher className="mx-[-0.5rem] md:self-end" />
        <button
          className="flex gap-2.5 items-center text-[0.9375rem] font-bold text-gray ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
          onClick={handleHideDialog}
        >
          <EyeSlash />
          Hide Sidebar
        </button>
      </DialogContent>
    </Dialog>
  );
};
