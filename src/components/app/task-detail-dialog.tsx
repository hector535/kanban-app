import { VerticalDots } from "@/components/icons";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  selectBoardWithColumns,
  selectTask,
  selectTaskWithSubtasks,
  setTaskStatus,
  toggleSubTask,
} from "@/slices/app-slice";
import { toggleField } from "@/slices/ui-slice";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";

export const TaskDetailDialog = () => {
  const showDialog = useAppSelector((state) => state.ui.showTaskDetails);
  const { boardColumns } = useAppSelector(selectBoardWithColumns);
  const { selectedTask, taskSubtasks } = useAppSelector(selectTaskWithSubtasks);

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const completedSubTasks = taskSubtasks.filter(
    (subTask) => subTask.isCompleted
  );

  const labelStyles = "text-[0.75rem] font-bold text-gray dark:text-white";

  const sendFeedback = () => {
    toast({
      variant: "success",
      description: "The task has been updated successfully.",
    });
  };

  const handleCheckedChange = (subtaskId: string) => {
    dispatch(toggleSubTask(subtaskId));
    sendFeedback();
  };

  const handleStatusChange = (status: string) => {
    dispatch(setTaskStatus(status));
    sendFeedback();
  };

  const handleTaskEdit = () => {
    dispatch(toggleField({ name: "showTaskDetails" }));
    dispatch(toggleField({ name: "showEditTaskForm" }));
  };

  const handleTaskDelete = () => {
    dispatch(toggleField({ name: "showTaskDetails" }));
    dispatch(toggleField({ name: "showDeleteTaskConfirmation" }));
  };

  const handleOutsideClick = () => {
    dispatch(selectTask(""));
    dispatch(toggleField({ name: "showTaskDetails" }));
  };

  return (
    <Dialog open={showDialog} onOpenChange={handleOutsideClick}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>{selectedTask?.title}</DialogTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-7 w-7 rounded-sm hover:bg-slate-200"
              >
                <VerticalDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="text-b-lg text-gray focus:text-gray"
                onClick={handleTaskEdit}
              >
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-b-lg text-red focus:text-red"
                onClick={handleTaskDelete}
              >
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>

        {/* Content */}

        <p>
          {selectedTask?.description ||
            "This task doesn't have a description..."}
        </p>

        {/* Checkbox container */}
        <div className="space-y-4">
          <p className={labelStyles}>
            Subtasks ({completedSubTasks.length} of {taskSubtasks.length})
          </p>

          {/* List of checkbox */}
          <div className="space-y-2">
            {taskSubtasks.map((subTask, index) => (
              <div
                key={subTask.id}
                className="flex items-center gap-4 p-3 rounded bg-gray-very-light dark:bg-gray-super-dark"
              >
                <Checkbox
                  id={`task-${index + 1}`}
                  name="task"
                  checked={subTask.isCompleted}
                  onCheckedChange={() => handleCheckedChange(subTask.id)}
                />
                <label
                  htmlFor={`task-${index + 1}`}
                  className={cn(
                    "text-[0.75rem] leading-normal font-bold text-black dark:text-white",
                    subTask.isCompleted &&
                      "line-through text-black/50 dark:text-white/50"
                  )}
                >
                  {subTask.title}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelStyles} htmlFor="status">
            Current Status
          </label>
          <Select
            onValueChange={handleStatusChange}
            value={selectedTask?.statusId}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select a status for the task" />
            </SelectTrigger>
            <SelectContent>
              {boardColumns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};
