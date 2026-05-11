# Changelog

## [Unreleased]

### Added
- 初始專案文件結構（ARCHITECTURE、DEVELOPMENT、FEATURES、TESTING）
- `.claude/` 下的 AI 輔助開發設定（rules、hooks、agents）
- 通用 `EmptyState` 元件（`src/core/components/ui/emptyState.tsx`）：Iconify 圖示 + 可自訂訊息，統一空資料視覺呈現

### Changed
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
