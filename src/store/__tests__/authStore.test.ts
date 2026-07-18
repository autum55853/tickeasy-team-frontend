import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "@/store/authStore";

beforeEach(() => {
  useAuthStore.setState({ isLogin: false, email: "", role: "" });
  localStorage.clear();
  // 清除 cookie
  document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

describe("setAuth", () => {
  it("設定 email、role，並將 isLogin 改為 true", () => {
    const { setAuth } = useAuthStore.getState();
    setAuth("user@test.com", "admin");
    const state = useAuthStore.getState();
    expect(state.email).toBe("user@test.com");
    expect(state.role).toBe("admin");
    expect(state.isLogin).toBe(true);
  });
});

describe("logout", () => {
  it("清除 email、role，並將 isLogin 改為 false", () => {
    useAuthStore.setState({ isLogin: true, email: "user@test.com", role: "user" });
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.email).toBe("");
    expect(state.role).toBe("");
    expect(state.isLogin).toBe(false);
  });

  it("logout 後 auth_token cookie 被清除", () => {
    useAuthStore.getState().setCookie("some-token");
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().getAuthToken()).toBeNull();
  });
});

describe("setCookie / getAuthToken", () => {
  it("setCookie 後 getAuthToken 能取回相同 token", () => {
    useAuthStore.getState().setCookie("my-secret-token");
    expect(useAuthStore.getState().getAuthToken()).toBe("my-secret-token");
  });

  it("removeCookie 後 getAuthToken 回傳 null", () => {
    useAuthStore.getState().setCookie("my-secret-token");
    useAuthStore.getState().removeCookie();
    expect(useAuthStore.getState().getAuthToken()).toBeNull();
  });
});
