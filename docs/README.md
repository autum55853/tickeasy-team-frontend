# Tickeasy 前端

演唱會購票系統前端，支援三種角色操作：**參與者**（瀏覽與購票）、**主辦方**（建立/管理演唱會）、**網站管理者**。

## 技術棧

| 類型 | 技術 |
|---|---|
| 框架 | React 19 + TypeScript |
| 建構工具 | Vite 5 |
| 路由 | React Router DOM 7 |
| UI 元件 | shadcn/ui（Radix UI）|
| 樣式 | TailwindCSS 4 + Styled Components |
| 全域狀態 | Zustand 5（localStorage 持久化）|
| 伺服器狀態 | TanStack Query 5 |
| HTTP | Axios（自動附加 Bearer token）|
| 表單 | react-hook-form + Zod |
| 圖示 | Iconify |
| 富文字 | Lexical |

## 快速開始

```bash
# 1. 安裝依賴
npm install

# 2. 設定環境變數
cp .env.example .env.local
# 編輯 .env.local，填入後端 API URL 等設定

# 3. 啟動開發伺服器（預設 port 3000）
npm run dev
```

## 常用指令

| 指令 | 說明 |
|---|---|
| `npm run dev` | 啟動開發伺服器（port 3000）|
| `npm run build` | 型別檢查 + 建構生產版本 |
| `npm run lint` | ESLint 語法檢查 |
| `npm run format` | Prettier 格式化所有檔案 |
| `npm run register-icons` | 重新掃描並註冊 Iconify 圖示 |

## 環境變數

| 變數 | 說明 | 必要性 |
|---|---|---|
| `VITE_API_BASE_URL` | 後端 API base URL | 必要 |
| `VITE_GOOGLE_CALLBACK` | Google OAuth callback URL | 必要 |
| `VITE_PORT` | 開發伺服器 port | 選填（預設 3000）|

## 文件索引

| 文件 | 說明 |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 架構、目錄結構、資料流、路由總覽 |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | 開發規範、命名規則、新增模組流程 |
| [FEATURES.md](./FEATURES.md) | 功能清單與完成狀態 |
| [TESTING.md](./TESTING.md) | 測試規範與指南 |
| [CHANGELOG.md](./CHANGELOG.md) | 更新日誌 |
| [plans/](./plans/) | 進行中的開發計畫 |
| [plans/archive/](./plans/archive/) | 已完成計畫歸檔 |
