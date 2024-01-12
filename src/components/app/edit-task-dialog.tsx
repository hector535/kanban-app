import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { editTask, selectTaskWithSubtasks } from "@/slices/app-slice";
import { TaskBoardFields, TaskForm } from "@/components/app";
import { useToast } from "../ui/use-toast";

export const EditTaskDialog = () => {
  const showDialog = useAppSelector((state) => state.ui.showEditTaskForm);
  const { selectedTask, taskSubtasks } = useAppSelector(selectTaskWithSubtasks);

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const toggleDialog = () => {
    dispatch(toggleField({ name: "showTaskDetails" }));
    dispatch(toggleField({ name: "showEditTaskForm" }));
  };

  const handleOutsideClick = () => {
    toggleDialog();
  };

  const handleFormSubmit = (form: TaskBoardFields) => {
    dispatch(editTask({ ...form, id: selectedTask?.id || "" }));
    toggleDialog();
    toast({
      variant: "success",
      description: "The task has been updated successfully.",
    });
  };

  return (
    <Dialog open={showDialog} onOpenChange={handleOutsideClick}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          defaultValues={{
            ...(selectedTask || {
              title: "",
              description: "",
              statusId: "",
            }),
            subtasks: taskSubtasks,
          }}
          onFormSubmit={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
