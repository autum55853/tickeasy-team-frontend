import { test, expect } from "@playwright/test";

test.describe("登入頁面", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("成功登入後導向首頁且 auth_token cookie 已設定", async ({ page }) => {
    const email = process.env.E2E_USER_EMAIL ?? "test@example.com";
    const password = process.env.E2E_USER_PASSWORD ?? "testpassword123";

    await page.getByLabel(/電子郵件|email/i).fill(email);
    await page.getByLabel(/密碼|password/i).fill(password);
    await page.getByRole("button", { name: /登入|login/i }).click();
    await expect(page).toHaveURL("/");

    const cookies = await page.context().cookies();
    const authCookie = cookies.find((c) => c.name === "auth_token");
    expect(authCookie).toBeDefined();
  });

  test("錯誤密碼顯示錯誤訊息", async ({ page }) => {
    await page.getByLabel(/電子郵件|email/i).fill("wrong@example.com");
    await page.getByLabel(/密碼|password/i).fill("wrongpassword999");
    await page.getByRole("button", { name: /登入|login/i }).click();
    await expect(page.getByText(/錯誤|失敗|incorrect|invalid/i)).toBeVisible();
  });
});
