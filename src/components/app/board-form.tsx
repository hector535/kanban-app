import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { InputRow } from "@/components/app";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Min length: 2 characters" })
    .max(50, { message: "Max length: 50 characters" }),
  columns: z
    .object({
      id: z.string().min(1),
      name: z
        .string()
        .min(2, { message: "Min length: 2 characters" })
        .max(50, { message: "Max length: 50 characters" }),
    })
    .array(),
});

export type BoardFields = z.infer<typeof formSchema>;

type BoardFormProps = {
  defaultValues: BoardFields;
  onFormSubmit: (form: BoardFields) => void;
};

export const BoardForm = (props: BoardFormProps) => {
  const { defaultValues, onFormSubmit } = props;

  const form = useForm<BoardFields>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const errors = form.formState.errors;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const onSubmit = (formValues: BoardFields) => {
    onFormSubmit(formValues);
  };

  const handleAddNewColumn = () => append({ id: uuidv4(), name: "" });

  return (
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

        <Button type="submit" form="board-form" className="w-full">
          {defaultValues.name ? "Save Changes" : "Create New Board"}
        </Button>
      </form>
    </Form>
  );
};
