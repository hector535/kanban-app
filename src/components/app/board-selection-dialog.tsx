import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Board } from "@/components/icons";
import { ThemeSwitcher } from "@/components/app";

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

export const BoardSelectionDialog = () => {
  return (
    <Dialog open={true}>
      <DialogContent className="gap-4 top-[calc(var(--height-toolbar)+15px)] translate-y-0 py-4 px-6 max-w-[20rem]">
        <DialogHeader>
          <DialogTitle className="text-xs font-bold tracking-[2.4px] uppercase text-gray">
            All Boards (3)
          </DialogTitle>
        </DialogHeader>

        <ul className="-ml-6 max-h-[18rem] py-2 overflow-auto">
          {boards.map(({ id, ...props }) => (
            <MenuItem key={id} {...props} />
          ))}

          <MenuItem
            className="text-purple [&>svg>path]:fill-purple"
            name="+ Create New Board"
          />
        </ul>

        <ThemeSwitcher className="mx-[-0.5rem]" />
      </DialogContent>
    </Dialog>
  );
};
