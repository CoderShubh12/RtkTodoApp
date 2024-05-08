import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../models/contact.model";

export const TodosApi = createApi({
  reducerPath: "TodosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3031/" }), // Local API base URL
  tagTypes: ["Todo"], // Define tag types for cache invalidation
  endpoints: (builder) => ({
    Todos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todo"], // Tag provided by the query
    }),

    addTodo: builder.mutation<Todo, { title: string; completed: boolean }>({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"], // Invalidate the cache after adding
    }),

    deleteTodo: builder.mutation<void, number>({
      query: (todoId) => ({
        url: `/todos/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"], // Invalidate the cache after deleting
    }),

    updateTodo: builder.mutation<Todo, { id: number; title: string }>({
      query: ({ id, title }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todo"], // Invalidate the cache after updating
    }),
  }),
});

export const {
  useTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = TodosApi;
