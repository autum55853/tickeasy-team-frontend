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

## 專案結構

```
src/
├── assets/           # 應用程式資源
│   ├── icons/       # 圖示資源
│   └── images/      # 圖片資源
├── public/          # 靜態資源文件
│   ├── favicon/     # 網站圖示
│   ├── images/      # 靜態圖片
│   └── locales/     # 多語系檔案
├── core/            # 核心功能模組
│   ├── boot/       # 應用程式啟動相關
│   ├── components/ # 全域共用元件
│   │   ├── global/ # 一般共用元件
│   │   └── ui/     # UI 基礎元件
│   ├── hooks/      # 全域共用 Hooks
│   ├── lib/        # 工具函式庫
│   ├── routers/    # 路由配置
│   ├── styles/     # 全域樣式
│   └── types/      # TypeScript 類型定義
├── schema/         # Zod 資料驗證結構定義
│   └── example.ts # 資料驗證範本
└── pages/          # 頁面模組
    ├── comm/       # 共用頁面 (登入、404等)
    │   ├── types/  # 模組類型定義
    │   └── views/  # 頁面視圖
    └── home/       # 首頁模組
        ├── components/ # 模組專用元件
        ├── hooks/     # 模組專用 Hooks
        ├── types/     # 模組類型定義
        └── views/     # 頁面視圖
```

### 目錄說明

- **assets**: 應用程式內部使用的資源
  - **icons**: SVG 圖示等向量圖形
  - **images**: 應用程式內使用的圖片
- **public**: 靜態資源文件
  - **favicon**: 網站圖示相關檔案
  - **images**: 不需要經過打包的靜態圖片
- **core**: 核心功能模組
  - **boot**: 應用程式啟動與初始化相關
  - **components**: 全域共用元件
  - **hooks**: 全域共用的自定義 Hooks
  - **lib**: 工具函式與共用邏輯
  - **routers**: 路由配置與管理
  - **styles**: 全域樣式設定
  - **types**: TypeScript 類型定義
- **schema**: 使用 Zod 進行資料驗證的結構定義
  - 定義表單、API 請求/響應等資料的驗證規則
  - 自動生成 TypeScript 類型定義
  - 提供運行時的資料驗證
  - 集中管理所有資料結構的驗證邏輯
- **pages**: 頁面模組，每個子目錄代表一個功能模組
  - **comm**: 共用頁面模組 (如登入、404等)
  - **home**: 首頁模組
    - 每個模組可包含自己的 components、hooks、types 等

### 模組結構規範

每個功能模組應包含：

- `config.ts`: 模組配置文件，定義路由等設定
- `components/`: 模組專用元件
- `hooks/`: 模組專用的自定義 Hooks
- `types/`: 模組相關的類型定義
- `views/`: 實際的頁面元件

### 資料驗證規範

每個 schema 文件應包含：

- 基本的資料結構定義
- 必要的驗證規則（如長度限制、格式要求等）
- 對應的 TypeScript 類型導出
- 適當的錯誤提示信息

例如 `example.ts` 的結構：

```typescript
// 定義基本結構和驗證規則
const Schema = z.object({
  field: z.string().min(1, "錯誤提示"),
});

// 導出用於特定用途的變體
export const CreateSchema = Schema.omit({ id: true });

// 導出 TypeScript 類型
export type T_Schema = z.infer<typeof Schema>;
```
