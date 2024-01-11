import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { TaskBoardFields, TaskForm } from "@/components/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { addTask } from "@/slices/app-slice";
import { useToast } from "../ui/use-toast";

export const NewTaskDialog = () => {
  const showDialog = useAppSelector((state) => state.ui.showNewTaskForm);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleFormSubmit = (form: TaskBoardFields) => {
    dispatch(addTask({ ...form, id: uuidv4() }));
    dispatch(toggleField({ name: "showNewTaskForm" }));
    toast({
      variant: "success",
      description: "The task has been created successfully.",
    });
  };

  return (
    <Dialog
      open={showDialog}
      onOpenChange={() => dispatch(toggleField({ name: "showNewTaskForm" }))}
    >
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <TaskForm
          defaultValues={{
            title: "",
            description: "",
            statusId: "",
            subtasks: [],
          }}
          onFormSubmit={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
