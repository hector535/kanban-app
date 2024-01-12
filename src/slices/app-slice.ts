import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Column, Task, Subtask } from "@/types";

type AppState = {
  boards: Record<string, Board>;
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
  subtasks: Record<string, Subtask>;
  selectedBoardId: string;
  selectedTaskId: string;
};

type BoardPayload = Omit<Board, "columnIds"> & {
  columns: Omit<Column, "taskIds">[];
};

type TaskPayload = Omit<Task, "subtaskIds"> & {
  subtasks: Omit<Subtask, "isCompleted">[];
};

type DragPayload = {
  source: {
    columnId: string;
    index: number;
  };
  destination: {
    columnId: string;
    index: number;
  };
};

const initialState: AppState = {
  boards: {},
  columns: {},
  tasks: {},
  subtasks: {},
  selectedBoardId: "",
  selectedTaskId: "",
};

const appSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<BoardPayload>) => {
      const board = action.payload;

      state.boards[board.id] = {
        id: board.id,
        name: board.name,
        columnIds: board.columns.map((column) => column.id),
      };

      board.columns.forEach((column) => {
        state.columns[column.id] = { ...column, taskIds: [] };
      });
    },
    editBoard: (state, action: PayloadAction<BoardPayload>) => {
      const board = state.boards[action.payload.id];

      const newColumnIds = action.payload.columns.map((column) => column.id);
      const columnIdsToRemove = board.columnIds.filter(
        (id) => !newColumnIds.includes(id)
      );

      columnIdsToRemove.forEach((columnId) => {
        const column = state.columns[columnId];

        if (column.taskIds.length > 0) {
          column.taskIds.forEach((taskId) => {
            const task = state.tasks[taskId];

            if (task.subtaskIds.length > 0) {
              task.subtaskIds.forEach((subTaskId) => {
                delete state.subtasks[subTaskId];
              });
            }

            delete state.tasks[taskId];
          });
        }

        delete state.columns[columnId];
      });

      board.name = action.payload.name;
      board.columnIds = newColumnIds;

      action.payload.columns.forEach((column) => {
        if (state.columns[column.id]) {
          state.columns[column.id].name = column.name;
        } else {
          state.columns[column.id] = { ...column, taskIds: [] };
        }
      });
    },
    removeBoard: (state) => {
      const board = state.boards[state.selectedBoardId];

      if (board.columnIds.length > 0) {
        board.columnIds.forEach((columnId) => {
          const column = state.columns[columnId];

          if (column.taskIds.length > 0) {
            column.taskIds.forEach((taskId) => {
              const task = state.tasks[taskId];

              if (task.subtaskIds.length > 0) {
                task.subtaskIds.forEach((subTaskId) => {
                  delete state.subtasks[subTaskId];
                });
              }

              delete state.tasks[taskId];
            });
          }

          delete state.columns[columnId];
        });
      }

      delete state.boards[state.selectedBoardId];
      state.selectedBoardId = "";
    },
    addTask: (state, action: PayloadAction<TaskPayload>) => {
      const task = action.payload;

      state.tasks[task.id] = {
        id: task.id,
        title: task.title,
        description: task.description,
        statusId: task.statusId,
        subtaskIds: task.subtasks.map((subtask) => subtask.id),
      };

      task.subtasks.forEach((subtask) => {
        state.subtasks[subtask.id] = { ...subtask, isCompleted: false };
      });
    },
    editTask: (state, action: PayloadAction<TaskPayload>) => {
      const task = state.tasks[action.payload.id];
      const newSubtaskIds = action.payload.subtasks.map(
        (subtask) => subtask.id
      );

      const subtaskIdsToRemove = task.subtaskIds.filter(
        (subtaskId) => !newSubtaskIds.includes(subtaskId)
      );

      subtaskIdsToRemove.forEach((subtaskId) => {
        delete state.subtasks[subtaskId];
      });

      if (task.statusId !== action.payload.statusId) {
        const oldColumn = state.columns[task.statusId];
        const newColumn = state.columns[action.payload.statusId];

        oldColumn.taskIds = oldColumn.taskIds.filter(
          (taskId) => taskId !== task.id
        );
        newColumn.taskIds.push(task.id);
      }

      task.title = action.payload.title;
      task.description = action.payload.description;
      task.statusId = action.payload.statusId;
      task.subtaskIds = newSubtaskIds;

      action.payload.subtasks.forEach((subtask) => {
        if (state.subtasks[subtask.id]) {
          state.subtasks[subtask.id].title = subtask.title;
        } else {
          state.subtasks[subtask.id] = { ...subtask, isCompleted: false };
        }
      });
    },
    removeTask: (state) => {
      const task = state.tasks[state.selectedTaskId];

      if (task.subtaskIds.length > 0) {
        task.subtaskIds.forEach((subtaskId) => {
          delete state.subtasks[subtaskId];
        });
      }

      Object.keys(state.columns).forEach((key) => {
        const column = state.columns[key];

        if (column.taskIds.includes(task.id)) {
          column.taskIds = column.taskIds.filter(
            (taskId) => taskId !== task.id
          );
        }
      });

      delete state.tasks[task.id];

      state.selectedTaskId = "";
    },
    selectBoard: (state, action: PayloadAction<string>) => {
      state.selectedBoardId = action.payload;
    },
    selectTask: (state, action: PayloadAction<string>) => {
      state.selectedTaskId = action.payload;
    },
    toggleSubTask: (state, action: PayloadAction<string>) => {
      const subtask = state.subtasks[action.payload];
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      const task = state.tasks[state.selectedTaskId];

      task.statusId = columnId;

      Object.keys(state.columns).forEach((key) => {
        const column = state.columns[key];

        if (column.taskIds.includes(task.id)) {
          column.taskIds = column.taskIds.filter(
            (taskId) => taskId !== task.id
          );
        }
      });

      state.columns[columnId].taskIds.push(task.id);
    },
    dragTask: (state, action: PayloadAction<DragPayload>) => {
      const { source, destination } = action.payload;

      const sourceColumn = state.columns[source.columnId];
      const destinationColumn = state.columns[destination.columnId];

      const taskId = sourceColumn.taskIds.splice(source.index, 1).toString();

      destinationColumn.taskIds.splice(destination.index, 0, taskId);

      state.tasks[taskId].statusId = destination.columnId;
    },
  },
});

export const {
  addBoard,
  editBoard,
  removeBoard,
  addTask,
  editTask,
  removeTask,
  selectBoard,
  selectTask,
  toggleSubTask,
  setTaskStatus,
  dragTask,
} = appSlice.actions;

export default appSlice.reducer;
