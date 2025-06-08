import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/core/components/ui/dialog";
import { ContactOrganizer } from "./ContactOrganizer";
import { ContactCustomerService } from "./ContactCustomerService";
import { TicketDetail } from "./TicketDetail";
interface TicketDialogProps {
  trigger: React.ReactNode;
  type: "contactOrganizer" | "contactCustomerService" | "ticketDetail";
}
const typesDialog = {
  contactOrganizer: {
    title: "聯絡主辦單位",
    content: <ContactOrganizer />,
  },
  contactCustomerService: {
    title: "聯絡客服",
    content: <ContactCustomerService />,
  },
  ticketDetail: {
    title: "票券詳細資訊",
    content: <TicketDetail />,
  },
};
export const TicketDialog: React.FC<TicketDialogProps> = ({ trigger, type }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-3xl overflow-hidden">
        <DialogHeader className="sticky top-0 bg-white">
          <DialogTitle>{typesDialog[type].title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto py-4">{typesDialog[type].content}</div>
      </DialogContent>
    </Dialog>
  );
};
