import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LogoutBroadcastPage from "@/pages/comm/views/logoutBroadcastPage";
import { useAuthStore } from "@/store/authStore";

class MockBroadcastChannel {
  static instances: MockBroadcastChannel[] = [];
  name: string;
  postMessage = vi.fn();
  close = vi.fn();

  constructor(name: string) {
    this.name = name;
    MockBroadcastChannel.instances.push(this);
  }
}

function renderPage() {
  return render(
    <MemoryRouter>
      <LogoutBroadcastPage />
    </MemoryRouter>
  );
}

beforeEach(() => {
  MockBroadcastChannel.instances = [];
  vi.stubGlobal("BroadcastChannel", MockBroadcastChannel);
  useAuthStore.setState({ isLogin: true, email: "test@test.com", role: "user" });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  localStorage.clear();
  document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

describe("LogoutBroadcastPage", () => {
  it("mount 時呼叫 logout，清除 auth 狀態", () => {
    renderPage();
    expect(useAuthStore.getState().isLogin).toBe(false);
    expect(useAuthStore.getState().email).toBe("");
    expect(useAuthStore.getState().role).toBe("");
  });

  it("廣播 LOGOUT 事件到 tickeasy_auth channel", () => {
    renderPage();
    const channel = MockBroadcastChannel.instances[0];
    expect(channel.name).toBe("tickeasy_auth");
    expect(channel.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: "LOGOUT", timestamp: expect.any(Number) })
    );
  });

  it("廣播後 100ms 關閉 channel", () => {
    renderPage();
    const channel = MockBroadcastChannel.instances[0];
    expect(channel.close).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(100));
    expect(channel.close).toHaveBeenCalledOnce();
  });

  it("寫入 localStorage tickeasy_logout（Safari fallback）", () => {
    renderPage();
    expect(localStorage.getItem("tickeasy_logout")).not.toBeNull();
  });

  it("100ms 後移除 localStorage tickeasy_logout", () => {
    renderPage();
    act(() => vi.advanceTimersByTime(100));
    expect(localStorage.getItem("tickeasy_logout")).toBeNull();
  });

  it("在 iframe 中 → 通知 parent LOGOUT_BROADCAST_DONE", () => {
    const parentPostMessage = vi.fn();
    const mockParent = { postMessage: parentPostMessage };
    Object.defineProperty(window, "parent", { get: () => mockParent, configurable: true });

    renderPage();

    expect(parentPostMessage).toHaveBeenCalledWith({ type: "LOGOUT_BROADCAST_DONE" }, "*");

    // 還原（讓後續測試不受影響）
    Object.defineProperty(window, "parent", { get: () => window, configurable: true });
  });

  it("BroadcastChannel 不可用時僅用 localStorage fallback，不崩潰", () => {
    vi.stubGlobal("BroadcastChannel", undefined);
    renderPage();
    expect(MockBroadcastChannel.instances).toHaveLength(0);
    expect(localStorage.getItem("tickeasy_logout")).not.toBeNull();
    expect(useAuthStore.getState().isLogin).toBe(false);
  });

  it("handledRef guard：多次 render 只執行一次 logout 和廣播", () => {
    const { rerender } = renderPage();
    rerender(
      <MemoryRouter>
        <LogoutBroadcastPage />
      </MemoryRouter>
    );
    expect(MockBroadcastChannel.instances[0].postMessage).toHaveBeenCalledOnce();
  });
});
