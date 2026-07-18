# 最新活動（Latest Events）設計稿分析

**分析日期：** 2026-05-11  
**Figma 節點：** 4117:1336（Desktop Home）  
**對應元件：** `src/pages/home/components/LatestSection.tsx`

---

## 設計規格

### Section 標題
- 主標題「最新活動」：Primary/Gradient（`linear-gradient(90deg, #2D6ED0 4%, #2BC6CC 92%)`）
- 副標題「Latest Events」：Neutral/200，向右偏移（與主標題重疊/交叉排列）
- 標題整體置中

### 背景容器
- 背景色：Black/100（`#F0F0F0`）
- 底部圓角：`border-bottom-radius: 36px`

### 卡片 Grid
- 排列：2 行 × 3 欄（共 6 張）
- 卡片寬度：416px
- 卡片陰影：`box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05)`

### 單張卡片規格
| 元素 | 規格 |
|------|------|
| 圖片高度 | 240px，`object-cover` |
| 日期 | TC/Body02/Regular，16px，Neutral/400 |
| 活動名稱 | TC/Heading06/Bold，20px，Black/800 |
| 場地名稱 | TC/Body02/Regular，16px，Neutral/400，含地點圖示 |
| 收藏按鈕 | 右側愛心圖示，Neutral/400 |
| 卡片圓角 | `rounded-2xl`（16px） |
| 背景色 | White (#FFFFFF) |

---

## 現況 vs 設計稿差異

| 項目 | 設計稿 | 現況 | 需修改 |
|------|--------|------|--------|
| Grid 排列 | 2×3 | 待確認 | 待確認 |
| 卡片寬度 | 416px | 待確認 | 待確認 |
| 圖片高度 | 240px | 待確認 | 待確認 |
| 背景色 | `#F0F0F0` | 待確認 | 待確認 |
| 容器底圓角 | `36px` | 待確認 | 待確認 |
| 卡片陰影 | `0px 4px 4px rgba(0,0,0,0.05)` | 待確認 | 待確認 |

---

## 待深入比對

需讀取 `src/pages/home/components/LatestSection.tsx` 與相關卡片元件，逐一核對上述規格。
