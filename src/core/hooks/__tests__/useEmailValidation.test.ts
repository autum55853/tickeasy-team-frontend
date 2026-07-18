import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useEmailValidation } from "@/core/hooks/useEmailValidation";

describe("useEmailValidation", () => {
  it("初始狀態：email 為空、isValid=false（尚未驗證）、無錯誤訊息", () => {
    const { result } = renderHook(() => useEmailValidation());
    expect(result.current.email).toBe("");
    expect(result.current.isValid).toBe(false);
    expect(result.current.errorMessage).toBe("");
  });

  it("空字串視為合法（不顯示錯誤）", () => {
    const { result } = renderHook(() => useEmailValidation());
    act(() => result.current.setEmail(""));
    expect(result.current.isValid).toBe(true);
    expect(result.current.errorMessage).toBe("");
  });

  it("有效電子郵件格式：isValid=true、無錯誤訊息", () => {
    const { result } = renderHook(() => useEmailValidation());
    act(() => result.current.setEmail("user@example.com"));
    expect(result.current.isValid).toBe(true);
    expect(result.current.errorMessage).toBe("");
  });

  it("無效格式：isValid=false、顯示錯誤訊息", () => {
    const { result } = renderHook(() => useEmailValidation());
    act(() => result.current.setEmail("not-an-email"));
    expect(result.current.isValid).toBe(false);
    expect(result.current.errorMessage).not.toBe("");
  });

  it("缺少 @ 符號：無效", () => {
    const { result } = renderHook(() => useEmailValidation());
    act(() => result.current.setEmail("userexample.com"));
    expect(result.current.isValid).toBe(false);
  });

  it("缺少頂層域名：無效", () => {
    const { result } = renderHook(() => useEmailValidation());
    act(() => result.current.setEmail("user@example"));
    expect(result.current.isValid).toBe(false);
  });

  it("initialEmail 參數設定初始值", () => {
    const { result } = renderHook(() => useEmailValidation("preset@test.com"));
    expect(result.current.email).toBe("preset@test.com");
  });
});
