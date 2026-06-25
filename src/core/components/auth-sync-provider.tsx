import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase";

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

    console.log("[logout-sync] FRONT subscribe Supabase channel:", `tickeasy-session-${email}`);
    const ch = supabase.channel(`tickeasy-session-${email}`);
    ch.on("broadcast", { event: "LOGOUT" }, () => {
      console.log("[logout-sync] FRONT 收到 Supabase LOGOUT broadcast");
      performLogout();
    });
    ch.subscribe((status) => {
      console.log("[logout-sync] FRONT receiver subscribe status =", status);
    });

    return () => {
      bcCleanup();
      supabase.removeChannel(ch);
    };
  }, [logout, navigate, email]);

  return null;
}
