import { configureStore } from "@reduxjs/toolkit";
import { TodosApi } from "../services/TodosApi";

export const store = configureStore({
  reducer: {
    [TodosApi.reducerPath]: TodosApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TodosApi.middleware),
});
