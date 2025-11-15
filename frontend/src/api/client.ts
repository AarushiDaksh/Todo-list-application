import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://todo-list-application-backend0.onrender.com/api";

export const api = axios.create({
<<<<<<< HEAD
  baseURL: API_URL,
=======
  baseURL: import.meta.env.VITE_API_URL || "https://todo-list-application-backend0.onrender.com/api",
>>>>>>> cf7277573539faf8aedd052e17a5b831d21f34b1
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;

  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }

  if (token) {
    (config.headers as AxiosRequestHeaders)["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default api;
