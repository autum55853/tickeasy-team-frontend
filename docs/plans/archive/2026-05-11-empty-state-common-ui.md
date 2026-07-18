# 計畫：建立通用 EmptyState UI 元件並套用至 API 空陣列回應

## Context

資料庫部分 Table 尚無資料，導致 API 回傳空陣列時，多個頁面出現空白區塊或錯誤行為（如 `TrendSection` 在空陣列時持續顯示 Loading spinner）。需建立一個統一的空狀態 UI 元件，並套用到所有 API 回傳空陣列的地方，提升使用者體驗。

---

## 一、建立 EmptyState 共用元件

**檔案**：`src/core/components/ui/emptyState.tsx`

- 使用 Iconify 圖示（`mdi:inbox-outline`）作為視覺提示
- Props：
  - `message?: string`（預設：`"目前沒有資料"`）
  - `subMessage?: string`（可選副標題）
  - `className?: string`（額外 class）
- 使用 `cn()` 合併 Tailwind class
- 置中排列，灰色色調，輕量簡潔

```tsx
import { Icon } from "@iconify/react";
import { cn } from "@/core/lib/utils";

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  className?: string;
}

export default function EmptyState({ message = "目前沒有資料", subMessage, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <Icon icon="mdi:inbox-outline" className="mb-4 h-16 w-16 text-neutral-300" />
      <p className="text-lg font-medium text-neutral-500">{message}</p>
      {subMessage && <p className="mt-1 text-sm text-neutral-400">{subMessage}</p>}
    </div>
  );
}
```

---

## 二、套用 EmptyState 的目標元件

### 1. `src/pages/home/components/BannerSection.tsx`（+ `bannerCarousel.tsx`）

**問題**：API 回傳空陣列時仍顯示 `<LoadingSpin />`（無法區分 loading 和 empty）；空陣列時 Carousel 無法渲染  
**決策**：Banner 是首頁視覺核心，空白會造成嚴重 layout 斷裂 → 使用靜態 Fallback 圖  
**修改**：
- `bannerSection.tsx`：加 `isLoading`；loading 顯示 `<LoadingSpin />`；空陣列時以 `FALLBACK_BANNERS`（本地 `banner1/2/3.jpg` + 靜態標題）傳入 `HomeCarousel`
- `bannerCarousel.tsx`：`activeConcertId` 為空時隱藏底部凹槽遮罩 + 報名按鈕（fallback 模式無跳轉目標）

### 2. `src/pages/home/components/TrendSection.tsx`

**問題**：空陣列時顯示 `<LoadingSpin />`（無法區分 loading 和 empty）  
**修改**：從 `useGet()` 解構出 `isLoading`；loading 期間顯示 `<LoadingSpin />`，資料載入完但空陣列時顯示 `<EmptyState message="目前沒有熱門活動" />`  
（手機版與電腦版均需修改）

### 2. `src/pages/home/components/VenueSection.tsx`

**問題**：`venueCardData` 為空時，手機版顯示空 Carousel，電腦版顯示空 div  
**修改**：從 `useGet()` 解構出 `isLoading`；資料載入完但 `venueCardData.length === 0` 時，section 整體顯示 `<EmptyState message="目前沒有場館資訊" />`

### 3. `src/pages/home/components/LatestSection.tsx`

**問題**：`data.length === 0` 時 grid 為空，手機版 Carousel 也為空  
**修改**：在元件開頭判斷 `data.length === 0`，整體顯示 `<EmptyState message="目前沒有最新活動" />`

### 4. `src/pages/company/components/companyConcertSection.tsx`

**問題**：切換 Tab 後若該狀態無演唱會，列表區域完全空白  
**修改**：在 `paginatedConcerts.map(...)` 前加入判斷，`currentTabConcerts.length === 0` 時顯示 `<EmptyState message="此分類尚無演唱會" />`（替換掉 map，同時隱藏分頁）

### 5. `src/pages/company/components/TicketSalesTable.tsx`

**問題**：`ticketTypes` 為空時 `<tbody>` 無任何列  
**修改**：在 `tbody` 內加入判斷，`ticketTypes.length === 0` 時渲染跨欄的 `<EmptyState message="尚無票種資料" />`

---

## 三、同步統一既有簡易文字空狀態（選擇性）

以下元件已有文字型空狀態，可替換為 `EmptyState` 元件讓視覺一致，但非必要：

- `src/pages/concerts/components/ConcertListSection.tsx`（"目前沒有任何活動"）
- `src/pages/home/components/CategorySection.tsx`（"目前沒有任何活動"）

**保留不改動**：
- `emptyOrganizer.tsx`、`emptyTicketRecord.tsx`（有專屬圖片，保留既有設計）

---

## 四、驗證方式

1. 啟動開發伺服器（`npm run dev`）
2. 確認各頁面在後端回傳空陣列時，各 section 顯示 `EmptyState` 元件而非空白或 Loading spinner
3. 確認 `TrendSection` 在真正載入中時仍顯示 `LoadingSpin`，載入完成且空陣列才顯示 `EmptyState`
4. `npm run build` 確認無型別錯誤
5. `npm run lint` 確認無 ESLint 警告
