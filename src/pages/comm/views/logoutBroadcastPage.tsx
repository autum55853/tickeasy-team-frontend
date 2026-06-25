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
      // [logout-sync] SENDER 進入；email 決定是否走 Supabase 廣播
      console.log("[logout-sync] SENDER start, email =", email);
      // 1. Supabase Realtime 跨域廣播（先廣播，email 尚未被 logout() 清空）
      if (email) {
        try {
          await new Promise<void>((resolve) => {
            const ch = supabase.channel(`tickeasy-session-${email}`);
            console.log("[logout-sync] SENDER channel created:", `tickeasy-session-${email}`);
            const fallback = setTimeout(() => {
              console.warn("[logout-sync] SENDER 2s fallback timeout（subscribe 未完成）");
              supabase.removeChannel(ch);
              resolve();
            }, 2000);
            ch.subscribe(async (status) => {
              console.log("[logout-sync] SENDER subscribe status =", status);
              if (status === "SUBSCRIBED") {
                clearTimeout(fallback);
                try {
                  const sendRes = await ch.send({
                    type: "broadcast",
                    event: "LOGOUT",
                    payload: { timestamp: Date.now() },
                  });
                  console.log("[logout-sync] SENDER ch.send 結果 =", sendRes);
                } finally {
                  supabase.removeChannel(ch);
                  resolve();
                }
              } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                console.error("[logout-sync] SENDER subscribe 失敗 =", status);
                clearTimeout(fallback);
                supabase.removeChannel(ch);
                resolve();
              }
            });
          });
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
