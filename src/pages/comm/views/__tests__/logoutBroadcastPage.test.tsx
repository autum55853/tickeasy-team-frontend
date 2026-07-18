import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import LogoutBroadcastPage from "@/pages/comm/views/logoutBroadcastPage";
import { useAuthStore } from "@/store/authStore";

function LocationDisplay() {
  const { pathname } = useLocation();
  return <div data-testid="location">{pathname}</div>;
}

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

// sender 端跨域廣播已抽到 @/lib/logoutChannel 的 sendLogout（重用接收端單例
// channel）。測試以契約方式驗證頁面委派呼叫 sendLogout，不再自建 channel/subscribe。
const mocks = vi.hoisted(() => {
  const sendLogout = vi.fn().mockResolvedValue(undefined);
  return { sendLogout };
});

vi.mock("@/lib/logoutChannel", () => ({
  sendLogout: mocks.sendLogout,
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <LogoutBroadcastPage />
      <LocationDisplay />
    </MemoryRouter>
  );
}

/** 等待頁面 async 廣播流程（await sendLogout → logout → 同源廣播 → navigate）完成 */
async function flushBroadcast() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

beforeEach(() => {
  MockBroadcastChannel.instances = [];
  vi.stubGlobal("BroadcastChannel", MockBroadcastChannel);
  useAuthStore.setState({ isLogin: true, email: "test@test.com", role: "user" });
  vi.useFakeTimers();
  mocks.sendLogout.mockClear();
  mocks.sendLogout.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  localStorage.clear();
  document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

describe("LogoutBroadcastPage", () => {
  it("Supabase broadcast 完成後呼叫 logout，清除 auth 狀態", async () => {
    renderPage();
    // broadcast 尚未完成前，logout 尚未執行
    expect(useAuthStore.getState().isLogin).toBe(true);

    await flushBroadcast();

    expect(useAuthStore.getState().isLogin).toBe(false);
    expect(useAuthStore.getState().email).toBe("");
    expect(useAuthStore.getState().role).toBe("");
  });

  it("broadcast 完成後廣播 LOGOUT 事件到 tickeasy_auth channel", async () => {
    renderPage();
    await flushBroadcast();

    const channel = MockBroadcastChannel.instances[0];
    expect(channel.name).toBe("tickeasy_auth");
    expect(channel.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: "LOGOUT", timestamp: expect.any(Number) })
    );
  });

  it("廣播後 100ms 關閉 BroadcastChannel", async () => {
    renderPage();
    await flushBroadcast();

    const channel = MockBroadcastChannel.instances[0];
    expect(channel.close).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(100));
    expect(channel.close).toHaveBeenCalledOnce();
  });

  it("broadcast 完成後寫入 localStorage tickeasy_logout（Safari fallback）", async () => {
    renderPage();
    await flushBroadcast();

    expect(localStorage.getItem("tickeasy_logout")).not.toBeNull();
  });

  it("100ms 後移除 localStorage tickeasy_logout", async () => {
    renderPage();
    await flushBroadcast();

    act(() => vi.advanceTimersByTime(100));
    expect(localStorage.getItem("tickeasy_logout")).toBeNull();
  });

  it("在 iframe 中 → 通知 parent LOGOUT_BROADCAST_DONE", async () => {
    const parentPostMessage = vi.fn();
    const mockParent = { postMessage: parentPostMessage };
    Object.defineProperty(window, "parent", { get: () => mockParent, configurable: true });

    renderPage();
    await flushBroadcast();

    expect(parentPostMessage).toHaveBeenCalledWith({ type: "LOGOUT_BROADCAST_DONE" }, "*");

    Object.defineProperty(window, "parent", { get: () => window, configurable: true });
  });

  it("BroadcastChannel 不可用時僅用 localStorage fallback，不崩潰", async () => {
    vi.stubGlobal("BroadcastChannel", undefined);
    renderPage();
    await flushBroadcast();

    expect(MockBroadcastChannel.instances).toHaveLength(0);
    expect(localStorage.getItem("tickeasy_logout")).not.toBeNull();
    expect(useAuthStore.getState().isLogin).toBe(false);
  });

  it("handledRef guard：多次 render 只執行一次 logout 和廣播", async () => {
    const { rerender } = renderPage();
    await flushBroadcast();

    rerender(
      <MemoryRouter>
        <LogoutBroadcastPage />
      </MemoryRouter>
    );
    expect(MockBroadcastChannel.instances[0].postMessage).toHaveBeenCalledOnce();
  });

  it("email 存在時呼叫 sendLogout 送出跨域 LOGOUT 廣播", async () => {
    renderPage();
    await flushBroadcast();

    expect(mocks.sendLogout).toHaveBeenCalledTimes(1);
  });

  it("sendLogout reject 時仍正常導向 /login（best effort）", async () => {
    mocks.sendLogout.mockRejectedValueOnce(new Error("broadcast failed"));

    const { getByTestId } = renderPage();
    await flushBroadcast();

    expect(getByTestId("location").textContent).toBe("/login");
    expect(useAuthStore.getState().isLogin).toBe(false);
  });

  it("email 為空時不呼叫 sendLogout，直接登出並導向 /login", async () => {
    useAuthStore.setState({ isLogin: false, email: "", role: "" });

    const { getByTestId } = renderPage();
    await flushBroadcast();

    expect(mocks.sendLogout).not.toHaveBeenCalled();
    expect(getByTestId("location").textContent).toBe("/login");
  });
});
