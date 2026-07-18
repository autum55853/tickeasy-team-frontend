import { describe, it, expect } from "vitest";
import { formatLocalTime } from "@/utils/formatTime";

describe("formatLocalTime", () => {
  it("空字串回傳空字串", () => {
    expect(formatLocalTime("")).toBe("");
  });

  it("Z 結尾的 UTC 時間不額外加 8 小時", () => {
    // 2024-06-15T02:00:00Z = 02:00 UTC；若錯誤加 8h 會變 10:00
    const result = formatLocalTime("2024-06-15T02:00:00Z");
    // 結果應包含 "02" 而非 "10"
    expect(result).toContain("02");
    expect(result).not.toMatch(/\b10\b/);
  });

  it("+00:00 結尾的 UTC 時間應與 Z 結尾結果相同（修正 regex bug）", () => {
    const resultZ = formatLocalTime("2024-06-15T10:30:00Z");
    const resultPlusZero = formatLocalTime("2024-06-15T10:30:00+00:00");
    // 修正前 +00:00 不被識別為 UTC，會錯誤加 8h；修正後應相等
    expect(resultZ).toBe(resultPlusZero);
  });

  it("無時區標記的時間加 8 小時", () => {
    // 02:30:00（無時區，TZ=UTC 視為 UTC）+ 8h = 10:30:00
    const resultNoTZ = formatLocalTime("2024-06-15T02:30:00");
    const resultZ = formatLocalTime("2024-06-15T10:30:00Z");
    expect(resultNoTZ).toBe(resultZ);
  });

  it("加 8 小時後跨日邊界", () => {
    // 2024-06-15T20:00:00（無時區）+ 8h = 2024-06-16T04:00:00
    const result = formatLocalTime("2024-06-15T20:00:00");
    // 應包含 16（次日）與 04（小時）
    expect(result).toMatch(/16/);
    expect(result).toContain("04");
  });

  it("回傳字串包含年月日", () => {
    const result = formatLocalTime("2024-06-15T10:30:00Z");
    expect(result).toContain("2024");
    expect(result).toContain("06");
    expect(result).toContain("15");
  });
});
