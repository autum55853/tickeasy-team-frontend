import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCustomerServiceSSE } from "@/core/hooks/useCustomerServiceSSE";
import { useCustomerServiceStore } from "@/store/customer-service";

class MockEventSource {
  static instances: MockEventSource[] = [];
  url: string;
  withCredentials: boolean;
  onopen: ((evt: Event) => void) | null = null;
  onmessage: ((evt: MessageEvent) => void) | null = null;
  onerror: ((evt: Event) => void) | null = null;
  close = vi.fn();

  constructor(url: string, init?: EventSourceInit) {
    this.url = url;
    this.withCredentials = init?.withCredentials ?? false;
    this.close = vi.fn();
    MockEventSource.instances.push(this);
  }

  triggerOpen() {
    this.onopen?.(new Event("open"));
  }

  triggerMessage(data: unknown) {
    this.onmessage?.({ data: JSON.stringify(data) } as MessageEvent);
  }

  triggerRawMessage(data: string) {
    this.onmessage?.({ data } as MessageEvent);
  }

  triggerError() {
    this.onerror?.(new Event("error"));
  }
}

beforeEach(() => {
  MockEventSource.instances = [];
  vi.stubGlobal("EventSource", MockEventSource);
  useCustomerServiceStore.setState({
    isOpen: false,
    messages: [],
    session: null,
    isLoading: false,
    isConnected: true,
    unreadCount: 0,
    quickReplies: [],
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useCustomerServiceSSE", () => {
  it("enabled=false 時不建立 EventSource", () => {
    renderHook(() => useCustomerServiceSSE({ sessionId: "session-1", enabled: false }));
    expect(MockEventSource.instances).toHaveLength(0);
  });

  it("無 sessionId 時不建立 EventSource", () => {
    renderHook(() => useCustomerServiceSSE({ sessionId: undefined, enabled: true }));
    expect(MockEventSource.instances).toHaveLength(0);
  });

  it("啟用且有 sessionId → 建立帶正確 URL 的 EventSource", () => {
    renderHook(() => useCustomerServiceSSE({ sessionId: "session-abc", enabled: true }));
    expect(MockEventSource.instances).toHaveLength(1);
    expect(MockEventSource.instances[0].url).toBe(
      "http://localhost:3001/api/v1/smart-reply/session/session-abc/stream"
    );
    expect(MockEventSource.instances[0].withCredentials).toBe(true);
  });

  it("onopen 觸發 → store.isConnected 設為 true", () => {
    useCustomerServiceStore.setState({ isConnected: false });
    renderHook(() => useCustomerServiceSSE({ sessionId: "session-abc", enabled: true }));
    const es = MockEventSource.instances[0];
    act(() => es.triggerOpen());
    expect(useCustomerServiceStore.getState().isConnected).toBe(true);
  });

  it("收到有效訊息 → 訊息加入 store", () => {
    renderHook(() => useCustomerServiceSSE({ sessionId: "session-abc", enabled: true }));
    const es = MockEventSource.instances[0];
    act(() => {
      es.triggerMessage({ senderType: "agent", messageText: "你好，我是客服人員。", messageType: "text" });
    });
    const { messages } = useCustomerServiceStore.getState();
    expect(messages).toHaveLength(1);
    expect(messages[0].messageText).toBe("你好，我是客服人員。");
    expect(messages[0].senderType).toBe("agent");
  });

  it("收到無 messageText 的訊息 → 不加入 store", () => {
    renderHook(() => useCustomerServiceSSE({ sessionId: "session-abc", enabled: true }));
    const es = MockEventSource.instances[0];
    act(() => {
      es.triggerMessage({ senderType: "agent", messageType: "text" });
    });
    expect(useCustomerServiceStore.getState().messages).toHaveLength(0);
  });

  it("收到無效 JSON → 不崩潰且不加入 store", () => {
    renderHook(() => useCustomerServiceSSE({ sessionId: "session-abc", enabled: true }));
    const es = MockEventSource.instances[0];
    act(() => {
      es.triggerRawMessage("not-valid-json{{");
    });
    expect(useCustomerServiceStore.getState().messages).toHaveLength(0);
  });

  it("onerror 觸發 → store.isConnected 設為 false", () => {
    renderHook(() => useCustomerServiceSSE({ sessionId: "session-abc", enabled: true }));
    const es = MockEventSource.instances[0];
    act(() => es.triggerError());
    expect(useCustomerServiceStore.getState().isConnected).toBe(false);
  });

  it("unmount 時 EventSource.close() 被呼叫", () => {
    const { unmount } = renderHook(() =>
      useCustomerServiceSSE({ sessionId: "session-abc", enabled: true })
    );
    const es = MockEventSource.instances[0];
    unmount();
    expect(es.close).toHaveBeenCalledOnce();
  });

  it("sessionId 改變 → 關閉舊連線並開啟新連線", () => {
    const { rerender } = renderHook(
      ({ sessionId }: { sessionId: string }) =>
        useCustomerServiceSSE({ sessionId, enabled: true }),
      { initialProps: { sessionId: "session-1" } }
    );
    const firstEs = MockEventSource.instances[0];

    rerender({ sessionId: "session-2" });

    expect(firstEs.close).toHaveBeenCalledOnce();
    expect(MockEventSource.instances).toHaveLength(2);
    expect(MockEventSource.instances[1].url).toContain("session-2");
  });

  it("enabled 由 true 變 false → 關閉連線", () => {
    const { rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) =>
        useCustomerServiceSSE({ sessionId: "session-abc", enabled }),
      { initialProps: { enabled: true } }
    );
    const es = MockEventSource.instances[0];

    rerender({ enabled: false });

    expect(es.close).toHaveBeenCalledOnce();
    expect(MockEventSource.instances).toHaveLength(1);
  });
});
