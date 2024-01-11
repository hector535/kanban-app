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
import { removeTask } from "@/slices/app-slice";
import { toggleField } from "@/slices/ui-slice";
import { useToast } from "../ui/use-toast";

export const DeleteTaskDialog = () => {
  const showDialog = useAppSelector(
    (state) => state.ui.showDeleteTaskConfirmation
  );
  const task = useAppSelector(
    (state) => state.app.tasks[state.app.selectedTaskId]
  );
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleCancelClick = () => {
    dispatch(toggleField({ name: "showDeleteTaskConfirmation" }));
    dispatch(toggleField({ name: "showTaskDetails" }));
  };

  const handleDeleteClick = () => {
    dispatch(removeTask());
    dispatch(toggleField({ name: "showDeleteTaskConfirmation" }));
    toast({
      variant: "success",
      description: "The task has been deleted successfully.",
    });
  };

  return (
    <Dialog open={showDialog}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-red text-[1.125rem] leading-[1.4375rem] font-bold">
            Delete this task?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the
            <span className="font-bold"> {task?.title}</span> task and its
            subtasks? This action cannot be reversed.
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
