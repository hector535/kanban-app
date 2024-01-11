import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { editTask } from "@/slices/app-slice";
import { TaskBoardFields, TaskForm } from "@/components/app";
import { useToast } from "../ui/use-toast";
import { shallowEqual } from "react-redux";

export const EditTaskDialog = () => {
  const showDialog = useAppSelector((state) => state.ui.showEditTaskForm);
  const { task, subtasks } = useAppSelector((state) => {
    const task = state.app.tasks[state.app.selectedTaskId] || {
      subtaskIds: [],
    };
    const subtasks = task.subtaskIds.map(
      (subtaskId) => state.app.subtasks[subtaskId]
    );

    return { task, subtasks };
  }, shallowEqual);

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
    dispatch(editTask({ ...form, id: task?.id || "" }));
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
            ...(task || {
              title: "",
              description: "",
              statusId: "",
            }),
            subtasks,
          }}
          onFormSubmit={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
