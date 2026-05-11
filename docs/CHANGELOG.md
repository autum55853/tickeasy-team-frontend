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

## [0.1.0] - 2025-xx-xx

### Added
- 初始專案建立
- 參與者購票流程（演唱會列表 → 詳情 → 購票 → 付款）
- 主辦方後台（建立/編輯/提交審核演唱會）
- 會員中心（個人資料、訂票紀錄、修改密碼）
- Google OAuth 登入
- 客服 Widget（AI 輔助客服）
- QR Code 票券驗證
