import { BuyTicketContext } from "@/context/buyTicketContext";
import { useState } from "react";
import { sessionItem } from "../types/ConcertData";
import { SelectedTicket } from "../types/BuyTicket";

import { z } from "zod";

// 定義驗證 buyerInfo schema
const buyerInfoSchema = z.object({
  name: z.string().trim().min(1, "姓名為必填"),
  email: z.string().trim().email("請輸入有效的電子郵件"),
  mobilePhone: z
    .string()
    .trim()
    .regex(/^0\d{9}$/, "手機號碼必須為 0 開頭，共 10 碼")
    .length(10, "手機號碼必須為 10 碼"),
  paymentMethod: z.string().min(1, "請選擇付款方式"),
});

type BuyerInfo = z.infer<typeof buyerInfoSchema>;

// 定義驗證 creditCardInfo schema
const creditCardInfoSchema = z.object({
  cardNumber: z.string().trim().min(1, "信用卡號為必填"),
  cardExpirationDate: z.string().trim().min(1, "信用卡有效期限為必填"),
  cardCvv: z.string().trim().min(1, "信用卡安全碼為必填"),
});

type CreditCardInfo = z.infer<typeof creditCardInfoSchema>;

export const BuyTicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSession, setSelectedSession] = useState<sessionItem | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    name: "",
    email: "",
    mobilePhone: "",
    paymentMethod: "",
  });
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>({
    cardNumber: "",
    cardExpirationDate: "",
    cardCvv: "",
  });
  const validateBuyerInfo = (field?: keyof BuyerInfo) => {
    if (field) {
      // 只驗證特定欄位
      const result = buyerInfoSchema.shape[field].safeParse(buyerInfo[field]);
      if (!result.success) {
        return {
          success: false,
          errors: { [field]: result.error.errors[0].message },
        };
      }
      return { success: true };
    }

    // 驗證所有欄位
    const result = buyerInfoSchema.safeParse(buyerInfo);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: true };
  };
  const validateCreditCardInfo = (field?: keyof CreditCardInfo) => {
    if (field) {
      // 只驗證特定欄位
      const result = creditCardInfoSchema.shape[field].safeParse(creditCardInfo[field]);
      if (!result.success) {
        return {
          success: false,
          errors: { [field]: result.error.errors[0].message },
        };
      }
      return { success: true };
    }

    // 驗證所有欄位
    const result = buyerInfoSchema.safeParse(buyerInfo);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: true };
  };
  return (
    <BuyTicketContext.Provider
      value={{
        selectedSession,
        setSelectedSession,
        selectedTickets,
        setSelectedTickets,
        buyerInfo,
        setBuyerInfo,
        creditCardInfo,
        setCreditCardInfo,
        validateBuyerInfo,
        validateCreditCardInfo,
      }}
    >
      {children}
    </BuyTicketContext.Provider>
  );
};
