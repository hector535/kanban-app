import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import uiReducer from "@/slices/ui-slice";
import appReducer from "@/slices/app-slice";
import data from "@/data/initial-data";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: () => true,
  effect: (_, listenerApi) => {
    localStorage.setItem("state", JSON.stringify(listenerApi.getState()));
  },
});

type GlobalState = {
  ui: ReturnType<typeof uiReducer>;
  app: ReturnType<typeof appReducer>;
};

const globalState: GlobalState =
  localStorage.getItem("state") != null
    ? JSON.parse(localStorage.getItem("state")!)
    : {
        app: {
          ...data,
          selectedBoardId: "",
        },
      };

export const store = configureStore({
  preloadedState: globalState,
  reducer: {
    ui: uiReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
