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
import { setDialogVisibility } from "@/slices/ui-slice";

export const DeleteTaskDialog = () => {
  const { showTaskDeletion } = useAppSelector((state) => state.ui.dialogs);
  const dispatch = useAppDispatch();

  const dispatchDialogVisibility = () => {
    dispatch(
      setDialogVisibility({
        name: "showBoardDeletion",
        visibility: false,
      })
    );
  };

  const handleBoardDeletion = () => {
    dispatchDialogVisibility();
  };

  return (
    <Dialog open={showTaskDeletion}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-red text-[1.125rem] leading-[1.4375rem] font-bold">
            Delete this task?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the
            <span className="font-bold"> Build settings UI</span> task and its
            subtasks? This action cannot be reversed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-y-4 md:space-y-0 md:flex md:gap-4">
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={handleBoardDeletion}
          >
            Delete
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={dispatchDialogVisibility}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
