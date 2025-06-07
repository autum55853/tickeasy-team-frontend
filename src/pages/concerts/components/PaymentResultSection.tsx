import { Button } from "@/core/components/ui/button";

import { CircleCheck, MapPin, CalendarDays } from "lucide-react";
import Separator from "@/core/components/ui/separator";
import { GoogleMap } from "@/core/components/global/googleMap";
import { useNavigate } from "react-router-dom";
export default function PaymentResultSection() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col items-center gap-2 px-4 lg:gap-8 lg:px-12">
      <div className="mx-auto w-full lg:w-[70%]">
        <div className="my-10 flex items-center justify-center">
          <CircleCheck className="mr-2 h-8 w-8 text-green-500" />
          <h2 className="text-center font-semibold">交易成功</h2>
        </div>
        <div className="my-4 flex flex-col gap-2">
          <p>訂單編號：A123456927</p>
          <p>會員編號：1234567890</p>
          <p>支付方式：信用卡</p>
          <p>購票時間：2025-06-01 12:00:00</p>
          <Separator />
          <p className="text-xl font-semibold">週杰倫演唱會</p>
          <div className="flex items-center justify-baseline">
            <MapPin className="mr-2 h-4 w-4" />
            台北市松山區南京東路四段2號
          </div>
          <div className="flex items-center justify-baseline">
            <CalendarDays className="mr-2 h-4 w-4" />
            2025.03.28 (五) 20:00
          </div>
        </div>
        <div className="mx-auto my-6 h-[400px] w-full lg:w-[70%]">
          <GoogleMap address="台北市松山區南京東路四段2號" />
        </div>
        <div className="mx-auto flex w-full justify-between gap-4 lg:w-[70%]">
          <Button variant="outline" className="lg:w-1/3 lg:text-lg" onClick={() => navigate("/concerts")}>
            查看其他活動
          </Button>
          <Button variant="outline" className="lgw-1/3 lg:text-lg" onClick={() => navigate("/user/history")}>
            查看購買紀錄
          </Button>
        </div>
      </div>
    </div>
  );
}
