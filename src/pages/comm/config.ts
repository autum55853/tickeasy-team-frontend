import { lazy } from "react";
export default {
  name: "共用頁面",
  views: [
    {
      path: "/login",
      component: lazy(() => import("./views/login")),
      meta: { title: "登入頁面" },
      needLogin: false,
    },
    {
      path: "/403",
      component: lazy(() => import("./views/403")),
      meta: { title: "403 無權限" },
      needLogin: false,
    },
    {
      path: "/404",
      component: lazy(() => import("./views/404")),
      meta: { title: "404 找不到頁面" },
      needLogin: false,
    },
  ],
};
