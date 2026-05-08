import { describe, it, expect, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";
import { axiosInstance } from "@/core/lib/axios";
import { useAuthStore } from "@/store/authStore";

const TEST_ENDPOINT = "http://localhost:3001/api/v1/test-axios";

beforeEach(() => {
  useAuthStore.setState({ isLogin: false, email: "", role: "" });
  document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});

describe("請求攔截器：Authorization header", () => {
  it("有 token 時注入 Authorization: Bearer <token>", async () => {
    document.cookie = "auth_token=hello-token; path=/";
    let capturedHeader: string | null = null;

    server.use(
      http.get(TEST_ENDPOINT, ({ request }) => {
        capturedHeader = request.headers.get("Authorization");
        return HttpResponse.json({ status: "success" });
      })
    );

    await axiosInstance.get("/api/v1/test-axios");
    expect(capturedHeader).toBe("Bearer hello-token");
  });

  it("無 token 時不注入 Authorization header", async () => {
    let capturedHeader: string | null = null;

    server.use(
      http.get(TEST_ENDPOINT, ({ request }) => {
        capturedHeader = request.headers.get("Authorization");
        return HttpResponse.json({ status: "success" });
      })
    );

    await axiosInstance.get("/api/v1/test-axios");
    expect(capturedHeader).toBeNull();
  });
});

describe("回應攔截器：401 處理", () => {
  it("401 回應觸發 logout 並拋出 'Token expired'", async () => {
    useAuthStore.setState({ isLogin: true, email: "u@test.com", role: "user" });

    server.use(
      http.get(TEST_ENDPOINT, () => new HttpResponse(null, { status: 401 }))
    );

    await expect(axiosInstance.get("/api/v1/test-axios")).rejects.toThrow("Token expired");
    expect(useAuthStore.getState().isLogin).toBe(false);
  });

  it("非 401 錯誤不觸發 logout", async () => {
    useAuthStore.setState({ isLogin: true, email: "u@test.com", role: "user" });

    server.use(
      http.get(TEST_ENDPOINT, () => new HttpResponse(null, { status: 500 }))
    );

    await expect(axiosInstance.get("/api/v1/test-axios")).rejects.not.toThrow("Token expired");
    expect(useAuthStore.getState().isLogin).toBe(true);
  });
});
