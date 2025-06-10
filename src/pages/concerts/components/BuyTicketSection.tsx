import { useEffect, useState } from "react";
import BeforeBuyTicket from "./BeforeBuyTicket";
import { BuyTicketDemoData } from "./BuyTicketDemoData";
import ConcertSessionSection from "./ConcertSessionSection";
import PrecautionAndNeedtoKnow from "./PrecautionAndNeedtoKnow";
import InsertBuyerInfoSection from "./InsertBuyerInfoSection";
// import InsertCreditCardSection from "./InsertCreditCardSection";
import { Button } from "@/core/components/ui/button";
import Separator from "@/core/components/ui/separator";
import { formatNumberToPrice } from "@/utils/formatToPrice";
import { useBuyTicketContext } from "../hook/useBuyTicketContext";
// import { useNavigate } from "react-router-dom";
export default function BuyTicketSection() {
  // const navigate = useNavigate();
  const { selectedSession, selectedTickets, buyerInfo, validateBuyerInfo } = useBuyTicketContext();
  // chooseSession+TicketType 選擇場次及票種 --> insertBuyerInfo 填寫購票人資訊
  const [buyTicketStep, setBuyTicketStep] = useState("chooseSession");
  const [totalPrice, setTotalPrice] = useState(0);
  const concertData = BuyTicketDemoData();
  const handleBuyTicketStep = (currentStep: string) => {
    // 驗證當前步驟的所有欄位
    let isValid = true;

    if (currentStep === "chooseSession") {
      // 驗證是否選擇場次和票券
      isValid = selectedSession !== null && selectedTickets.length > 0;
    } else if (currentStep === "insertBuyerInfo") {
      // 驗證購票人資訊
      const buyerValidation = validateBuyerInfo();
      isValid = buyerValidation.success;
    }
    const failedValidation = {
      chooseSession: "請選擇場次及票券",
      insertBuyerInfo: "請填寫完整購票人資訊",
    };
    if (!isValid) {
      // 可以加入錯誤提示
      alert(failedValidation[currentStep as keyof typeof failedValidation]);
      return;
    }
    if (currentStep === "chooseSession") {
      setBuyTicketStep("insertBuyerInfo");
    } else if (currentStep === "insertBuyerInfo") {
      // navigate("/concert/paymentResult");
    }
  };
  useEffect(() => {
    console.log("After useEffect, buyTicketStep:", buyTicketStep);
  }, [buyTicketStep]);

  useEffect(() => {
    setTotalPrice(selectedTickets.reduce((acc, ticket) => acc + ticket.ticketPrice * ticket.quantity, 0));
  }, [selectedSession, selectedTickets, buyerInfo]);

  return (
    <div className="flex h-full flex-col items-center gap-2 px-4 lg:gap-8 lg:px-12">
      <div className="mx-auto grid h-[70%] w-full grid-cols-1 lg:w-[90%] lg:grid-cols-2">
        {/* 演唱會資訊 */}
        <div className="col-span-1 h-[70%] space-y-2 lg:px-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{concertData.conTitle}</div>
            <div>
              {concertData.eventStartDate} - {concertData.eventEndDate}
            </div>
          </div>
          <div className="relative h-[350px] w-full">
            <img src={concertData.imgBanner} alt={concertData.conTitle} className="h-full w-full object-cover" />
          </div>
          <div className="my-4">{buyTicketStep === "chooseSession" ? <BeforeBuyTicket /> : <PrecautionAndNeedtoKnow />}</div>
        </div>
        <div className="col-span-1 h-[30%] space-y-2 lg:px-3">
          <div className="flex justify-center gap-2">
            {/* 場次選擇 */}
            {buyTicketStep === "chooseSession" && (
              <ConcertSessionSection sessionData={concertData.sessions} refundPolicy={concertData.refundPolicy} />
            )}
            {/* 購票人資訊 */}
            {buyTicketStep === "insertBuyerInfo" && <InsertBuyerInfoSection />}
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex w-[90%] justify-end">
        <div className="text-lg">
          Total
          <span className="ml-4 text-lg font-semibold">NT$ {formatNumberToPrice("zh-TW", totalPrice, 0)}</span>
        </div>
      </div>
      <div className="flex w-[90%] justify-center">
        <Button variant="outline" className="w-[80%] lg:w-[30%]" onClick={() => handleBuyTicketStep(buyTicketStep)}>
          {buyTicketStep === "insertBuyerInfo" ? "立即付款" : "下一步"}
        </Button>
      </div>
    </div>
  );
}
