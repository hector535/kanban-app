import { Logo, ArrowDown, Plus, VerticalDots } from "@/components/icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { useAppDispatch } from "@/hooks";
import { setDialogVisibility } from "@/slices/ui-slice";

export const Toolbar = () => {
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
    <header className="px-4 h-[var(--height-toolbar)] flex items-center bg-white">
      <Logo />
      <Button variant="ghost" className="rounded-md gap-2 ml-3 px-2">
        <span className="text-h-lg text-black">Platform Launch</span>
        <ArrowDown className="relative top-0.5" />
      </Button>

      <Button size="icon" className="ml-auto rounded-3xl w-12 h-8">
        <Plus />
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
    </header>
  );
};
