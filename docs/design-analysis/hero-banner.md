# Hero Banner 設計稿分析

**分析日期：** 2026-05-11  
**Figma 節點：** 4117:1336（Desktop Home）  
**對應元件：** `src/pages/home/components/bannerSection.tsx`、`bannerCarouselItem.tsx`

---

## 設計規格

### 容器
- 全寬圖片背景
- 底部形狀：**矩形（無圓角）**
- 圖片遮罩：`rgba(0, 0, 0, 0.4)` 半透明黑色 overlay

### 內距
- `padding: 240px 272px 280px`

### 文字
| 元素 | 樣式 | 顏色 |
|------|------|------|
| 活動標題 | TC/Heading01/Bold，48px，行高 1.5 | White (#FFFFFF) |
| 活動副標 | TC/Heading04/Regular，28px，行高 1.5 | White (#FFFFFF) |

### CTA 按鈕
- 文字：「報名!」
- 位置：右下角
- 寬度：416px，圓角：16px
- 背景：Primary/Gradient（`linear-gradient(180deg, #2D6ED0 0%, #2BC6CC 100%)`）
- 文字：白色，TC/Heading04/Bold，28px

---

## 現況 vs 設計稿差異

| 項目 | 設計稿 | 現況 | 需修改 |
|------|--------|------|--------|
| 底部形狀 | 矩形（直角） | `rounded-b-[60px]`（大圓角） | ✅ 是 |
| CTA 按鈕 | 有「報名!」按鈕，右下角 416px | 無 | ✅ 是 |
| 標題位置 | padding 240px 頂部對齊 | `top-1/4` | ✅ 是 |
| 副標位置 | padding 底部對齊 | `bottom-1/3` | ✅ 是 |
| 遮罩 | `rgba(0,0,0,0.4)` | 待確認 | 待確認 |

---

## 修改建議

1. `bannerCarouselItem.tsx`：移除 `rounded-b-[60px]`
2. `bannerCarouselItem.tsx`：新增「報名!」CTA 按鈕（右下角，416px 寬，Primary/Gradient）
3. 調整標題 / 副標定位，對應設計稿 padding 值
