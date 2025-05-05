import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/core/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
export default function GoogleAuthCallbackPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);
  const handledRef = useRef(false);
  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;
    // 從 URL 中獲取授權碼
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");

    if (error) {
      console.error("OAuth error:", error);
      toast({
        variant: "destructive",
        title: "發生錯誤",
        description: "請重新嘗試登入",
      });
      navigate("/login");
      return;
    }

    if (token) {
      setAuth(token, "");
      // 重定向到首頁或其他適當的頁面
      toast({
        title: "登入成功",
        description: "導向首頁",
      });
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "沒有取得權限",
        description: "請重新嘗試登入",
      });
    }
  }, [navigate, setAuth, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-xl font-semibold">正在處理登入...</h2>
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}
