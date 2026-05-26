import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export function AuthSyncProvider() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const performLogout = () => {
      if (window.location.pathname === "/login") return;
      logout();
      navigate("/login", { replace: true });
    };

    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("tickeasy_auth");
      channel.onmessage = (event: MessageEvent) => {
        if (event.data?.type === "LOGOUT") {
          performLogout();
        }
      };
      return () => channel.close();
    } else {
      // StorageEvent fallback（舊版 Safari）
      const handleStorage = (event: StorageEvent) => {
        if (event.key === "tickeasy_logout") {
          performLogout();
        }
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, [logout, navigate]);

  return null;
}
