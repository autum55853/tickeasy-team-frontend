import { lazy } from "react";
export const homeConfig = {
  name: "首頁",
  views: [
    {
      path: "/",
      component: lazy(() => import("./views/page")),
      meta: { title: "首頁" },
      needLogin: false,
    },
  ],
};
