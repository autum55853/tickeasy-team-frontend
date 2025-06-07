import { Input } from "@/core/components/ui/input";
import { useEffect, useState } from "react";
import { useBuyTicketContext } from "../hook/useBuyTicketContext";
import { CreditCardInfo } from "../types/BuyTicket";
import { formatNumberToPrice } from "@/utils/formatToPrice";
const insertItems = [
  { label: "信用卡卡號", value: "cardNumber", type: "text" },
  { label: "信用卡有效日期", value: "cardExpirationDate", type: "text" },
  { label: "信用卡安全碼", value: "cardCvv", type: "text" },
];
export default function InsertCreditCardSection({ totalPrice }: { totalPrice: number }) {
  const { creditCardInfo, setCreditCardInfo, validateCreditCardInfo } = useBuyTicketContext();
  const handleInputChange = (id: string, value: string) => {
    const newCreditCardInfo = { ...creditCardInfo, [id]: value };
    setCreditCardInfo(newCreditCardInfo);
  };
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleValidate = (id: string) => {
    // 驗證單一欄位
    const validation = validateCreditCardInfo(id as keyof CreditCardInfo);
    if (!validation.success && validation.errors) {
      setErrors(validation.errors);
    } else {
      setErrors({});
    }
  };
  useEffect(() => {
    setCreditCardInfo({
      cardNumber: "123456789",
      cardExpirationDate: "05/25",
      cardCvv: "000",
    });
  }, [creditCardInfo]);
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="mb-4 pl-4 text-lg">請輸入信用卡資訊</div>
        <div className="flex flex-col rounded-lg border border-gray-300 p-8">
          <div>
            <div className="flex items-center justify-end text-xl">
              訂單總金額 <span className="ml-4 text-red-500">NT$ {formatNumberToPrice("zh-TW", totalPrice, 0)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {insertItems.map((item) => {
              return (
                <Input
                  key={item.value}
                  type={item.type}
                  value={creditCardInfo[item.value as keyof CreditCardInfo]}
                  id={item.value}
                  label={item.label}
                  onBlur={() => handleValidate(item.value)}
                  onChange={(e) => handleInputChange(item.value, e.target.value)}
                  error={!!errors[item.value]}
                  errorMessage={errors[item.value]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
