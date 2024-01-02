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
import { cn } from "@/lib/utils";

const subTasks = [
  {
    id: 1,
    name: "Research competitor pricing and business models",
    done: false,
  },
  {
    id: 2,
    name: "Outline a business model that works for our solution",
    done: true,
  },
  {
    id: 3,
    name: "Surveying and testing",
    done: false,
  },
];

export const TaskDetailDialog = () => {
  const labelStyles = "text-[0.75rem] font-bold text-gray dark:text-white";

  return (
    <Dialog open={false}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>
            Research pricing points of various competitors and trial different
            business models
          </DialogTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-4 h-5 w-1">
                <VerticalDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-b-lg text-gray focus:text-gray">
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem className="text-b-lg text-red focus:text-red">
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>

        {/* Content */}

        <p>
          We know what we're planning to build for version one. Now we need to
          finalise the first pricing model we'll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>

        {/* Checkbox container */}
        <div className="space-y-4">
          <p className={labelStyles}>Subtasks (2 of 3)</p>

          {/* List of checkbox */}
          <div className="space-y-2">
            {subTasks.map((subTask, index) => (
              <div
                key={subTask.id}
                className="flex items-center gap-4 p-3 rounded bg-gray-very-light dark:bg-gray-super-dark"
              >
                <Checkbox id={`task-${index + 1}`} name="task" />
                <label
                  htmlFor={`task-${index + 1}`}
                  className={cn(
                    "text-[0.75rem] leading-normal font-bold text-black dark:text-white",
                    { "line-through": subTask.done },
                    { "text-black/50": subTask.done },
                    { "dark:text-white/50": subTask.done }
                  )}
                >
                  {subTask.name}
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
            onValueChange={(val) => console.log(val)}
            defaultValue="doing"
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select a status for the task" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="doing">Doing</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};
