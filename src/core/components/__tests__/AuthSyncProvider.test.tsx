import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthSyncProvider } from "@/core/components/auth-sync-provider";
import { useAuthStore } from "@/store/authStore";

function LocationDisplay() {
  const { pathname } = useLocation();
  return <div data-testid="location">{pathname}</div>;
}

function renderSyncProvider(initialPath = "/") {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[initialPath]}>
        <AuthSyncProvider />
        <LocationDisplay />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

class MockBroadcastChannel {
  static instances: MockBroadcastChannel[] = [];
  name: string;
  onmessage: ((evt: MessageEvent) => void) | null = null;
  postMessage = vi.fn();
  close = vi.fn();

  constructor(name: string) {
    this.name = name;
    MockBroadcastChannel.instances.push(this);
  }

  simulate(data: unknown) {
    this.onmessage?.({ data } as MessageEvent);
  }
}

beforeEach(() => {
  MockBroadcastChannel.instances = [];
  vi.stubGlobal("BroadcastChannel", MockBroadcastChannel);
  useAuthStore.setState({ isLogin: true, email: "test@test.com", role: "user" });
});

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
  document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

describe("AuthSyncProvider - BroadcastChannel 模式", () => {
  it("訂閱名稱為 tickeasy_auth 的 channel", () => {
    renderSyncProvider();
    expect(MockBroadcastChannel.instances).toHaveLength(1);
    expect(MockBroadcastChannel.instances[0].name).toBe("tickeasy_auth");
  });

  it("收到 LOGOUT 訊息 → 執行登出並導向 /login", () => {
    const { getByTestId } = renderSyncProvider("/dashboard");
    const channel = MockBroadcastChannel.instances[0];
    act(() => channel.simulate({ type: "LOGOUT" }));
    expect(getByTestId("location").textContent).toBe("/login");
    expect(useAuthStore.getState().isLogin).toBe(false);
    expect(useAuthStore.getState().email).toBe("");
  });

  it("收到非 LOGOUT 訊息 → 無動作", () => {
    const { getByTestId } = renderSyncProvider("/dashboard");
    const channel = MockBroadcastChannel.instances[0];
    act(() => channel.simulate({ type: "OTHER_EVENT" }));
    expect(getByTestId("location").textContent).toBe("/dashboard");
    expect(useAuthStore.getState().isLogin).toBe(true);
  });

  it("收到空 data 訊息 → 無動作", () => {
    const { getByTestId } = renderSyncProvider("/dashboard");
    const channel = MockBroadcastChannel.instances[0];
    act(() => channel.simulate(null));
    expect(getByTestId("location").textContent).toBe("/dashboard");
    expect(useAuthStore.getState().isLogin).toBe(true);
  });

  it("unmount → channel.close() 被呼叫", () => {
    const { unmount } = renderSyncProvider();
    const channel = MockBroadcastChannel.instances[0];
    unmount();
    expect(channel.close).toHaveBeenCalledOnce();
  });
});

describe("AuthSyncProvider - StorageEvent fallback（BroadcastChannel 不可用）", () => {
  beforeEach(() => {
    vi.stubGlobal("BroadcastChannel", undefined);
  });

  it("BroadcastChannel 不可用時改監聽 storage 事件", () => {
    renderSyncProvider();
    expect(MockBroadcastChannel.instances).toHaveLength(0);
  });

  it("tickeasy_logout storage event → 執行登出並導向 /login", () => {
    const { getByTestId } = renderSyncProvider("/dashboard");
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: "tickeasy_logout", newValue: "123456" }));
    });
    expect(getByTestId("location").textContent).toBe("/login");
    expect(useAuthStore.getState().isLogin).toBe(false);
  });

  it("其他 key 的 storage event → 無動作", () => {
    const { getByTestId } = renderSyncProvider("/dashboard");
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: "unrelated_key", newValue: "value" }));
    });
    expect(getByTestId("location").textContent).toBe("/dashboard");
    expect(useAuthStore.getState().isLogin).toBe(true);
  });

  it("unmount → 移除 storage 監聽器（再次觸發無效）", () => {
    const { unmount } = renderSyncProvider("/dashboard");
    unmount();
    act(() => {
      window.dispatchEvent(new StorageEvent("storage", { key: "tickeasy_logout", newValue: "123456" }));
    });
    // 已 unmount，navigate 已失效，驗證 logout 未被觸發（auth state 保持）
    expect(useAuthStore.getState().isLogin).toBe(true);
  });
});
