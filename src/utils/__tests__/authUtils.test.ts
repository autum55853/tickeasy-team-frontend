import { describe, it, expect, beforeEach, vi } from "vitest";
import { canAccessDashboard, redirectToDashboard } from "@/utils/authUtils";
import { useAuthStore } from "@/store/authStore";

beforeEach(() => {
  useAuthStore.setState({ isLogin: false, email: "", role: "" });
});

describe("canAccessDashboard", () => {
  it("未登入回傳 false", () => {
    expect(canAccessDashboard()).toBe(false);
  });

  it("登入但 role 為 user 回傳 false", () => {
    useAuthStore.setState({ isLogin: true, email: "u@test.com", role: "user" });
    expect(canAccessDashboard()).toBe(false);
  });

  it("登入且 role 為 admin 回傳 true", () => {
    useAuthStore.setState({ isLogin: true, email: "a@test.com", role: "admin" });
    expect(canAccessDashboard()).toBe(true);
  });

  it("登入且 role 為 superuser 回傳 true", () => {
    useAuthStore.setState({ isLogin: true, email: "s@test.com", role: "superuser" });
    expect(canAccessDashboard()).toBe(true);
  });
});

describe("redirectToDashboard", () => {
  it("沒有 token 時不呼叫 window.open", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    redirectToDashboard();
    expect(openSpy).not.toHaveBeenCalled();
    openSpy.mockRestore();
  });

  it("有 token 時以包含 token 的 URL 呼叫 window.open", () => {
    document.cookie = "auth_token=my-test-token; path=/";
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    redirectToDashboard();
    expect(openSpy).toHaveBeenCalledOnce();
    const calledUrl = openSpy.mock.calls[0][0] as string;
    expect(calledUrl).toContain("token=my-test-token");
    openSpy.mockRestore();
  });
});
