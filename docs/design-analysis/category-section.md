# 活動分類（Event Categories）設計稿分析

**分析日期：** 2026-05-11  
**Figma 節點：** 4117:1336（Desktop Home）  
**對應元件：** `src/pages/home/components/CategorySection.tsx`

---

## 設計規格

### Section 標題
- 主標題「活動分類」：Primary/Gradient（`linear-gradient(90deg, #2D6ED0 4%, #2BC6CC 92%)`）
- 副標題「Event Categories」：Neutral/200，右側偏移
- 整體置中對齊

### 分類 Tab 列
- 容器寬度：1076px
- 背景：Slate/100（`#F1F5F9`）
- 內距：12px
- 圓角：待確認
- Tab 數量：5 個分類

#### Tab 狀態
| 狀態 | 背景 | 文字色 |
|------|------|--------|
| Active | White (#FFFFFF)，陰影 | Black/800 |
| Inactive | 透明 | Neutral/400 |

### 卡片 Grid
- 排列：2 行 × 3 欄（共 6 張）
- 卡片寬度：416px

### 單張卡片規格
| 元素 | 規格 |
|------|------|
| 圖片高度 | 234px，`object-cover` |
| 分類標籤 | Primary/Blue（`#2D6ED0`）背景 pill，白色文字，TC/Body02/Regular |
| 活動名稱 | TC/Heading06/Regular，20px，Black/800 |
| 卡片圓角 | `rounded-2xl`（16px） |

---

## 現況 vs 設計稿差異

| 項目 | 設計稿 | 現況 | 需修改 |
|------|--------|------|--------|
| Tab 容器寬 | 1076px | 待確認 | 待確認 |
| Tab 背景色 | Slate/100 `#F1F5F9` | 待確認 | 待確認 |
| Active tab | White + 陰影 | 待確認 | 待確認 |
| 卡片圖片高 | 234px | 待確認 | 待確認 |
| 分類標籤 | Primary/Blue pill | 待確認 | 待確認 |
| 活動名稱字重 | Regular（非 Bold） | 待確認 | 待確認 |

---

## 待深入比對

需讀取 `src/pages/home/components/CategorySection.tsx` 與相關元件，逐一核對上述規格。
