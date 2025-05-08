import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string;
  email: string;
  isLogin: boolean;
  setAuth: (token: string, email: string) => void;
  logout: () => void;
}

const initialState = {
  token: "",
  email: "",
  isLogin: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (token, email) => set({ token, email, isLogin: true }),
      logout: () => {
        set({ token: "", email: "", isLogin: false });
        // 清除 localStorage 中的 auth-storage
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
