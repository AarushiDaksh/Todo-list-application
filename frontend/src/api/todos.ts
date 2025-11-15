import client from "./client";

export const fetchTodos = async () => {
  const res = await client.get("/todos");          
  return res.data;
};

export const createTodoApi = async (data: { title: string; description: string }) => {
  const res = await client.post("/todos", data);   
  return res.data;
};

export const updateTodoApi = async (data: {
  id: string;
  title: string;
  description: string;
}) => {
  const { id, title, description } = data;
  const res = await client.put(`/todos/${id}`, { title, description });
  return res.data;
};

export const deleteTodoApi = async (id: string) => {
  const res = await client.delete(`/todos/${id}`);
  return res.data;
};

export const toggleTodoApi = async (id: string) => {
  const res = await client.patch(`/todos/${id}/toggle`);
  return res.data;
};
