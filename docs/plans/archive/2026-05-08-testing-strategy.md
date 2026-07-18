# Tickeasy 前端測試策略計畫

## Context

專案目前零測試覆蓋（249 個 TS/TSX 檔案，無任何測試框架）。`docs/TESTING.md` 已建議採用 Vitest + React Testing Library + Playwright 的技術棧，本計畫以此為基礎，建立完整測試基礎設施並分階段撰寫測試，優先覆蓋購票流程、認證守衛、工具函式/Hooks、演唱會管理等四個業務場景。

**附帶發現**：`src/utils/formatTime.ts:5` 的 regex `/Z$|\\+00:00$/` 在 regex literal 中 `\\` 是字面反斜線，導致 `+00:00` 結尾的 UTC 時間無法被識別，會被再加 8 小時。測試時需覆蓋此 edge case 並修正。

---

## Phase 1：測試基礎設施（Setup）

### 套件安裝

```bash
npm install -D \
  vitest@3 @vitest/ui@3 @vitest/coverage-v8@3 jsdom@26 \
  @testing-library/react@16 @testing-library/user-event@14 \
  @testing-library/jest-dom@6 msw@2 \
  @playwright/test@1.52
```

### 新增檔案

| 檔案 | 說明 |
|------|------|
| `vitest.config.ts` | Vitest 設定（jsdom、@ alias、coverage v8、pool: forks） |
| `src/test/setup.ts` | MSW server 生命週期 + localStorage/cookie 清除 + 全域 mock |
| `src/test/utils.tsx` | `renderWithProviders`、`renderHookWithProviders`（包含 QueryClientProvider、ModalStatusProvider、MemoryRouter） |
| `src/test/mocks/handlers.ts` | MSW handler（Auth、User、Concerts、Orders、Organizations） |
| `src/test/mocks/server.ts` | `setupServer(handlers)` |
| `playwright.config.ts` | E2E 設定（baseURL 3000、storageState auth、webServer 自動啟動） |
| `src/test/e2e/auth.setup.ts` | 全局登入 setup，儲存 `.auth/user.json` |

### 修改檔案

`package.json` — 新增 scripts：
```json
"test": "vitest run",
"test:watch": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest run --coverage",
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui",
"test:e2e:report": "playwright show-report"
```

### vitest.config.ts 關鍵設定

```ts
test: {
  environment: "jsdom",
  globals: true,
  setupFiles: ["./src/test/setup.ts"],
  pool: "forks",          // Zustand 單例隔離
  environmentOptions: {
    jsdom: { url: "http://localhost:3000" }
  },
  coverage: {
    provider: "v8",
    reporter: ["text", "html", "lcov"],
    thresholds: { statements: 40, branches: 35, functions: 40, lines: 40 }
  }
}
```

> **為何 `pool: "forks"`**：Zustand store 是模組層級單例；`forks` 讓每個測試檔案在獨立 child process，防止 `authStore`/`useConcertStore` 跨測試洩漏。

---

## Phase 2：工具函式單元測試（純函式）

目標覆蓋率 90%+，最快驗收。

| 測試檔 | 關鍵案例 |
|--------|---------|
| `src/utils/__tests__/formatTime.test.ts` | Z 結尾 UTC、+00:00 結尾（驗證現有 bug）、非 UTC 加 8h、跨日邊界；需在 `vitest.config.ts` 設定 `process.env.TZ = 'UTC'` 確保結果確定性 |
| `src/utils/__tests__/formatToPrice.test.ts` | 千位分隔、小數、零值、負數、大數字 |
| `src/utils/__tests__/authUtils.test.ts` | 未登入 → false、user role → false、admin/superuser → true；window.open spy |
| `src/core/lib/__tests__/utils.test.ts` | cn() Tailwind merge、條件 class；generatePaginationRange 1 頁、gap=2 填入頁碼、兩側 ellipsis |

**formatTime 重要備注**：`/Z$|\\+00:00$/` 在 regex literal 中 `\\+` = 「一或多個反斜線」，非字面 `+`。測試應覆蓋 "+00:00" 格式並記錄行為；修正 regex 應改為 `/Z$|\+00:00$/`。

---

## Phase 3：Hooks 與 Store 單元測試

