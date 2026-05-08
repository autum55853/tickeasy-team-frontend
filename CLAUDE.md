# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

Tickeasy 是演唱會購票系統前端，使用 React 19 + TypeScript + Vite 建構。三種角色：參與者（購票）、主辦方（建立/管理演唱會）、網站管理者。

## 常用指令

```bash
npm run dev        # 啟動開發伺服器 (預設 port 3000)
npm run build      # 型別檢查 + 建構生產版本
npm run lint       # ESLint 檢查
npm run format     # Prettier 格式化
npm run register-icons  # 重新掃描並註冊 Iconify 圖示
```

無測試框架，無單元測試指令。

## 環境變數

複製 `.env.example` 為 `.env.local`：

```
VITE_API_BASE_URL=   # 後端 API base URL
VITE_GOOGLE_CALLBACK= # Google OAuth callback URL
VITE_PORT=3000        # 可選，開發伺服器 port
```

## 路徑別名

`@` 對應 `src/`（於 `vite.config.ts` 設定）。

## 架構

### 入口流程

`main.tsx` → `App.tsx` → `QueryClientProvider` + `ModalStatusProvider` → `Boot`（`src/core/boot/index.tsx`）

`Boot` 使用 `useRouterMiddleWare` hook 處理：
- 換頁時自動 scroll to top
- 路由守衛：`needLogin: true` 的路由若未登入則導向 `/login`
- 未知路徑導向 `/404`

### 模組化路由系統

路由採模組自動聚合機制：

1. `src/pages/*/config.ts` — 每個頁面模組定義自己的路由，使用 `lazy()` 懶載入元件
2. `src/pages/index.ts` — 用 `import.meta.glob` 自動掃描所有 `config.ts`，合併為 `routes` 陣列
3. `src/core/routers/index.tsx` — 將 `routes` 匯出給 `Boot` 使用

新增頁面模組只需在 `src/pages/` 建立資料夾並加入 `config.ts`，路由系統會自動識別。

`RouteView` 型別定義於 `src/core/types/router.ts`，關鍵欄位：
- `needLogin: boolean` — 控制路由守衛
- `meta.title` — 頁面標題
- `children` — 子路由

### 頁面模組結構

每個模組位於 `src/pages/<module>/`，標準結構：

```
config.ts       # 路由定義（必須）
views/          # 頁面元件（必須）
components/     # 模組專用元件
hook/ 或 hooks/ # 模組專用自定義 Hooks
types/          # 模組型別定義
store/          # 模組 Zustand store（如需要）
schemas/ 或 schema/ # Zod 驗證 schema（如需要）
```

現有模組：
- `comm` — 登入、註冊、Google OAuth callback、FAQ、403、404
- `home` — 首頁
- `concerts` — 演唱會列表/搜尋、詳情、建立/編輯、購票、付款結果、QR Code 驗證
- `company` — 主辦方後台（公司資訊、演唱會販售統計）
- `user` — 會員中心（個人資料、訂票紀錄、修改密碼）

### 狀態管理

- **Zustand**（全域持久化狀態）：`src/store/authStore.ts` 管理登入狀態（`email`、`role`、`isLogin`），以 localStorage 持久化。Auth token 存於 cookie（`auth_token`）。
- **TanStack Query**（伺服器狀態）：透過 `useRequest` hook 封裝（見下方）。
- **React Context**（頁面流程狀態）：`src/context/` 存放跨元件但不需全域的狀態，例如購票流程（`buyTicketContext`）、搜尋篩選（`concertFilterContext`）。

### HTTP 請求

`src/core/lib/axios.ts` — 全域 Axios 實例，自動附加 Bearer token，401 時自動登出。

`src/core/hooks/useRequest.tsx` — 封裝 TanStack Query 的通用 CRUD hook：

```ts
const { useGet, useCreate, useUpdate, useDelete } = useRequest<T>({ queryKey, url });
```

直接呼叫 API 時請使用 `axiosInstance`，而非原生 `axios`。

### UI 元件

- **`src/core/components/ui/`** — shadcn/ui 風格元件（基於 Radix UI），含 button、dialog、input、pagination 等。
- **`src/core/components/global/`** — 全域佈局元件：header、footer、搜尋列、選單等。
- **`cn()` 函式**：`src/core/lib/utils.ts` 提供 `clsx` + `tailwind-merge` 的組合函式，所有元件合併 class 請使用此函式。

### 樣式

TailwindCSS 4（透過 `@tailwindcss/vite` plugin）。同時有 Styled Components 與 SASS，但主要使用 Tailwind。Stylelint 設定於 `stylelint.config.js`。

### 資料驗證

`src/schema/` 存放全域 Zod schema，各模組的 `schemas/` 存放模組專用 schema。慣例：

```ts
export const FooSchema = z.object({ ... });
export type T_FooSchema = z.infer<typeof FooSchema>;
```

表單搭配 `react-hook-form` + `@hookform/resolvers/zod`。

### 圖示

使用 Iconify（`@iconify/react`）。執行 `npm run register-icons` 重新掃描可用圖示。

## Git 分支命名

`feat/#<issue編號>/<功能名稱>` 或 `fix/#<issue編號>/<修正內容>`，PR 目標分支為 `dev`。
