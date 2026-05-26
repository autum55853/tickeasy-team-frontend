import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";

export default function LogoutBroadcastPage() {
  const logout = useAuthStore((state) => state.logout);
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

    // 通知後台 iframe parent 廣播已完成，讓它繼續清除並跳轉
    if (window.parent !== window) {
      window.parent.postMessage({ type: "LOGOUT_BROADCAST_DONE" }, "*");
    }
  }, [logout]);

  return <div />;
}
