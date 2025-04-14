import { homeConfig } from "@/pages/home/config";
import { commConfig } from "@/pages/comm/config";

export const routers = [...homeConfig.views, ...commConfig.views];
