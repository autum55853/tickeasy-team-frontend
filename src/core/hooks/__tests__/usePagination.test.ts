import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePagination } from "@/core/hooks/usePagination";

describe("usePagination", () => {
  it("totalPages 計算：Math.ceil(totalItems / itemsPerPage)", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 25, itemsPerPage: 10 }));
    expect(result.current.totalPages).toBe(3);
  });

  it("預設 itemsPerPage 為 10", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 15 }));
    expect(result.current.totalPages).toBe(2);
  });

  it("初始 currentPage 為 1", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, itemsPerPage: 10 }));
    expect(result.current.currentPage).toBe(1);
  });

  it("goNext 移到下一頁", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, itemsPerPage: 10 }));
    act(() => result.current.goNext());
    expect(result.current.currentPage).toBe(2);
  });

  it("goNext 不超過最後一頁（邊界）", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 10, itemsPerPage: 10 }));
    act(() => result.current.goNext());
    expect(result.current.currentPage).toBe(1); // 只有 1 頁
  });

  it("goPrev 移到上一頁", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, itemsPerPage: 10 }));
    act(() => result.current.goNext());
    act(() => result.current.goPrev());
    expect(result.current.currentPage).toBe(1);
  });

  it("goPrev 不低於第 1 頁（邊界）", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, itemsPerPage: 10 }));
    act(() => result.current.goPrev());
    expect(result.current.currentPage).toBe(1); // clamp at 1
  });

  it("goToPage 跳至指定頁碼", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 50, itemsPerPage: 10 }));
    act(() => result.current.goToPage(3));
    expect(result.current.currentPage).toBe(3);
  });

  it("goToPage 超出範圍時 clamp 至最後一頁", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, itemsPerPage: 10 }));
    act(() => result.current.goToPage(100));
    expect(result.current.currentPage).toBe(3);
  });

  it("goToPage 低於 1 時 clamp 至第 1 頁", () => {
    const { result } = renderHook(() => usePagination({ totalItems: 30, itemsPerPage: 10 }));
    act(() => result.current.goToPage(-5));
    expect(result.current.currentPage).toBe(1);
  });
});
