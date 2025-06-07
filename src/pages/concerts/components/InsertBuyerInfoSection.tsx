import { Checkbox } from "@/core/components/ui/checkbox";
import { Input } from "@/core/components/ui/input";
import { useState } from "react";
import PaymentSelector from "./PaymentSelector";
import { useBuyTicketContext } from "../hook/useBuyTicketContext";
import { BuyerInfo } from "../types/BuyTicket";
const insertItems = [
  { label: "購票人姓名", id: "name", type: "text" },
  { label: "購票人Email", id: "email", type: "email" },
  { label: "購票人手機號碼", id: "mobilePhone", type: "tel" },
  { label: "目前付款方式僅提供信用卡", id: "paymentMethod", type: "select" },
];
const paymentOptions = [
  { label: "信用卡", value: "creditCard", disabled: false },
  { label: "LinePay", value: "linePay", disabled: true },
  { label: "ATM", value: "atm", disabled: true },
];

export default function InsertCreditCardSection() {
  const { buyerInfo, setBuyerInfo, validateBuyerInfo } = useBuyTicketContext();

  const [buyerSameAsMember, setBuyerSameAsMember] = useState(false);
  // 勾選購票人資訊與會員相同時, 需要發出請求取得會員資訊
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (id: string, value: string) => {
    const newBuyerInfo = { ...buyerInfo, [id]: value };
    setBuyerInfo(newBuyerInfo);
  };
  const handleValidate = (id: string) => {
    // 驗證單一欄位
    const validation = validateBuyerInfo(id as keyof BuyerInfo);
    if (!validation.success && validation.errors) {
      setErrors(validation.errors);
    } else {
      setErrors({});
    }
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="mb-4 pl-4 text-lg">請輸入購買資訊</div>
        <div className="flex flex-col rounded-lg border border-gray-300 p-8">
          <div>
            <Checkbox
              id="buyerSameAsMember"
              onChange={() => setBuyerSameAsMember(!buyerSameAsMember)}
              checked={buyerSameAsMember}
              label="購票人資訊與會員相同"
            />
          </div>
          <div>
            {insertItems.map((item) => {
              return (
                <div key={item.id} className="flex flex-col">
                  {item.type === "select" ? (
                    <PaymentSelector
                      options={paymentOptions}
                      label={item.label}
                      placeholder="請選擇付款方式"
                      value={buyerInfo[item.id as keyof BuyerInfo]}
                      onChange={(value) => setBuyerInfo({ ...buyerInfo, [item.id]: value })}
                    />
                  ) : (
                    <Input
                      type={item.type}
                      value={buyerInfo[item.id as keyof BuyerInfo]}
                      id={item.id}
                      label={item.label}
                      onBlur={() => handleValidate(item.id)}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      error={!!errors[item.id]}
                      errorMessage={errors[item.id]}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
