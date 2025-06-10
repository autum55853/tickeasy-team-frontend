import { sessionItem } from "@/pages/concerts/types/ConcertData";
import { createContext } from "react";
import { SelectedTicket, BuyerInfo } from "@/pages/concerts/types/BuyTicket";

export type BuyTicketContextType = {
  selectedSession: sessionItem | null;
  setSelectedSession: (v: sessionItem | null) => void;
  selectedTickets: SelectedTicket[];
  setSelectedTickets: (v: SelectedTicket[]) => void;
  buyerInfo: BuyerInfo;
  setBuyerInfo: (v: BuyerInfo) => void;
  validateBuyerInfo: (field?: keyof BuyerInfo) => { success: boolean; errors?: Record<string, string> };
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
  validateBuyerInfo: () => ({ success: false, errors: {} }),
});
