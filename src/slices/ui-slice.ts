import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UIState = {
  showEditBoardForm: boolean;
  showNewBoardForm: boolean;
  showDeleteBoardConfirmation: boolean;
  showNewTaskForm: boolean;
  showEditTaskForm: boolean;
  showTaskDetails: boolean;
  showDeleteTaskConfirmation: boolean;
  showMenu: boolean;

  theme: "light" | "dark";
};

type Dialog = {
  name: Exclude<keyof UIState, "theme">;
};

const initialState: UIState = {
  showEditBoardForm: false,
  showNewBoardForm: false,
  showDeleteBoardConfirmation: false,
  showNewTaskForm: false,
  showEditTaskForm: false,
  showTaskDetails: false,
  showDeleteTaskConfirmation: false,
  showMenu: false,
  theme: "dark",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleField: (state, action: PayloadAction<Dialog>) => {
      const field = action.payload.name;
      state[field] = !state[field];
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleField, toggleTheme } = uiSlice.actions;

export default uiSlice.reducer;
