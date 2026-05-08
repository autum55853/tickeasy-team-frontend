import { test, expect } from "@playwright/test";

test.describe("路由守衛（公開）", () => {
  test("未登入訪問受保護頁面 → 導向 /login", async ({ page }) => {
    await page.goto("/user/about/profile");
    await expect(page).toHaveURL(/\/login/);
  });

  test("未知路徑 → /404 頁面", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-xyz");
    await expect(page).toHaveURL(/\/404/);
  });
});
