import {
  DialogHeader,
  DialogFooter,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { removeBoard } from "@/slices/app-slice";
import { toggleField } from "@/slices/ui-slice";
import { useToast } from "../ui/use-toast";

export const DeleteBoardDialog = () => {
  const showDialog = useAppSelector(
    (state) => state.ui.showDeleteBoardConfirmation
  );
  const board = useAppSelector(
    (state) => state.app.boards[state.app.selectedBoardId]
  );
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleCancelClick = () => {
    dispatch(toggleField({ name: "showDeleteBoardConfirmation" }));
  };

  const handleDeleteClick = () => {
    dispatch(removeBoard());
    dispatch(toggleField({ name: "showDeleteBoardConfirmation" }));
    toast({
      variant: "success",
      description: "The board has been deleted successfully.",
    });
  };

  return (
    <Dialog open={showDialog}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-red text-[1.125rem] leading-[1.4375rem] font-bold">
            Delete this board?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the
            <span className="font-bold"> {board?.name}</span> board? This action
            will remove all columns and tasks and cannot be reversed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-y-4 md:space-y-0 md:flex md:gap-4">
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
