---
paths:
  - "src/pages/**"
  - "src/core/components/**"
  - "src/context/**"
---

# 前端開發規則

- 合併 Tailwind class 名稱一律使用 `cn()`（`src/core/lib/utils.ts`），不直接串接字串
- 新增 shadcn/ui 元件放在 `src/core/components/ui/`，全域佈局元件放 `src/core/components/global/`
- 頁面元件使用 `lazy()` 懶載入，在對應模組的 `config.ts` 中宣告
- 表單驗證使用 `react-hook-form` + `zodResolver`，schema 定義在模組的 `schemas/` 目錄
- Zod schema 命名：`FooSchema`；推導型別命名：`T_FooSchema`
- Context 只用於跨元件但不需全域的流程狀態（如購票流程），全域狀態使用 Zustand
- 不使用 `React.FC` 型別，改用一般函式宣告：`function MyComponent({ prop }: Props)`
- 圖示使用 Iconify，新增圖示後執行 `npm run register-icons`