| 測試檔 | 關鍵案例 |
|--------|---------|
| `src/core/hooks/__tests__/useEmailValidation.test.ts` | 空字串合法、有效格式、無效格式錯誤訊息 |
| `src/core/hooks/__tests__/usePasswordValidation.test.ts` | 空密碼合法、純英文失敗、純數字失敗、英數混合通過、確認密碼不符、`checkPasswordFormat` 不改 password state |
| `src/core/hooks/__tests__/usePagination.test.ts` | totalPages 計算、goNext/goPrev 邊界、goToPage 超出 clamp |
| `src/store/__tests__/authStore.test.ts` | `setAuth` 設定狀態、`logout` 清除狀態 + cookie、`setCookie`/`getAuthToken` roundtrip；需 `beforeEach` 清 localStorage + cookie |
| `src/pages/concerts/store/__tests__/useConcertStore.test.ts` | `setInfo` 部分更新 + localStorage 同步、addSession/deleteSession、addTicket/deleteTicket、`getConcertStatusCounts`、API 方法（MSW mock） |

**注意**：`authStore` 的 `setCookie`/`removeCookie` 是模組層級 helper，不呼叫 Zustand `set`，直接操作 `document.cookie`。`setAuth` 只更新狀態，不自動設 cookie。

---

## Phase 4：API 層與 Context 整合測試

| 測試檔 | 關鍵案例 |
|--------|---------|
| `src/core/lib/__tests__/axios.test.ts` | 有 token 注入 Authorization header、401 觸發 logout + 拋出 "Token expired"、非 401 不觸發 logout |
| `src/pages/concerts/hook/__tests__/BuyTicketContext.test.tsx` | 初始狀態全欄位驗證失敗、有效 buyerInfo 通過、手機非 0 開頭失敗、手機非 10 碼失敗、email 無效只有 email 失敗、`setSelectedSession` 更新選中場次 |

---

## Phase 5：E2E 測試（Playwright）

測試檔位於 `src/test/e2e/`。

| 測試檔 | 覆蓋場景 |
|--------|---------|
| `auth.setup.ts` | 全局登入，儲存 cookie 至 `.auth/user.json` |
| `routerGuard.spec.ts`（public） | 未登入訪問 `/user/about/profile` → 導向 `/login`；未知路徑 → `/404` 頁面 |
| `login.spec.ts`（public） | 成功登入導向首頁 + auth_token cookie 已設定；錯誤密碼顯示錯誤訊息 |
| `buyTicket.spec.ts`（authenticated） | 步驟一選場次與票種 → 下一步啟用；步驟二空白直送 → 驗證錯誤；步驟三確認訂單畫面 |
| `concertCreate.spec.ts`（authenticated） | 主辦方建立演唱會基本資訊 → 場次 → 預覽頁面 |

`.gitignore` 新增：
```
/src/test/e2e/.auth/
/playwright-report/
/coverage/
```

---

## 目錄結構總覽

```
src/test/
├── setup.ts
├── utils.tsx
└── mocks/
    ├── handlers.ts
    └── server.ts

src/utils/__tests__/
src/core/lib/__tests__/
src/core/hooks/__tests__/
src/store/__tests__/
src/pages/concerts/store/__tests__/
src/pages/concerts/hook/__tests__/

src/test/e2e/
├── auth.setup.ts
├── login.spec.ts
├── routerGuard.spec.ts
├── buyTicket.spec.ts
├── concertCreate.spec.ts
└── .auth/           ← gitignore

playwright.config.ts
vitest.config.ts
```

---

## 驗收方式

1. `npm run test` — 全部單元/整合測試綠燈
2. `npm run test:coverage` — 覆蓋率達 statements 40%+ 初始門檻
3. `npm run test:e2e` — 需啟動開發伺服器（`npm run dev`）並設定 `E2E_USER_EMAIL`、`E2E_USER_PASSWORD` 環境變數
4. 確認 `formatTime` regex bug 測試案例有揭露問題，並同步修正 regex

## 後續（完成後）

- 將此計畫移至 `docs/plans/archive/`
- 更新 `docs/TESTING.md` 填入實際指令與覆蓋率數字
- 逐步提升 coverage threshold（40% → 60% → 80%）
