import React, { useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useTodosQuery,
} from "../services/TodosApi"; // Import necessary hooks
import { Todo } from "../models/contact.model";

const TodoForm: React.FC = () => {
  const [inputValue, setInputValue] = useState(""); // State for input
  const [editTodo, setEditTodo] = useState<Todo | null>(null); // State for editing
  const [addTodo] = useAddTodoMutation(); // Hook for adding to-dos
  const [deleteTodo] = useDeleteTodoMutation(); // Hook for deleting to-dos
  const [updateTodo] = useUpdateTodoMutation(); // Hook for updating to-dos

  // Fetch all to-dos
  const { data: todos, isLoading, error } = useTodosQuery();

  // Handler for adding/editing a to-do
  const handleAddTodo = async () => {
    if (inputValue.trim() === "") {
      alert("Please enter a valid to-do title");
      return;
    }

    if (editTodo) {
      // If editing, update the existing to-do
      await updateTodo({
        id: editTodo.id,
        title: inputValue,
      });
      setEditTodo(null); // Clear edit state
    } else {
      // Otherwise, add a new to-do
      await addTodo({ title: inputValue, completed: false });
    }
    setInputValue(""); // Clear input field
  };

  // Handler for deleting a to-do
  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
    } catch (e) {
      console.error("Failed to delete to-do:", e);
    }
  };

  // Handler for editing a to-do
  const handleEditTodo = (todo: Todo) => {
    setInputValue(todo.title); // Populate the input field with the to-do's title
    setEditTodo(todo); // Set the edit state
  };

  return (
    <div style={{ padding: "1rem" }}>
      {" "}
      {/* Add padding for spacing */}
      <div className="inputfield" style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Enter New To-Do or Edit Existing"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleAddTodo}
        >
          Add/Edit To-Do
        </button>
      </div>
      {/* Display loading and error messages */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading to-dos</p>}
      {todos && (
        <ul
          className="todoitem"
          style={{
            listStyle: "none",
            padding: "0",
            marginTop: "1rem",
          }}
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 1rem",
                borderBottom: "1px solid #ddd",
              }}
            >
              {todo.title}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => handleEditTodo(todo)}
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "#2196F3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoForm;
