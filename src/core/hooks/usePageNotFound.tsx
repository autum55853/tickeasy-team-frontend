import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/pages";

export const usePageNotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 取得目前路徑
    const currentPath = location.pathname;

    // 檢查目前路徑是否在已定義的路由中
    const isValidPath = routes.some((route) => {
      // 檢查是否完全匹配或是動態路由
      const routePath = route.path;
      if (routePath === currentPath) return true;

      // 處理動態路由匹配 (例如: /user/:id)
      const routeRegex = new RegExp("^" + routePath.replace(/:[^\s/]+/g, "[^/]+") + "$");
      return routeRegex.test(currentPath);
    });

    // 如果路徑不存在且不是404頁面，則重新導向到404
    if (!isValidPath && currentPath !== "/404") {
      navigate("/404");
    }
  }, [location.pathname, navigate]);
};
