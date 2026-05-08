import { describe, it, expect } from "vitest";
import { render, act } from "@testing-library/react";
import { useContext } from "react";
import { BuyTicketProvider } from "@/pages/concerts/hook/BuyTicketContext";
import { BuyTicketContext } from "@/context/buyTicketContext";
import type { sessionItem } from "@/pages/concerts/types/ConcertData";

// 輔助元件：存取 context 並透過 data-testid 輸出結果
function TestConsumer({ onResult }: { onResult: (ctx: ReturnType<typeof useContext<typeof BuyTicketContext>>) => void }) {
  const ctx = useContext(BuyTicketContext);
  onResult(ctx);
  return <div data-testid="consumer" />;
}

function renderProvider() {
  let ctx: ReturnType<typeof useContext<typeof BuyTicketContext>> | null = null;
  render(
    <BuyTicketProvider>
      <TestConsumer
        onResult={(c) => {
          ctx = c;
        }}
      />
    </BuyTicketProvider>
  );
  return () => ctx!;
}

describe("BuyTicketContext - validateBuyerInfo", () => {
  it("初始狀態所有欄位為空時，驗證全部失敗", () => {
    const getCtx = renderProvider();
    const result = getCtx().validateBuyerInfo();
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it("有效的 buyerInfo 驗證通過", async () => {
    const getCtx = renderProvider();
    act(() => {
      getCtx().setBuyerInfo({
        name: "王小明",
        email: "wang@example.com",
        mobilePhone: "0912345678",
        paymentMethod: "credit_card",
      });
    });
    const result = getCtx().validateBuyerInfo();
    expect(result.success).toBe(true);
  });

  it("手機號碼非 0 開頭時驗證失敗", () => {
    const getCtx = renderProvider();
    act(() => {
      getCtx().setBuyerInfo({
        name: "王小明",
        email: "wang@example.com",
        mobilePhone: "1912345678",
        paymentMethod: "credit_card",
      });
    });
    const result = getCtx().validateBuyerInfo();
    expect(result.success).toBe(false);
    expect(result.errors?.mobilePhone).toBeDefined();
  });

  it("手機號碼非 10 碼時驗證失敗", () => {
    const getCtx = renderProvider();
    act(() => {
      getCtx().setBuyerInfo({
        name: "王小明",
        email: "wang@example.com",
        mobilePhone: "091234567",
        paymentMethod: "credit_card",
      });
    });
    const result = getCtx().validateBuyerInfo();
    expect(result.success).toBe(false);
    expect(result.errors?.mobilePhone).toBeDefined();
  });

  it("email 格式無效時只有 email 驗證失敗", () => {
    const getCtx = renderProvider();
    act(() => {
      getCtx().setBuyerInfo({
        name: "王小明",
        email: "invalid-email",
        mobilePhone: "0912345678",
        paymentMethod: "credit_card",
      });
    });
    const result = getCtx().validateBuyerInfo();
    expect(result.success).toBe(false);
    expect(result.errors?.email).toBeDefined();
    expect(result.errors?.mobilePhone).toBeUndefined();
  });
});

describe("BuyTicketContext - setSelectedSession", () => {
  it("setSelectedSession 更新選中場次", () => {
    const getCtx = renderProvider();
    const mockSession: sessionItem = {
      sessionId: "s1",
      sessionName: "第一場",
      sessionDate: "2024-06-15",
      sessionStart: "19:00",
      sessionEnd: "21:00",
      ticketTypes: [],
    };
    act(() => getCtx().setSelectedSession(mockSession));
    expect(getCtx().selectedSession?.sessionId).toBe("s1");
  });

  it("setSelectedSession(null) 清除場次", () => {
    const getCtx = renderProvider();
    act(() => getCtx().setSelectedSession(null));
    expect(getCtx().selectedSession).toBeNull();
  });
});
