# Tickeasy Project

Tickeasy 是一個現代化的演唱會購票系統，旨在為用戶提供流暢、便捷的購票體驗。

## 專案概述

本系統提供以下核心功能：

### 用戶功能

- 🎫 票務查詢與購買
  - 多元支付方式 (信用卡)
  - 購票倒數計時器
- 🎭 演唱會活動資訊
  - 進階搜尋與篩選 (依名稱、日期、地點)
  - 活動收藏功能
- 👤 會員系統
  - OAuth 社群登入 (Google)
  - 個人資料管理
  - 購買記錄查詢
  - 退票申請功能
- 🔔 通知系統
  - 開賣提醒
  - Email 推播通知
- 📱 跨平台支援
  - 響應式網頁設計

### 主辦方功能

- 📊 活動管理
  - 活動資訊建立與編輯
  - 票種與價格設定
- 💼 訂單管理
  - 訂單狀態追蹤
  - 退票處理
  - 付款紀錄查詢
- 🎟️ 票務驗證
  - QR Code 電子票券
  - 現場驗票系統

這是一個使用現代前端技術棧構建的專案，基於 React + TypeScript + Vite。

## 技術棧

- **核心框架**: React 19
- **建構工具**: Vite 6
- **開發語言**: TypeScript 5.7
- **UI框架**:
  - shadcn/ui (基於 Radix UI 的組件庫)
  - Radix UI (無樣式、可訪問性組件)
- **樣式解決方案**:
  - TailwindCSS 4
  - Styled-components 6
  - SASS
- **狀態管理**: TanStack Query (React Query) 5
- **表單處理**: React Hook Form 7
- **路由管理**: React Router 7.5
- **資料驗證**: Zod
- **HTTP 客戶端**: Axios
- **工具庫**:
  - dayjs (日期處理)
  - clsx & tailwind-merge (類名合併)

## 程式碼品質工具

- ESLint 9 (程式碼檢查)
- Stylelint 16 (樣式檢查)
- Prettier (程式碼格式化)

## 開發指令

```bash
# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽生產建構
npm run preview

# 執行 ESLint 檢查
npm run lint

# 格式化程式碼
npm run format
```

## Git 開發流程

本專案採用 [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) 開發流程：

1. **從 `main` 建立分支**  
   為每個 issue 或功能建立專屬分支，命名格式建議為 `feat/#編號/功能名稱`、`fix/#編號/修正內容` 等。

2. **本地開發與提交**  
   在分支中完成開發，並適時使用 `git commit` 紀錄變更。

3. **發送 Pull Request**  
   開發完成後，發 PR 至 `main`，標題需清楚描述內容並關聯對應 Issue。

4. **Code Review**  
   由其他成員審查後進行修正或合併。

5. **合併與刪除**
