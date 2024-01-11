import { v4 as uuidv4 } from "uuid";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleField } from "@/slices/ui-slice";
import { addBoard } from "@/slices/app-slice";
import { BoardFields, BoardForm } from "@/components/app";
import { useToast } from "../ui/use-toast";

export const NewBoardDialog = () => {
  const showDialog = useAppSelector((state) => state.ui.showNewBoardForm);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleCloseDialog = () => {
    dispatch(toggleField({ name: "showNewBoardForm" }));
  };

  const handleFormSubmit = (form: BoardFields) => {
    dispatch(addBoard({ ...form, id: uuidv4() }));
    dispatch(toggleField({ name: "showNewBoardForm" }));
    toast({
      variant: "success",
      description: "The board has been created successfully.",
    });
  };

  return (
    <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>

        <BoardForm
          defaultValues={{ name: "", columns: [] }}
          onFormSubmit={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
