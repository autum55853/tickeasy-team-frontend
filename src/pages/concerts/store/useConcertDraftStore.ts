import { create } from "zustand";

const sessionData: Session[] = [
  {
    id: 1,
    name: "8/15場次",
    date: "2025/08/15 19:30",
    tickets: [
      {
        id: 1,
        name: "vip",
        saleStart: "2025/05/28 12:00",
        saleEnd: "2025/05/31 23:59",
        price: "3,880",
        quantity: "300",
        entryMethod: "憑電子票",
        ticketType: "入場順序對號，無附加福利",
        refundPolicy: "不接受退票",
      },
      {
        id: 2,
        name: "邊邊",
        saleStart: "2025/05/28 12:00",
        saleEnd: "2025/05/31 23:59",
        price: "2,880",
        quantity: "500",
        entryMethod: "",
        ticketType: "",
        refundPolicy: "",
      },
      {
        id: 3,
        name: "後面",
        saleStart: "2025/05/28 12:00",
        saleEnd: "2025/05/31 23:59",
        price: "1,880",
        quantity: "1,000",
        entryMethod: "",
        ticketType: "",
        refundPolicy: "",
      },
    ],
  },
  {
    id: 2,
    name: "8/16場次",
    date: "2025/08/16 19:30",
    tickets: [],
  },
];

type Ticket = {
  id: number;
  name: string;
  saleStart: string;
  saleEnd: string;
  price: string;
  quantity: string;
  entryMethod: string;
  ticketType: string;
  refundPolicy: string;
};
type Session = {
  id: number;
  name: string;
  date: string;
  tickets: Ticket[];
};

type ConcertDraftState = {
  info: {
    eventName: string;
    eventDescription: string;
    eventVenue: string;
    eventAddress: string;
    eventStartDate: string;
    eventEndDate: string;
    eventTicket: string;
    eventNotice: string;
    eventSuperNotice: string;
  };
  sessions: Session[];
  setInfo: (info: Partial<ConcertDraftState["info"]>) => void;
  setSessions: (sessions: Session[]) => void;
  updateSession: (session: Session) => void;
  addSession: (session: Session) => void;
  deleteSession: (sessionId: number) => void;
  addTicket: (sessionId: number, ticket: Ticket) => void;
  deleteTicket: (sessionId: number, ticketId: number) => void;
};

export const useConcertDraftStore = create<ConcertDraftState>((set) => ({
  info: {
    eventName: "",
    eventDescription: "",
    eventVenue: "",
    eventAddress: "",
    eventStartDate: "",
    eventEndDate: "",
    eventTicket: "",
    eventNotice: "",
    eventSuperNotice: "",
  },
  sessions: sessionData,
  setInfo: (info) => set((state) => ({ info: { ...state.info, ...info } })),
  setSessions: (sessions) => set({ sessions }),
  updateSession: (session) =>
    set((state) => ({
      sessions: state.sessions.map((s) => (s.id === session.id ? session : s)),
    })),
  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
    })),
  deleteSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
    })),
  addTicket: (sessionId, ticket) =>
    set((state) => ({
      sessions: state.sessions.map((s) => (s.id === sessionId ? { ...s, tickets: [...s.tickets, ticket] } : s)),
    })),
  deleteTicket: (sessionId, ticketId) =>
    set((state) => ({
      sessions: state.sessions.map((s) => (s.id === sessionId ? { ...s, tickets: s.tickets.filter((t) => t.id !== ticketId) } : s)),
    })),
}));
