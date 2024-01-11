import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
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
import { useAppSelector } from "@/hooks";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Min length: 2 characters" })
    .max(100, { message: "Max length: 100 characters" }),
  description: z.string().max(255, { message: "Max length: 255 characters" }),
  subtasks: z
    .object({
      id: z.string().min(1),
      title: z
        .string()
        .min(2, { message: "Min length: 2 characters" })
        .max(100, { message: "Max length: 100 characters" }),
    })
    .array(),
  statusId: z.string().min(1, { message: "Select a status" }),
});

export type TaskBoardFields = z.infer<typeof formSchema>;

type TaskFormProps = {
  defaultValues: TaskBoardFields;
  onFormSubmit: (form: TaskBoardFields) => void;
};

export const TaskForm = (props: TaskFormProps) => {
  const { defaultValues, onFormSubmit } = props;

  const columns = useAppSelector((state) => {
    const board = state.app.boards[state.app.selectedBoardId];
    return board.columnIds.map((columnId) => state.app.columns[columnId]);
  });

  const form = useForm<TaskBoardFields>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const errors = form.formState.errors;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const handleAddNewSubtask = () => append({ id: uuidv4(), title: "" });

  const onSubmit = (taskForm: TaskBoardFields) => {
    onFormSubmit(taskForm);
  };

  return (
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
                name={`subtasks.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputRow
                        {...field}
                        placeholder="task name"
                        hasError={!!errors?.subtasks?.[index]}
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
          name="statusId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger hasError={!!errors?.statusId}>
                    <SelectValue placeholder="Select a status for the task" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" form="task-form" className="w-full">
          {defaultValues.title ? "Save Changes" : "Create Task"}
        </Button>
      </form>
    </Form>
  );
};
