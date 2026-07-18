import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(import.meta.dirname, ".auth/user.json");

setup("全局登入 setup", async ({ page }) => {
  const email = process.env.E2E_USER_EMAIL;
  const password = process.env.E2E_USER_PASSWORD;

  if (!email || !password) {
    throw new Error("請設定 E2E_USER_EMAIL 與 E2E_USER_PASSWORD 環境變數");
  }

  await page.goto("/login");
  await page.getByLabel(/電子郵件|email/i).fill(email);
  await page.getByLabel(/密碼|password/i).fill(password);
  await page.getByRole("button", { name: /登入|login/i }).click();
  await expect(page).toHaveURL("/");

  await page.context().storageState({ path: authFile });
});
