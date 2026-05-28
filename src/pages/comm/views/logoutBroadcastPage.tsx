import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase";

export default function LogoutBroadcastPage() {
  const logout = useAuthStore((state) => state.logout);
  const email = useAuthStore((state) => state.email);
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const broadcastThenLogout = async () => {
      // 1. Supabase Realtime 跨域廣播（先廣播，email 尚未被 logout() 清空）
      if (email) {
        try {
          await new Promise<void>((resolve) => {
            const ch = supabase.channel(`tickeasy-session-${email}`);
            const fallback = setTimeout(() => {
              supabase.removeChannel(ch);
              resolve();
            }, 2000);
            ch.subscribe(async (status) => {
              if (status === "SUBSCRIBED") {
                clearTimeout(fallback);
                try {
                  await ch.send({
                    type: "broadcast",
                    event: "LOGOUT",
                    payload: { timestamp: Date.now() },
                  });
                } finally {
                  supabase.removeChannel(ch);
                  resolve();
                }
              } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                clearTimeout(fallback);
                supabase.removeChannel(ch);
                resolve();
              }
            });
          });
        } catch {
          // best effort，忽略錯誤
        }
      }

      // 2. 廣播完成後清空本地認證狀態
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
    };

    broadcastThenLogout();
  }, [logout, email, navigate]);

  return <div />;
}
