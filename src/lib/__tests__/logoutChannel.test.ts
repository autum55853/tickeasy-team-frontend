import { describe, it, expect, vi, beforeEach } from "vitest";

// 模組單例：前台「接收」與「送出」跨域登出廣播共用同一 channel。
// 以 mock 的 supabase client 驗證單例行為（同 topic 不重開、email 變更才重建、
// sendLogout 重用已訂閱 channel）。
const mocks = vi.hoisted(() => {
  const onCbRef: { current: (() => void) | null } = { current: null };
  const subscribeCbRef: { current: ((status: string) => void) | null } = {
    current: null,
  };
  const mockSend = vi.fn().mockResolvedValue({ status: "ok" });
  const chan = {
    on: vi.fn(
      (event: string, filter: { event: string }, cb: () => void) => {
        if (event === "broadcast" && filter.event === "LOGOUT") {
          onCbRef.current = cb;
        }
        return chan;
      }
    ),
    subscribe: vi.fn((cb: (status: string) => void) => {
      subscribeCbRef.current = cb;
      return chan;
    }),
    send: mockSend,
  };
  const mockChannel = vi.fn(() => chan);
  const mockRemoveChannel = vi.fn();
  return {
    onCbRef,
    subscribeCbRef,
    mockSend,
    chan,
    mockChannel,
    mockRemoveChannel,
  };
});

vi.mock("@/lib/supabase", () => ({
  supabase: {
    channel: mocks.mockChannel,
    removeChannel: mocks.mockRemoveChannel,
  },
}));

// 每個測試取得全新單例（resetModules 清掉模組層 _logoutChannel 狀態）。
async function freshModule() {
  vi.resetModules();
  return import("@/lib/logoutChannel");
}

beforeEach(() => {
  mocks.onCbRef.current = null;
  mocks.subscribeCbRef.current = null;
  mocks.mockSend.mockClear();
  mocks.chan.on.mockClear();
  mocks.chan.subscribe.mockClear();
  mocks.mockChannel.mockClear();
  mocks.mockRemoveChannel.mockClear();
});

describe("logoutChannel - ensureLogoutChannel", () => {
  it("建立 tickeasy-session-{email} channel 並訂閱 LOGOUT broadcast", async () => {
    const { ensureLogoutChannel } = await freshModule();
    ensureLogoutChannel("a@a.com", vi.fn());

    expect(mocks.mockChannel).toHaveBeenCalledWith("tickeasy-session-a@a.com");
    expect(mocks.chan.on).toHaveBeenCalledWith(
      "broadcast",
      { event: "LOGOUT" },
      expect.any(Function)
    );
    expect(mocks.chan.subscribe).toHaveBeenCalled();
  });

  it("同 email 重複呼叫 → 重用單例，不重開 channel", async () => {
    const { ensureLogoutChannel } = await freshModule();
    ensureLogoutChannel("a@a.com", vi.fn());
    ensureLogoutChannel("a@a.com", vi.fn());

    expect(mocks.mockChannel).toHaveBeenCalledTimes(1);
    expect(mocks.mockRemoveChannel).not.toHaveBeenCalled();
  });

  it("email 變更 → 先 removeChannel 舊的，再建立新 channel", async () => {
    const { ensureLogoutChannel } = await freshModule();
    ensureLogoutChannel("a@a.com", vi.fn());
    ensureLogoutChannel("b@b.com", vi.fn());

    expect(mocks.mockRemoveChannel).toHaveBeenCalledTimes(1);
    expect(mocks.mockChannel).toHaveBeenCalledTimes(2);
    expect(mocks.mockChannel).toHaveBeenLastCalledWith(
      "tickeasy-session-b@b.com"
    );
  });

  it("收到 LOGOUT broadcast → 觸發傳入的 onLogout", async () => {
    const { ensureLogoutChannel } = await freshModule();
    const onLogout = vi.fn();
    ensureLogoutChannel("a@a.com", onLogout);

    mocks.onCbRef.current?.();
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});

describe("logoutChannel - sendLogout", () => {
  it("重用已訂閱單例 channel 送出 LOGOUT broadcast", async () => {
    const { ensureLogoutChannel, sendLogout } = await freshModule();
    ensureLogoutChannel("a@a.com", vi.fn());

    await sendLogout();

    expect(mocks.mockSend).toHaveBeenCalledWith({
      type: "broadcast",
      event: "LOGOUT",
      payload: expect.objectContaining({ timestamp: expect.any(Number) }),
    });
  });

  it("單例尚未建立時 → no-op，不呼叫 send", async () => {
    const { sendLogout } = await freshModule();

    await sendLogout();

    expect(mocks.mockSend).not.toHaveBeenCalled();
  });
});
