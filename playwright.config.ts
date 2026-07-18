import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/test/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    // 全局登入 setup
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    // 需登入的測試（依賴 setup）
    {
      name: "chromium-authenticated",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "src/test/e2e/.auth/user.json",
      },
      dependencies: ["setup"],
      testMatch: /\.(spec)\.ts$/,
      testIgnore: /login\.spec|routerGuard\.spec/,
    },
    // 公開頁面測試（不需登入）
    {
      name: "chromium-public",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /login\.spec\.ts|routerGuard\.spec\.ts/,
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
