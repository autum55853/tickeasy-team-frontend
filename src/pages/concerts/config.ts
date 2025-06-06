import { lazy } from "react";
export default {
  name: "演唱會資訊",
  views: [
    {
      path: "/concerts",
      component: lazy(() => import("./views/allConcertsPage")),
      meta: { title: "演唱會收尋" },
      needLogin: false,
    },
    {
      path: "/concerts/:concertId",
      component: lazy(() => import("./views/singleConcertPage")),
      meta: { title: "演唱會詳細資訊" },
      needLogin: false,
    },
    {
      path: "/concert/create/info",
      component: lazy(() => import("./views/createConInfoPage")),
      meta: { title: "建立演唱會-基本資料" },
      needLogin: false,
    },
    {
      path: "/concert/create/sessions-and-tickets",
      component: lazy(() => import("./views/createConSessionsAndTicketsPage")),
      meta: { title: "建立演唱會-設定場次及票種" },
      needLogin: false,
    },
  ],
};
