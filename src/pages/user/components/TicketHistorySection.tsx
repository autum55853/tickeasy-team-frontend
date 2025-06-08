import { useState } from "react";
import TicketCard from "./TicketCard";
import { Button } from "@/core/components/ui/button";
import EticketCard from "./EticketCard";
const mockData = [
  {
    concertId: "fabcc0c9-445c-4834-8e8f-97faaf5336b2",
    concertName: "夏日音浪祭",
    concertIntroduction: "結合音樂、美食與戶外市集，邀請人氣樂團與獨立音樂人，一起共度夏日熱情夜晚！",
    orderNumber: "WE12345678890",
    conStartTime: "2025-08-01 12:00:00",
    totalPrice: 1000,
    concertLocation: "台北市松山區南京東路四段2號",
    ticketQty: 1,
    status: "ongoing",
  },
  {
    concertId: "fddee0c9-445c-4834-8e8f-50faaf5336c2",
    concertName: "Rock Legends 搖滾之夜",
    concertIntroduction: "集結經典搖滾傳奇與新生代樂團，燃爆全場，感受最純粹的音樂力量！",
    orderNumber: "WE12358758800",
    conStartTime: "2025/07/15 18:00",
    totalPrice: 3000,
    concertLocation: "台北市信義區忠孝東路四段515號",
    ticketQty: 1,
    status: "ongoing",
  },
  {
    concertId: "fddee0c9-445c-4834-8e8f-50faaf5336c2",
    concertName: "Rock Legends 搖滾之夜",
    concertIntroduction: "集結經典搖滾傳奇與新生代樂團，燃爆全場，感受最純粹的音樂力量！",
    orderNumber: "WE12358758800",
    conStartTime: "2025/03/15 18:00",
    totalPrice: 2000,
    concertLocation: "台北市信義區忠孝南路四段517號",
    ticketQty: 1,
    status: "finished",
  },
  {
    concertId: "fddee0c9-445c-4834-8e8f-50faaf5336c2",
    concertName: "秋日音浪祭",
    concertIntroduction: "集結經典搖滾傳奇與新生代樂團，燃爆全場，感受最純粹的音樂力量！",
    orderNumber: "WE12358758800",
    conStartTime: "2025/05/15 18:00",
    totalPrice: 6000,
    concertLocation: "台北市松山區忠孝東路一段518號",
    ticketQty: 1,
    status: "refunded",
  },
];
export default function TicketHistorySection() {
  const [pageStep, setPageStep] = useState<"allTicket" | "eTicket">("allTicket");
  return (
    <div className="mx-auto my-6 w-[90%]">
      <div>
        <p className="text-2xl font-bold">參與演唱會</p>
        <div>
          {mockData
            .filter((item) => item.status === "ongoing")
            .map((item) =>
              pageStep === "allTicket" ? (
                <TicketCard key={item.concertId} ticketData={item} setPageStep={setPageStep} />
              ) : (
                <EticketCard key={item.concertId} ticketData={item} />
              )
            )}
        </div>
      </div>
      {pageStep === "allTicket" && (
        <>
          <div>
            <p className="text-2xl font-bold">已結束</p>
            <div>
              {mockData
                .filter((item) => item.status === "finished")
                .map((item) => (
                  <TicketCard key={item.concertId} ticketData={item} setPageStep={setPageStep} />
                ))}
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">退票</p>
            <div>
              {mockData
                .filter((item) => item.status === "refunded")
                .map((item) => (
                  <TicketCard key={item.concertId} ticketData={item} />
                ))}
            </div>
          </div>
        </>
      )}
      {pageStep === "eTicket" && (
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mx-auto w-[70%]" onClick={() => setPageStep("allTicket")}>
            查看所有購票紀錄
          </Button>
        </div>
      )}
    </div>
  );
}
