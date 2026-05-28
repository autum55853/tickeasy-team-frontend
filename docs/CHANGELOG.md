# Changelog

## [Unreleased]

### Added
- 跨域登出同步：新增 `/auth/logout-broadcast` 頁面 + `AuthSyncProvider`，配合後台 iframe 方案實現前後台登出同步；不支援 BroadcastChannel 的 Safari 以 `StorageEvent` fallback
- 客服人工模式：AI bot 不可用時可切換人工客服，header 樣式改為黃色 Headphones；新增 `useCustomerServiceSSE` 透過 SSE 即時接收客服人員（Discord）回覆
- Google OAuth 用戶停用修改密碼：`Tabs.tsx` 隱藏密碼入口，`password.tsx` 加入 route guard 防誤操作
- 密碼規則即時提示：`usePasswordValidation` 逐條驗證（長度/大寫/數字），適用於註冊、重設密碼、修改密碼頁面
- 初始專案文件結構（ARCHITECTURE、DEVELOPMENT、FEATURES、TESTING）
- `.claude/` 下的 AI 輔助開發設定（rules、hooks、agents）
- 通用 `EmptyState` 元件（`src/core/components/ui/emptyState.tsx`）：Iconify 圖示 + 可自訂訊息，統一空資料視覺呈現

### Fixed
- `useLogout`：移除錯誤的 Dashboard 登出端點重導向（`/api/auth/logout?next=...` → 404）；前台登出改為直接 `navigate("/login")`，跨 Tab 通知保留 BroadcastChannel 廣播機制

### Changed
- 跨域登出同步改用 **Supabase Realtime Presence**：`LogoutBroadcastPage` 改呼叫 `ch.track({ event: "LOGOUT" })`，`AuthSyncProvider` 改監聽 `presence join` 事件；移除 `VITE_LOGOUT_BROADCAST_SECRET` 環境變數（前端 bundle 中的 secret 無安全意義），Channel 名稱統一為 `tickeasy-session-{email}`
- `ConcertDetailPage`：場次按鈕改以 `sellBeginDate` 判斷是否可購票（原為場次日期）；售票時間 1 小時內自動排程 `setTimeout` 解鎖按鈕，免刷新頁面

- `BannerSection`：API 回空陣列時改顯示靜態 Fallback 輪播（本地品牌圖片），載入中顯示 `LoadingSpin`；`bannerCarousel` 無 `concertId` 時隱藏報名按鈕
- `TrendSection`：區分 loading（`LoadingSpin`）與 empty（`EmptyState`）狀態，修正空陣列時誤顯示 loading 的 bug
- `VenueSection`：加入 loading/empty 狀態判斷，空陣列顯示 `EmptyState`
- `LatestSection`：空陣列時 early return 顯示 `EmptyState`，避免空白 grid
- `companyConcertSection`：Tab 切換後無資料顯示 `EmptyState`，隱藏分頁
- `TicketSalesTable`：票種空陣列時 table body 顯示 `EmptyState`
- `Footer`：背景定位由 `bg-bottom` 改為 `bg-center`，並改用 `flex items-center` 取代固定 padding-top，使左右區塊內容與背景圖片垂直置中對齊
- `Header`：「註冊」按鈕由 `<p>` 改為 `<button>`，加上藍綠漸層樣式（`from-[#2D6ED0] to-[#2BC6CC]`）
- `bannerCarouselItem`：移除底部圓角（`rounded-b-[60px]`），改為上方圓角
- `CategoryCard`：圓角改為 `rounded-2xl`，圖片高度固定（`h-[180px]` / `lg:h-[234px]`），chip 樣式改為 outline 風格
- `CategoryTab`：移除動態 `gridColsMap`，改用 `flex` 排列 tab，最大寬度改為 `max-w-[1076px]`
- `CategorySection`：最小高度由 `min-h-[80vh]` 調整為 `min-h-[30vh]`
- `LatestCard`：圖片高度改為固定 `h-[240px]`，移除直接導航邏輯，右下角按鈕改為愛心（收藏）圖示
- `LatestSection`：移除桌面版多餘 `mt-24`，桌面版容器改為 `w-[90%] rounded-3xl overflow-hidden`
- `TrendCard`：圖片區域寬度調整為 `w-[57.5%]`，「立刻訂票」按鈕寬度改為固定 `w-[200px]`
- `TrendSection`：裝飾 border div 高度由固定 `h-[1350px]` 改為 `min-h-[50vh]`
- `page`（首頁）：底部 padding 由 `pb-[400px]` 縮減為 `pb-[50px]`

## [0.1.0] - 2025-xx-xx

### Added
- 初始專案建立
- 參與者購票流程（演唱會列表 → 詳情 → 購票 → 付款）
- 主辦方後台（建立/編輯/提交審核演唱會）
- 會員中心（個人資料、訂票紀錄、修改密碼）
- Google OAuth 登入
- 客服 Widget（AI 輔助客服）
- QR Code 票券驗證
