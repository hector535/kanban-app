import {
  BoardFormDialog,
  DeleteBoardDialog,
  DeleteTaskDialog,
  TaskDetailDialog,
  TaskFormDialog,
} from "@/components/app";

export const DialogContainers = () => {
  return (
    <>
      <DeleteBoardDialog />
      <DeleteTaskDialog />

      <BoardFormDialog
      // defaultValues={{
      //   name: "Mi plataforma",
      //   columns: [{ name: "Plataforma #1" }, { name: "Plataforma #2" }],
      // }}
      />

      <TaskFormDialog
      // defaultValues={{
      //   title: "Mi primera tarea",
      //   description: "Esto es una descripcion",
      //   subTasks: [
      //     {
      //       name: "Subtarea #1",
      //     },
      //     {
      //       name: "Subtarea #2",
      //     },
      //     {
      //       name: "Subtarea #3",
      //     },
      //   ],
      //   status: "done",
      // }}
      />

      <TaskDetailDialog />
    </>
  );
};
