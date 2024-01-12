import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui";
import { BoardFields, BoardForm } from "@/components/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { editBoard, selectBoardWithColumns } from "@/slices/app-slice";
import { useToast } from "../ui/use-toast";

export const EditBoardFormDialog = () => {
  const showDialog = useAppSelector((state) => state.ui.showEditBoardForm);
  const { selectedBoard, boardColumns } = useAppSelector(
    selectBoardWithColumns
  );

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const handleCloseDialog = () => {
    dispatch(toggleField({ name: "showEditBoardForm" }));
  };

  const handleFormSubmit = (form: BoardFields) => {
    dispatch(editBoard({ ...form, id: selectedBoard.id }));
    dispatch(toggleField({ name: "showEditBoardForm" }));
    toast({
      variant: "success",
      description: "The board has been updated successfully.",
    });
  };

  return (
    <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>

        <BoardForm
          defaultValues={{
            ...(selectedBoard || { id: "", name: "" }),
            columns: boardColumns,
          }}
          onFormSubmit={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
