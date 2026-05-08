import { describe, it, expect } from "vitest";
import { cn, generatePaginationRange } from "@/core/lib/utils";

describe("cn()", () => {
  it("合併多個 class 字串", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("條件 class：false 不加入", () => {
    expect(cn("foo", false && "bar")).toBe("foo");
  });

  it("Tailwind merge：後面的 class 覆蓋前面的衝突 class", () => {
    // p-2 與 p-4 衝突，後者應勝出
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("undefined 與 null 不加入", () => {
    expect(cn("foo", undefined, null)).toBe("foo");
  });

  it("陣列形式的條件 class", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});

describe("generatePaginationRange", () => {
  it("只有 1 頁時回傳 [1]", () => {
    expect(generatePaginationRange(1, 1)).toEqual([1]);
  });

  it("總頁數少於等於 5 頁時不出現 ellipsis", () => {
    const result = generatePaginationRange(3, 5);
    expect(result).not.toContain("ellipsis");
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("總頁數多時，中間插入 ellipsis", () => {
    // 目前頁在中間，兩側都應有 ellipsis
    const result = generatePaginationRange(5, 10);
    expect(result).toContain("ellipsis");
    // 首尾頁一定在列表中
    expect(result[0]).toBe(1);
    expect(result[result.length - 1]).toBe(10);
  });

  it("目前頁接近開頭，只有右側 ellipsis", () => {
    const result = generatePaginationRange(1, 10);
    // 只應出現一個 ellipsis
    const ellipsisCount = result.filter((v) => v === "ellipsis").length;
    expect(ellipsisCount).toBe(1);
    expect(result[result.length - 1]).toBe(10);
  });

  it("目前頁接近結尾，只有左側 ellipsis", () => {
    const result = generatePaginationRange(10, 10);
    const ellipsisCount = result.filter((v) => v === "ellipsis").length;
    expect(ellipsisCount).toBe(1);
    expect(result[0]).toBe(1);
  });

  it("當 gap 恰好為 2 時，填入中間頁碼而非 ellipsis", () => {
    // page=1, total=5：1,2,3,4,5 → 無 ellipsis
    const result = generatePaginationRange(1, 5);
    expect(result).not.toContain("ellipsis");
  });
});
