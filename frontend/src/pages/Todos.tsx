import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  createTodoApi,
  deleteTodoApi,
  toggleTodoApi,
  updateTodoApi,
} from "../api/todos";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import "../index.css";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof schema>;

const Todos = () => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const createMutation = useMutation({
    mutationFn: createTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      reset();
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const onSubmit = (values: FormValues) => {
    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        title: values.title,
        description: values.description,
      });
    } else {
      createMutation.mutate({
        title: values.title,
        description: values.description,
      });
    }
  };

  const startEdit = (todo: any) => {
    setEditingId(todo._id);
    reset({
      title: todo.title,
      description: todo.description || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset({
      title: "",
      description: "",
    });
  };

  return (
    <section id="todos">
      <div className="todos-page">
        <div className="todos-card">
          <header className="todos-header">
            <div>
              <h1 className="todos-title">Todo Dashboard</h1>
              <p className="todos-subtitle">
                Adding, updating, listing and deleting your todos in one place ✨
              </p>
            </div>
            <button className="todos-logout" onClick={clearAuth}>
              Logout
            </button>
          </header>

          <div className="todos-crud-badges">
            <span className="todos-badge">Adding a Todo</span>
            <span className={`todos-badge ${editingId ? "todos-badge-active" : ""}`}>
              Updating a Todo
            </span>
            <span className="todos-badge">Listing Todos</span>
            <span className="todos-badge">Deleting a Todo</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="todos-form todos-form-column">
            <input
              className="todos-input"
              placeholder="Todo title"
              {...register("title")}
            />
            {errors.title && (
              <span className="todos-error">{errors.title.message}</span>
            )}

            <textarea
              className="todos-textarea"
              placeholder="Todo description"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <span className="todos-error">{errors.description.message}</span>
            )}

            <div className="todos-form-actions">
              <button
                type="submit"
                className="todos-add-btn"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingId
                  ? updateMutation.isPending
                    ? "Updating..."
                    : "Update Todo"
                  : createMutation.isPending
                  ? "Adding..."
                  : "Add Todo"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="todos-cancel-btn"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="todos-list-wrapper">
            {isLoading ? (
              <p className="todos-empty">Loading your tasks...</p>
            ) : !todos || todos.length === 0 ? (
              <p className="todos-empty">No todos yet. Start by adding one! 🌱</p>
            ) : (
              <ul className="todos-list">
                {todos.map((todo: any) => (
                  <li
                    key={todo._id}
                    className={`todos-item ${
                      todo.completed ? "todos-item-completed" : ""
                    }`}
                  >
                    <div
                      className="todos-item-main"
                      onClick={() => toggleMutation.mutate(todo._id)}
                    >
                      <h3 className="todos-item-title">{todo.title}</h3>
                      {todo.description && (
                        <p className="todos-item-desc">{todo.description}</p>
                      )}
                    </div>
                    <div className="todos-item-actions">
                      <button
                        type="button"
                        className="todos-edit-btn"
                        onClick={() => startEdit(todo)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="todos-delete-btn"
                        onClick={() => deleteMutation.mutate(todo._id)}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Todos;
