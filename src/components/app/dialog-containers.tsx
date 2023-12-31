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

export const DialogContainers = () => {
  const dialogs = useAppSelector((state) => state.ui.dialogs);
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
    <>
      {/* Delete Board Modal */}
      <Dialog open={dialogs.showBoardDeletion}>
        <DialogContent>
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-red text-[1.125rem] leading-[1.4375rem] font-bold">
              Delete this board?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the
              <span className="font-bold"> Platform Launch</span> board? This
              action will remove all columns and tasks and cannot be reversed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="grid gap-4">
            <Button
              type="button"
              variant="destructive"
              onClick={handleBoardDeletion}
            >
              Delete
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={dispatchDialogVisibility}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
