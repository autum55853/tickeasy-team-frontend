import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string;
  email: string;
  setAuth: (token: string, email: string) => void;
  logout: () => void;
  reset: () => void; // 新增 reset 方法
}

const initialState = {
  token: "",
  email: "",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (token, email) => set({ token, email }),
      logout: () => set({ token: "", email: "" }),
      reset: () => set({ ...initialState }), // 一鍵清空
    }),
    {
      name: "auth-storage",
    }
  )
);
