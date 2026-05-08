import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePasswordValidation } from "@/core/hooks/usePasswordValidation";

describe("usePasswordValidation", () => {
  it("初始狀態：isValid=true、無錯誤訊息", () => {
    const { result } = renderHook(() => usePasswordValidation());
    expect(result.current.isValid).toBe(true);
    expect(result.current.passwordErrorMessage).toBe("");
    expect(result.current.confirmPasswordErrorMessage).toBe("");
  });

  it("空密碼視為合法", () => {
    const { result } = renderHook(() => usePasswordValidation());
    act(() => result.current.setPassword(""));
    expect(result.current.isValid).toBe(true);
    expect(result.current.passwordErrorMessage).toBe("");
  });

  it("純英文密碼（無數字）：isValid=false", () => {
    const { result } = renderHook(() => usePasswordValidation());
    act(() => result.current.setPassword("abcdefgh"));
    expect(result.current.isValid).toBe(false);
    expect(result.current.passwordErrorMessage).not.toBe("");
  });

  it("純數字密碼（無英文）：isValid=false", () => {
    const { result } = renderHook(() => usePasswordValidation());
    act(() => result.current.setPassword("12345678"));
    expect(result.current.isValid).toBe(false);
    expect(result.current.passwordErrorMessage).not.toBe("");
  });

  it("英數混合密碼：isValid=true", () => {
    const { result } = renderHook(() => usePasswordValidation());
    act(() => result.current.setPassword("abc123"));
    expect(result.current.isValid).toBe(true);
    expect(result.current.passwordErrorMessage).toBe("");
  });

  it("確認密碼不符時顯示錯誤", () => {
    const { result } = renderHook(() => usePasswordValidation());
    act(() => result.current.setPassword("abc123"));
    act(() => result.current.setConfirmPassword("abc456"));
    expect(result.current.confirmPasswordErrorMessage).not.toBe("");
    expect(result.current.isValid).toBe(false);
  });

  it("確認密碼相符時無錯誤", () => {
    const { result } = renderHook(() => usePasswordValidation());
    act(() => result.current.setPassword("abc123"));
    act(() => result.current.setConfirmPassword("abc123"));
    expect(result.current.confirmPasswordErrorMessage).toBe("");
    expect(result.current.isValid).toBe(true);
  });

  it("checkPasswordFormat 只驗證格式、不改變 password state", () => {
    const { result } = renderHook(() => usePasswordValidation());
    act(() => {
      const isValid = result.current.checkPasswordFormat("abc123");
      expect(isValid).toBe(true);
    });
    // password state 不應被 checkPasswordFormat 改變
    expect(result.current.password).toBe("");
  });

  it("checkPasswordFormat 對純英文回傳 false", () => {
    const { result } = renderHook(() => usePasswordValidation());
    let isValid: boolean;
    act(() => {
      isValid = result.current.checkPasswordFormat("onlyletters");
    });
    expect(isValid!).toBe(false);
  });
});
