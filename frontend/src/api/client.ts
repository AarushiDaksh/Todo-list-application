import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://todo-list-application-backend0.onrender.com/api",
});

// Attach JWT token to every request if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;

  if (token) {
    
    const headers = config.headers as any;
    headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
