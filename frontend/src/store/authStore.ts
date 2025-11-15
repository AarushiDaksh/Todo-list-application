import { create } from "zustand";
import type { User } from "../types/auth";


interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

const STORAGE_KEY = "todo-auth";

const getInitialState = (): Pick<AuthState, "user" | "token"> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    return JSON.parse(raw);
  } catch {
    return { user: null, token: null };
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  setAuth: (user, token) => {
    const data = { user, token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    set(data);
  },
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, token: null });
  },
}));
