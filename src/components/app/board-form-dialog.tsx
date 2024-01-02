import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
} from "@/components/ui";
import { useAppSelector } from "@/hooks";
import { InputRow } from "@/components/app";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Min length: 2 characters" })
    .max(50, { message: "Max length: 50 characters" }),
  columns: z
    .object({
      name: z
        .string()
        .min(2, { message: "Min length: 2 characters" })
        .max(50, { message: "Max length: 50 characters" }),
    })
    .array(),
});

type BoardFields = z.infer<typeof formSchema>;

type BoardFormDialogProps = {
  defaultValues?: BoardFields;
};

export const BoardFormDialog = (props: BoardFormDialogProps) => {
  const { showBoardForm } = useAppSelector((state) => state.ui.dialogs);
  const { defaultValues } = props;

  const form = useForm<BoardFields>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      columns: [],
    },
  });

  const errors = form.formState.errors;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const onSubmit = (boardForm: BoardFields) => {
    const isEditMode = !!defaultValues;

    console.log({ boardForm, isEditMode });
  };

  const handleAddNewColumn = () => append({ name: "" });

  return (
    <Dialog open={showBoardForm}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="board-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board Name</FormLabel>
                  <FormControl>
                    <Input
                      hasError={!!errors?.name}
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <FormLabel>Board Columns</FormLabel>

              <div className="grid gap-3">
                {fields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`columns.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputRow
                            {...field}
                            placeholder="column name"
                            hasError={!!errors?.columns?.[index]?.name}
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
                  onClick={handleAddNewColumn}
                >
                  + Add New Column
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="board-form" className="w-full">
            Create New Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
