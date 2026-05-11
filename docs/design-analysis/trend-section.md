# 熱門活動（Trending Now）設計稿分析

**分析日期：** 2026-05-11  
**Figma 節點：** 4117:1336（Desktop Home）  
**對應元件：** `src/pages/home/components/TrendSection.tsx`、`TrendCard.tsx`

---

## 設計規格

### Section 標題
- 主標題「熱門活動」：Primary/Gradient（`linear-gradient(90deg, #2D6ED0 4%, #2BC6CC 92%)`），48px，Bold，`bg-clip-text`
- 副標題「Trending Now」：Neutral/200（`#E5E5E5`），40px，右側偏移顯示（非正式對齊）

### 裝飾邊框框
- `absolute`，`top: 80px`，`left: 20%`
- 尺寸約 `w-90% h-[1350px]`，`rounded-2xl`，`border-4`
- 僅 2xl 以上顯示

### 卡片規格（TrendCard）
- 卡片總尺寸：`1296 × 360px`
- 左側圖片：`746px` 寬，全高，`object-cover`，`rounded-l-2xl`
- 右側資訊：`526px` 寬，`rounded-r-2xl`

#### 右側資訊內容
| 元素 | 樣式 |
|------|------|
| 日期 | Neutral/400，TC/Body02/Regular，16px |
| 活動名稱 | Black/100，TC/Heading04/Bold，28px，最多 2 行 |
| 場地 | Neutral/400，TC/Body02/Regular，16px |
| 「立刻訂票」按鈕 | Outline 變體，Primary/Blue（`#2D6ED0`）邊框，圓角 80px，寬 200px |

---

## 現況 vs 設計稿差異

| 項目 | 設計稿 | 現況 | 需修改 |
|------|--------|------|--------|
| 卡片高度 | 360px（固定） | `h-[400px]` | ✅ 是 |
| 圖片寬度比例 | 746/(746+526) ≈ 58.6% | `w-1/2`（50%） | ✅ 是 |
| 資訊區寬度比例 | 526/(1296) ≈ 40.6% | `w-1/2`（50%） | ✅ 是 |
| 按鈕圓角 | 80px | `rounded-full` | 視覺相近，可接受 |
| 按鈕寬度 | 200px | 未固定 | ✅ 是 |
| 按鈕邊框色 | Primary/Blue `#2D6ED0` | 待確認 | 待確認 |
| 卡片間距 | 待確認 | `space-y-6` | 待確認 |

---

## 修改建議

1. `TrendCard.tsx`：
   - 卡片高度改為 `h-[360px]`
   - 圖片寬度改為約 `w-[57.5%]`（746/1296）
   - 資訊區寬度改為 `flex-1`
   - 按鈕加上 `w-[200px]`
2. 確認按鈕邊框顏色是否為 `#2D6ED0`
