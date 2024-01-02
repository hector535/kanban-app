import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { InputRow } from "@/components/app";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Min length: 2 characters" })
    .max(50, { message: "Max length: 50 characters" }),
  description: z.string().max(255, { message: "Max length: 255 characters" }),
  subTasks: z
    .object({
      name: z
        .string()
        .min(2, { message: "Min length: 2 characters" })
        .max(50, { message: "Max length: 50 characters" }),
    })
    .array(),
  status: z.string().min(1, { message: "Select a status" }),
});

type TaskBoardFields = z.infer<typeof formSchema>;

type TaskFormDialogProps = {
  defaultValues?: TaskBoardFields;
};

export const TaskFormDialog = (props: TaskFormDialogProps) => {
  const { defaultValues } = props;

  const form = useForm<TaskBoardFields>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      status: "",
      subTasks: [],
    },
  });

  const errors = form.formState.errors;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subTasks",
  });

  const handleAddNewSubtask = () => append({ name: "" });

  const onSubmit = (taskForm: TaskBoardFields) => {
    const isEditMode = !!defaultValues;

    console.log({ taskForm, isEditMode });
  };

  return (
    <Dialog open={false}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="task-form"
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      hasError={!!errors?.title}
                      placeholder="e.g. Take coffee break"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. This 15 minute break will  recharge the batteries a little."
                      className="resize-none"
                      hasError={!!errors?.description}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <FormLabel>Subtasks</FormLabel>

              <div className="grid gap-3">
                {fields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`subTasks.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputRow
                            {...field}
                            placeholder="task name"
                            hasError={!!errors?.subTasks?.[index]}
                            onRemove={() => remove(index)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddNewSubtask}
                >
                  + Add New Subtask
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger hasError={!!errors?.status}>
                        <SelectValue placeholder="Select a status for the task" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="doing">Doing</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" form="task-form" className="w-full">
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
