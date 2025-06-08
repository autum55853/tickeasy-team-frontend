import { useToast } from "@/core/hooks/useToast";
import { useConcertDraftStore } from "../store/useConcertDraftStore";
import { Session, TicketType } from "@/pages/comm/types/Concert";

export const useSaveDraft = () => {
  const { toast } = useToast();
  const { sessions, updateSession, addSession, addTicket, deleteSession, deleteTicket } = useConcertDraftStore();

  const handleSaveDraft = async () => {
    try {
      await useConcertDraftStore.getState().saveDraft();
      toast({
        title: "成功",
        description: "草稿儲存成功",
      });
    } catch (error) {
      toast({
        title: "錯誤",
        description: "草稿儲存失敗",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleSaveSession = (id: string, editBuffer: Partial<Session>) => {
    const session = sessions.find((s) => s.sessionId === id);
    if (!session) return;
    updateSession({
      sessionId: id,
      sessionTitle: editBuffer.sessionTitle,
      sessionDate: editBuffer.sessionDate,
      sessionStart: editBuffer.sessionStart,
      sessionEnd: editBuffer.sessionEnd,
    });
  };

  const handleTicketSave = (sessionId: string, ticketId: string, ticketEditBuffer: Partial<TicketType>) => {
    const session = sessions.find((s) => s.sessionId === sessionId);
    if (!session) return;
    const updatedTickets = session.ticketTypes.map((t) => (t.ticketTypeId === ticketId ? { ...t, ...ticketEditBuffer } : t));
    updateSession({
      sessionId,
      ticketTypes: updatedTickets,
    });
  };

  const handleAddSession = () => {
    const newSession: Session = {
      sessionId: `tmp-${Date.now()}`,
      concertId: "",
      sessionTitle: "",
      sessionDate: "",
      sessionStart: "",
      sessionEnd: "",
      imgSeattable: "",
      createdAt: new Date().toISOString(),
      ticketTypes: [],
    };
    addSession(newSession);
    return newSession.sessionId;
  };

  const handleAddTicketType = (sessionId: string) => {
    const newTicketId = `tmp-${Date.now()}`;
    const newTicket: TicketType = {
      ticketTypeId: newTicketId,
      concertSessionId: sessionId,
      ticketTypeName: "",
      sellBeginDate: "",
      sellEndDate: "",
      ticketTypePrice: "",
      totalQuantity: 0,
      entranceType: "",
      ticketBenefits: "",
      ticketRefundPolicy: "",
      remainingQuantity: 0,
      createdAt: new Date().toISOString(),
    };
    addTicket(sessionId, newTicket);
    return newTicketId;
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
  };

  const handleDeleteTicket = (sessionId: string, ticketId: string) => {
    deleteTicket(sessionId, ticketId);
  };

  return {
    handleSaveDraft,
    handleSaveSession,
    handleTicketSave,
    handleAddSession,
    handleAddTicketType,
    handleDeleteSession,
    handleDeleteTicket,
  };
};
