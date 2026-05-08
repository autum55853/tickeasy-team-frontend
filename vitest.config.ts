import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    pool: "forks",
    exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**"],
    environmentOptions: {
      jsdom: { url: "https://localhost:3000" },
    },
    env: {
      TZ: "UTC",
      VITE_API_BASE_URL: "http://localhost:3001",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      thresholds: {
        statements: 40,
        branches: 35,
        functions: 40,
        lines: 40,
      },
    },
  },
});
