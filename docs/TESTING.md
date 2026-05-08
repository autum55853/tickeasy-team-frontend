# 測試規範

## 技術棧

- **單元/整合測試**：Vitest 3 + React Testing Library 16 + MSW 2
- **E2E 測試**：Playwright 1.52

## 測試指令

```bash
npm run test               # 執行所有單元/整合測試（vitest run）
npm run test:watch         # 監聽模式（vitest）
npm run test:ui            # Vitest UI 介面
npm run test:coverage      # 覆蓋率報告（thresholds: 40%）
npm run test:e2e           # Playwright E2E（需先啟動 dev server）
npm run test:e2e:ui        # Playwright UI 模式
npm run test:e2e:report    # 查看 HTML 測試報告
```

## 目前覆蓋狀況

| 範圍 | 測試檔 | 測試數 |
|------|--------|--------|
| 工具函式 | `src/utils/__tests__/` | 19 |
| lib 工具 | `src/core/lib/__tests__/` | 15 |
| Hooks | `src/core/hooks/__tests__/` | 26 |
| Store | `src/store/__tests__/` | 5 |
| Concerts Store | `src/pages/concerts/store/__tests__/` | 9 |
| BuyTicket Context | `src/pages/concerts/hook/__tests__/` | 7 |
| **合計** | 11 個測試檔 | **81 個測試** |

## 架構設計

### vitest.config.ts 關鍵設定

- `pool: "forks"`：每個測試檔獨立 child process，防止 Zustand store 狀態洩漏
- `environment: "jsdom"` + `url: "https://localhost:3000"`：支援 `secure` cookie 測試
- `env.TZ: "UTC"`：確保 `formatTime` 時間格式確定性

### src/test/setup.ts

- 啟動/重設/關閉 MSW server
- 每個測試後清除 localStorage 與 cookie

### src/test/utils.tsx

提供 `renderWithProviders` 與 `renderHookWithProviders`，包含：
- `QueryClientProvider`（retry: false）
- `ModalStatusProvider`
- `MemoryRouter`

### src/test/mocks/

- `handlers.ts`：MSW handler（Auth、User、Concerts、Orders、Organizations、Location/Music Tags）
- `server.ts`：`setupServer(handlers)`

## 已修正的 Bug

`src/utils/formatTime.ts:5` — regex `/Z$|\\+00:00$/` 中 `\\+` 是「一個以上反斜線」，導致 `+00:00` 結尾的 UTC 時間無法識別，會被錯誤加 8 小時。已修正為 `/Z$|\+00:00$/`。

## E2E 測試

E2E 測試位於 `src/test/e2e/`，需要：

```bash
# 設定環境變數
E2E_USER_EMAIL=xxx@example.com
E2E_USER_PASSWORD=yourpassword

# 啟動 dev server 後執行
npm run test:e2e
```

| 測試檔 | 覆蓋場景 |
|--------|---------|
| `auth.setup.ts` | 全局登入，儲存 cookie 至 `.auth/user.json` |
| `routerGuard.spec.ts` | 未登入訪問受保護頁面 → `/login`；未知路徑 → `/404` |
| `login.spec.ts` | 登入成功 + cookie 驗證；錯誤密碼顯示錯誤訊息 |

## 覆蓋率門檻（逐步提升目標）

| 階段 | statements | branches | functions | lines |
|------|-----------|---------|-----------|-------|
| 初始（已達成） | 40% | 35% | 40% | 40% |
| 階段二 | 60% | 55% | 60% | 60% |
| 目標 | 80% | 75% | 80% | 80% |
