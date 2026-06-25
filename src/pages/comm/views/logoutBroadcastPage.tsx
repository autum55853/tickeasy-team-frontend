import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { sendLogout } from "@/lib/logoutChannel";

export default function LogoutBroadcastPage() {
  const logout = useAuthStore((state) => state.logout);
  const email = useAuthStore((state) => state.email);
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const broadcastThenLogout = async () => {
      // [logout-sync] SENDER 進入；email 決定是否走 Supabase 廣播
      console.log("[logout-sync] SENDER start, email =", email);
      // 1. Supabase Realtime 跨域廣播：重用 AuthSyncProvider 已訂閱的 singleton
      //    channel 送出，避免同 topic 重複 channel 導致 subscribe hang。
      if (email) {
        try {
          await sendLogout();
        } catch (err) {
          // best effort，忽略錯誤
          console.error("[logout-sync] SENDER Supabase 廣播 throw:", err);
        }
      }

      // 2. 廣播完成後清空本地認證狀態
      logout();

      if (typeof BroadcastChannel !== "undefined") {
        const channel = new BroadcastChannel("tickeasy_auth");
        channel.postMessage({ type: "LOGOUT", timestamp: Date.now() });
        console.log("[logout-sync] SENDER BroadcastChannel(tickeasy_auth) posted LOGOUT（同源路徑）");
        setTimeout(() => channel.close(), 100);
      } else {
        console.warn("[logout-sync] SENDER BroadcastChannel 不支援，走 storage fallback");
      }

      // StorageEvent fallback（舊版 Safari 不支援 BroadcastChannel）
      localStorage.setItem("tickeasy_logout", Date.now().toString());
      setTimeout(() => localStorage.removeItem("tickeasy_logout"), 100);

      // 向後相容：若仍被當作 iframe 使用，通知 parent
      if (window.parent !== window) {
        window.parent.postMessage({ type: "LOGOUT_BROADCAST_DONE" }, "*");
      }

      navigate("/login", { replace: true });
    };

    broadcastThenLogout();
  }, [logout, email, navigate]);

  return <div />;
}
