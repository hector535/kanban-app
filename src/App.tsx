import { Button, Toolbar } from "@/components/ui";
import { Eye } from "@/components/icons";
import { DialogContainers, EmptyBoardMessage } from "@/components/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDialogVisibility } from "@/slices/ui-slice";
import clsx from "clsx";

const ShowSideMenuButton = () => {
  const isSideMenuOpened = useAppSelector(
    (state) => state.ui.dialogs.showBoardSelection
  );

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      setDialogVisibility({ name: "showBoardSelection", visibility: true })
    );
  };

  if (isSideMenuOpened) return null;

  return (
    <Button
      size="icon"
      className="hidden md:inline-flex fixed w-14 h-12 left-0 bottom-8 rounded-r-[6.25rem]"
      onClick={handleClick}
    >
      <Eye className="relative -left-0.5 w-[18px] h-[14px]" />
    </Button>
  );
};

function App() {
  const isSideMenuOpened = useAppSelector(
    (state) => state.ui.dialogs.showBoardSelection
  );

  return (
    <>
      <Toolbar />

      <main
        className={clsx(
          "h-[calc(100vh-var(--height-toolbar))] transition-[margin] duration-700",
          isSideMenuOpened && "ml-[16.25rem]"
        )}
      >
        <EmptyBoardMessage />
      </main>

      <DialogContainers />
      <ShowSideMenuButton />
    </>
  );
}

export default App;
