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
      // path: "/concerts/:id",
      path: "/concert/test",
      component: lazy(() => import("./views/singleConcertPage")),
      meta: { title: "演唱會詳細資訊" },
      needLogin: false,
    },
  ],
};
