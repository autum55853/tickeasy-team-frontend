import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useContext } from "react";
import { ModalStatusContext } from "@/context/modalStatusContext";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { resetLoginData } = useContext(ModalStatusContext)!;

  const handleLogout = () => {
    logout();
    resetLoginData();

    // 廣播給其他前台 tabs（同源，第一方 context，有效）
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("tickeasy_auth");
      channel.postMessage({ type: "LOGOUT", timestamp: Date.now() });
      channel.close();
    }
    // StorageEvent fallback（舊版 Safari）
    localStorage.setItem("tickeasy_logout", Date.now().toString());
    setTimeout(() => localStorage.removeItem("tickeasy_logout"), 100);

    // 透過 Dashboard 登出端點清除 Dashboard 的 tickeasy_token cookie，再跳回 /login
    const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL ?? "";
    if (dashboardUrl) {
      const loginUrl = encodeURIComponent(`${window.location.origin}/login`);
      window.location.href = `${dashboardUrl}/api/auth/logout?next=${loginUrl}`;
    } else {
      navigate("/login");
    }
  };

  return { handleLogout };
};
