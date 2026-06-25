import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ensureLogoutChannel } from "@/lib/logoutChannel";

export function AuthSyncProvider() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const email = useAuthStore((state) => state.email);

  useEffect(() => {
    const performLogout = () => {
      logout();
      navigate("/login", { replace: true });
    };

    let bcCleanup: () => void;

    console.log("[logout-sync] FRONT AuthSyncProvider mount, email =", email);

    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("tickeasy_auth");
      channel.onmessage = (event: MessageEvent) => {
        console.log("[logout-sync] FRONT BroadcastChannel onmessage:", event.data);
        if (event.data?.type === "LOGOUT") {
          performLogout();
        }
      };
      bcCleanup = () => channel.close();
    } else {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === "tickeasy_logout") {
          console.log("[logout-sync] FRONT storage event LOGOUT");
          performLogout();
        }
      };
      window.addEventListener("storage", handleStorage);
      bcCleanup = () => window.removeEventListener("storage", handleStorage);
    }

    if (!email) {
      console.warn("[logout-sync] FRONT email 缺失 → 不訂閱 Supabase channel");
      return bcCleanup;
    }

    // 接收端：建立/重用 singleton channel（與 sender 共用，避免同 topic 重複 channel）。
    ensureLogoutChannel(email, performLogout);

    // singleton channel 不在 unmount 時移除，避免 StrictMode 重訂閱關閉 WebSocket。
    return () => {
      bcCleanup();
    };
  }, [logout, navigate, email]);

  return null;
}
