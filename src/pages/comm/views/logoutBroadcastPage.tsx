import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function LogoutBroadcastPage() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    logout();

    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("tickeasy_auth");
      channel.postMessage({ type: "LOGOUT", timestamp: Date.now() });
      setTimeout(() => channel.close(), 100);
    }

    // StorageEvent fallback（舊版 Safari 不支援 BroadcastChannel）
    localStorage.setItem("tickeasy_logout", Date.now().toString());
    setTimeout(() => localStorage.removeItem("tickeasy_logout"), 100);

    // 向後相容：若仍被當作 iframe 使用，通知 parent
    if (window.parent !== window) {
      window.parent.postMessage({ type: "LOGOUT_BROADCAST_DONE" }, "*");
    }

    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return <div />;
}
