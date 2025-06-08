import { create } from "zustand";
import axios from "axios";
import { ConcertResponse, Session, TicketType } from "@/pages/comm/types/Concert";
import { getAuthToken } from "./authToken";

const sessionData: Session[] = [];

type UploadContext = "USER_AVATAR" | "VENUE_PHOTO" | "CONCERT_SEATING_TABLE" | "CONCERT_BANNER";

type ConcertDraftState = {
  info: {
    organizationId: string;
    venueId: string;
    locationTagId: string;
    musicTagId: string;
    conTitle: string;
    conIntroduction: string;
    conLocation: string;
    conAddress: string;
    eventStartDate: string;
    eventEndDate: string;
    ticketPurchaseMethod: string;
    precautions: string;
    refundPolicy: string;
    conInfoStatus: string;
    imgBanner: string;
    sessions: (Omit<Session, "ticketTypes"> & { ticketTypes: TicketType[] })[];
  };
  sessions: Session[];
  setInfo: (info: Partial<ConcertDraftState["info"]>) => void;
  setSessions: (sessions: Session[]) => void;
  updateSession: (session: Partial<Session> & { sessionId: string }) => void;
  addSession: (session: Session) => void;
  deleteSession: (sessionId: string) => void;
  addTicket: (sessionId: string, ticket: TicketType) => void;
  deleteTicket: (sessionId: string, ticketId: string) => void;
  saveDraft: () => Promise<void>;
  uploadImage: (file: File, uploadContext: UploadContext) => Promise<string>;
};

export const useConcertDraftStore = create<ConcertDraftState>((set, get) => ({
  info: {
    organizationId: "",
    venueId: "",
    locationTagId: "",
    musicTagId: "",
    conTitle: "",
    conIntroduction: "",
    conLocation: "",
    conAddress: "",
    eventStartDate: "",
    eventEndDate: "",
    ticketPurchaseMethod: "",
    precautions: "",
    refundPolicy: "",
    conInfoStatus: "draft",
    imgBanner: "",
    sessions: [],
  },
  sessions: sessionData,
  setInfo: (info) => set((state) => ({ info: { ...state.info, ...info } })),
  setSessions: (sessions) => set({ sessions }),
  updateSession: (session) => {
    console.log("updateSession called with", session);
    set((state) => ({
      sessions: state.sessions.map((s) => (s.sessionId === session.sessionId ? { ...s, ...session } : s)),
    }));
  },
  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
    })),
  deleteSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.sessionId !== sessionId),
    })),
  addTicket: (sessionId, ticket) =>
    set((state) => ({
      sessions: state.sessions.map((s) => (s.sessionId === sessionId ? { ...s, ticketTypes: [...s.ticketTypes, ticket] } : s)),
    })),
  deleteTicket: (sessionId, ticketId) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.sessionId === sessionId ? { ...s, ticketTypes: s.ticketTypes.filter((t) => t.ticketTypeId !== ticketId) } : s
      ),
    })),
  saveDraft: async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        return Promise.reject(new Error("未登入"));
      }
      const { info, sessions } = get();
      const payload = {
        ...info,
        sessions: sessions.map((s) => ({
          sessionTitle: s.sessionTitle,
          sessionDate: s.sessionDate,
          sessionStart: s.sessionStart,
          sessionEnd: s.sessionEnd,
          imgSeattable: s.imgSeattable,
          ticketTypes: s.ticketTypes.map((t) => ({
            ticketTypeName: t.ticketTypeName,
            entranceType: t.entranceType,
            ticketBenefits: t.ticketBenefits,
            ticketRefundPolicy: t.ticketRefundPolicy,
            ticketTypePrice: Number(t.ticketTypePrice),
            totalQuantity: t.totalQuantity,
            sellBeginDate: t.sellBeginDate,
            sellEndDate: t.sellEndDate,
          })),
        })),
      };
      const response = await axios.post<ConcertResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/v1/concerts/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "success") {
        return Promise.resolve();
      }
      return Promise.reject(new Error("儲存失敗"));
    } catch (error) {
      return Promise.reject(error);
    }
  },
  uploadImage: async (file: File, uploadContext: UploadContext): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadContext", uploadContext);
      const token = getAuthToken();

      if (!token) {
        return Promise.reject(new Error("未登入"));
      }

      const response = await axios.post<{
        status: string;
        message: string;
        data: { url: string };
      }>(`${import.meta.env.VITE_API_BASE_URL}/api/v1/upload/image`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status === "success") {
        return response.data.data.url;
      }
      return Promise.reject(new Error("上傳失敗"));
    } catch (error) {
      return Promise.reject(error);
    }
  },
}));
