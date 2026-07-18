import { describe, it, expect, beforeEach } from "vitest";
import { useConcertStore } from "@/pages/concerts/store/useConcertStore";
import type { Session, TicketType } from "@/pages/comm/types/Concert";

const mockSession: Session = {
  sessionId: "s1",
  concertId: "c1",
  sessionName: "第一場",
  sessionDate: "2024-06-15",
  sessionStart: "19:00",
  sessionEnd: "21:00",
  ticketTypes: [],
};

const mockTicket: TicketType = {
  ticketTypeId: "t1",
  sessionId: "s1",
  ticketTypeName: "一般票",
  ticketTypePrice: 500,
  totalQuantity: 100,
  remainingQuantity: 100,
  ticketTypeStatus: "available",
};

beforeEach(() => {
  localStorage.clear();
  useConcertStore.setState({
    info: {
      concertId: "",
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
      reviewStatus: "",
      reviewNote: null,
      visitCount: 0,
      promotion: null,
      cancelledAt: null,
      updatedAt: "",
      createdAt: "",
      sessions: [],
    },
    sessions: [],
    organizationConcerts: [],
  });
});

describe("setInfo", () => {
  it("部分更新 info 並保留其餘欄位", () => {
    useConcertStore.getState().setInfo({ conTitle: "新演唱會" });
    const { info } = useConcertStore.getState();
    expect(info.conTitle).toBe("新演唱會");
    expect(info.conInfoStatus).toBe("draft"); // 其餘欄位不變
  });

  it("更新 concertId 時同步寫入 localStorage", () => {
    useConcertStore.getState().setInfo({ concertId: "abc-123" });
    expect(localStorage.getItem("concertId")).toBe("abc-123");
  });
});

describe("addSession / deleteSession", () => {
  it("addSession 新增場次", () => {
    useConcertStore.getState().addSession(mockSession);
    expect(useConcertStore.getState().sessions).toHaveLength(1);
    expect(useConcertStore.getState().sessions[0].sessionId).toBe("s1");
  });

  it("deleteSession 刪除指定場次", () => {
    useConcertStore.getState().addSession(mockSession);
    useConcertStore.getState().deleteSession("s1");
    expect(useConcertStore.getState().sessions).toHaveLength(0);
  });

  it("deleteSession 刪除不存在的 sessionId 不影響現有場次", () => {
    useConcertStore.getState().addSession(mockSession);
    useConcertStore.getState().deleteSession("non-existent");
    expect(useConcertStore.getState().sessions).toHaveLength(1);
  });
});

describe("addTicket / deleteTicket", () => {
  it("addTicket 在指定場次新增票券", () => {
    useConcertStore.getState().addSession(mockSession);
    useConcertStore.getState().addTicket("s1", mockTicket);
    const session = useConcertStore.getState().sessions.find((s) => s.sessionId === "s1");
    expect(session?.ticketTypes).toHaveLength(1);
    expect(session?.ticketTypes[0].ticketTypeId).toBe("t1");
  });

  it("deleteTicket 從場次刪除指定票券", () => {
    useConcertStore.getState().addSession(mockSession);
    useConcertStore.getState().addTicket("s1", mockTicket);
    useConcertStore.getState().deleteTicket("s1", "t1");
    const session = useConcertStore.getState().sessions.find((s) => s.sessionId === "s1");
    expect(session?.ticketTypes).toHaveLength(0);
  });
});

describe("getConcertStatusCounts", () => {
  it("初始狀態各狀態計數均為 0", () => {
    const counts = useConcertStore.getState().getConcertStatusCounts();
    expect(counts.draft).toBe(0);
    expect(counts.reviewing).toBe(0);
    expect(counts.published).toBe(0);
    expect(counts.rejected).toBe(0);
    expect(counts.finished).toBe(0);
  });

  it("計算各狀態演唱會數量", () => {
    useConcertStore.setState({
      organizationConcerts: [
        { ...({} as Parameters<typeof useConcertStore.setState>[0]["organizationConcerts"][0]), concertId: "1", conInfoStatus: "draft" },
        { ...({} as Parameters<typeof useConcertStore.setState>[0]["organizationConcerts"][0]), concertId: "2", conInfoStatus: "published" },
        { ...({} as Parameters<typeof useConcertStore.setState>[0]["organizationConcerts"][0]), concertId: "3", conInfoStatus: "published" },
        { ...({} as Parameters<typeof useConcertStore.setState>[0]["organizationConcerts"][0]), concertId: "4", conInfoStatus: "reviewing" },
      ] as ReturnType<typeof useConcertStore.getState>["organizationConcerts"],
    });
    const counts = useConcertStore.getState().getConcertStatusCounts();
    expect(counts.draft).toBe(1);
    expect(counts.published).toBe(2);
    expect(counts.reviewing).toBe(1);
  });
});
