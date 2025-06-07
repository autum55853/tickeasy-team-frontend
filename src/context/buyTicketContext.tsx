import { sessionItem } from "@/pages/concerts/types/ConcertData";
import { createContext } from "react";
import { SelectedTicket, CreditCardInfo, BuyerInfo } from "@/pages/concerts/types/BuyTicket";

export type BuyTicketContextType = {
  selectedSession: sessionItem | null;
  setSelectedSession: (v: sessionItem | null) => void;
  selectedTickets: SelectedTicket[];
  setSelectedTickets: (v: SelectedTicket[]) => void;
  buyerInfo: BuyerInfo;
  setBuyerInfo: (v: BuyerInfo) => void;
  creditCardInfo: CreditCardInfo;
  setCreditCardInfo: (v: CreditCardInfo) => void;
  validateBuyerInfo: (field?: keyof BuyerInfo) => { success: boolean; errors?: Record<string, string> };
  validateCreditCardInfo: (field?: keyof CreditCardInfo) => { success: boolean; errors?: Record<string, string> };
};

export const BuyTicketContext = createContext<BuyTicketContextType>({
  selectedSession: null,
  setSelectedSession: () => {},
  selectedTickets: [],
  setSelectedTickets: () => [],
  buyerInfo: {
    name: "",
    email: "",
    mobilePhone: "",
    paymentMethod: "",
  },
  setBuyerInfo: () => {},
  creditCardInfo: {
    cardNumber: "",
    cardExpirationDate: "",
    cardCvv: "",
  },
  setCreditCardInfo: () => {},
  validateBuyerInfo: () => ({ success: false, errors: {} }),
  validateCreditCardInfo: () => ({ success: false, errors: {} }),
});
