import { lazy } from "react";
export default {
  name: "演唱會資訊",
  views: [
    {
      path: "/concerts",
      component: lazy(() => import("./views/allConcertsPage")),
      meta: { title: "演唱會搜尋" },
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
    {
      // path: "/concert/buyTicket/:id",
      path: "/concert/buyTicket/test",
      component: lazy(() => import("./views/buyTickerPage")),
      meta: { title: "購買演唱會票券" },
      needLogin: true,
    },
    {
      path: "/concert/paymentResult",
      component: lazy(() => import("./views/paymentResultPage")),
      meta: { title: "購買演唱會票券結果" },
      needLogin: true,
    },
  ],
};
