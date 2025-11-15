import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://todo-list-application-backend0.onrender.com/api";

export const api = axios.create({
  baseURL: API_URL,
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
