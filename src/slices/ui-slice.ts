import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UIState = {
  dialogs: {
    showBoardDeletion: boolean;
    showTaskDeletion: boolean;
    showTaskDetails: boolean;
    showTaskForm: boolean;
    showBoardForm: boolean;
  };
};

type DialogVisibility = {
  name: keyof UIState["dialogs"];
  visibility: boolean;
};

const initialState: UIState = {
  dialogs: {
    showBoardDeletion: false,
    showTaskDeletion: false,
    showTaskDetails: false,
    showTaskForm: false,
    showBoardForm: false,
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDialogVisibility: (state, action: PayloadAction<DialogVisibility>) => {
      const { name, visibility } = action.payload;

      state.dialogs[name] = visibility;
    },
  },
});

export const { setDialogVisibility } = uiSlice.actions;

export default uiSlice.reducer;
