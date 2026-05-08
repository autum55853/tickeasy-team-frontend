import { describe, it, expect } from "vitest";
import { formatNumberToPrice } from "@/utils/formatToPrice";

describe("formatNumberToPrice", () => {
  it("千位分隔", () => {
    expect(formatNumberToPrice("en-US", 1000, 0)).toBe("1,000");
  });

  it("百萬以上千位分隔", () => {
    expect(formatNumberToPrice("en-US", 1234567, 0)).toBe("1,234,567");
  });

  it("零值回傳 '0'", () => {
    expect(formatNumberToPrice("en-US", 0, 0)).toBe("0");
  });

  it("負數保留符號", () => {
    expect(formatNumberToPrice("en-US", -100, 0)).toBe("-100");
  });

  it("小數位數限制（最多 2 位）", () => {
    expect(formatNumberToPrice("en-US", 1234.5678, 2)).toBe("1,234.57");
  });

  it("小數 maximumFractionDigits=0 不顯示小數", () => {
    const result = formatNumberToPrice("en-US", 1234.9, 0);
    expect(result).not.toContain(".");
  });

  it("minimumFractionDigits=0 不補零", () => {
    // 1234.5 在 digital=2 時不應補成 1234.50
    const result = formatNumberToPrice("en-US", 1234.5, 2);
    expect(result).toBe("1,234.5");
  });
});
