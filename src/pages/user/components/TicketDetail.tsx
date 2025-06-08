import { QrCode } from "lucide-react";
import { formatNumberToPrice } from "@/utils/formatToPrice";
import Separator from "@/core/components/ui/separator";
export const TicketDetail = () => {
  return (
    <div className="grid grid-rows-2 gap-4 lg:grid-cols-2 lg:grid-rows-none">
      <div className="row-span-1 lg:col-span-1">
        <p className="text-2xl font-bold">週杰倫演唱會</p>
        <p>
          地址: <span className="ml-4 font-bold">台北市松山區南京東路四段2號</span>
        </p>
        <p>
          日期: <span className="ml-4 font-bold">2025.03.28 (五) 20:00</span>
        </p>
        <div className="mt-2 flex items-center">
          <QrCode className="h-[60%] w-[60%]" />
        </div>
      </div>
      <div className="row-span-1 lg:col-span-1">
        <p>
          訂單編號<span className="ml-4 font-bold">A123456927</span>
        </p>
        <p>
          購票日期<span className="ml-4 font-bold">2025.03.27 20:00:00</span>
        </p>
        <p>
          支付方式<span className="ml-4 font-bold">信用卡</span>
        </p>
        <p>
          票券數量<span className="ml-4 font-bold">2</span>
        </p>
        <p>
          票券總價<span className="ml-4 font-bold">NT$ {formatNumberToPrice("zh-TW", 2000, 0)}</span>
        </p>
        <Separator className="my-4" />
        <p>
          場次／票券<span className="ml-4 font-bold">2025.03.27 20:00:00</span>
        </p>
        <p>
          購票人姓名<span className="ml-4 font-bold">王小明</span>
        </p>
        <p>
          電子信箱<span className="ml-4 font-bold">sample@email.com</span>
        </p>
        <p>
          行動電話<span className="ml-4 font-bold">0912-345678</span>
        </p>
      </div>
    </div>
  );
};
