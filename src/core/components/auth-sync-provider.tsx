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

    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("tickeasy_auth");
      channel.onmessage = (event: MessageEvent) => {
        if (event.data?.type === "LOGOUT") {
          performLogout();
        }
      };
      bcCleanup = () => channel.close();
    } else {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === "tickeasy_logout") {
          performLogout();
        }
      };
      window.addEventListener("storage", handleStorage);
      bcCleanup = () => window.removeEventListener("storage", handleStorage);
    }

    if (!email) return bcCleanup;

    const ch = supabase.channel(`tickeasy-session-${email}`);
    ch.on("presence", { event: "join" }, ({ newPresences }: { newPresences: Array<Record<string, unknown>> }) => {
      if (newPresences.some((p) => p.event === "LOGOUT")) {
        performLogout();
      }
    });
    ch.subscribe();

    return () => {
      bcCleanup();
      supabase.removeChannel(ch);
    };
  }, [logout, navigate, email]);

  return null;
}
