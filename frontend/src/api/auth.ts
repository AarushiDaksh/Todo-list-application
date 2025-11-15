import { api } from "./client";
import type { User } from "../types/auth";


interface AuthResponse {
  token: string;
  user: User;
}

export async function signup(data: { email: string; password: string }): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string }): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
}

export async function forgotPasswordApi(data: { email: string }) {
  const res = await api.post<{ message: string; token?: string }>("/auth/forgot-password", data);
  return res.data;
}

export async function resetPasswordApi(data: { token: string; password: string }) {
  const res = await api.post<{ message: string }>("/auth/reset-password", data);
  return res.data;
}
