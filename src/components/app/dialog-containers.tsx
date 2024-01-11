import {
  EditBoardFormDialog,
  MenuDialog,
  DeleteBoardDialog,
  DeleteTaskDialog,
  TaskDetailDialog,
  EditTaskDialog,
  NewTaskDialog,
} from "@/components/app";
import { NewBoardDialog } from "./new-board-dialog";

export const DialogContainers = () => {
  return (
    <>
      <EditBoardFormDialog />
      <NewBoardDialog />
      <MenuDialog />
      <DeleteBoardDialog />

      <EditTaskDialog />
      <NewTaskDialog />
      <TaskDetailDialog />
      <DeleteTaskDialog />
    </>
  );
};
