import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";

export const EmptyBoardMessage = () => {
  const isBoardSelected = useAppSelector((state) => state.app.selectedBoardId);
  const dispatch = useAppDispatch();

  const handleAddNewcolumnClick = () => {
    dispatch(toggleField({ name: "showEditBoardForm" }));
  };

  return (
    <div className="text-center grid gap-6 h-full content-center justify-items-center">
      {isBoardSelected ? (
        <>
          <p className="text-h-lg">
            This board is empty. Create a new <br /> column to get started.
          </p>

          <Button size="lg" onClick={handleAddNewcolumnClick}>
            + Add New Column
          </Button>
        </>
      ) : (
        <p className="text-h-lg">No board has been selected.</p>
      )}
    </div>
  );
};
