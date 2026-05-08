# 開發規範

## 命名規則

| 項目 | 規則 | 範例 |
|---|---|---|
| React 元件檔案 | PascalCase | `ConcertCard.tsx` |
| Hook 檔案 | camelCase，`use` 開頭 | `useConcertStore.ts` |
| Context 檔案 | camelCase，`Context` 結尾 | `buyTicketContext.tsx` |
| Store 檔案 | camelCase，`use` 開頭 | `useConcertStore.ts` |
| Schema 檔案 | camelCase | `loginSchema.ts` |
| Type 檔案 | PascalCase | `ConcertData.tsx` |
| 工具函式 | camelCase | `formatDate.ts` |
| React 元件 | PascalCase | `function ConcertCard()` |
| Zod Schema | `FooSchema` | `export const LoginSchema` |
| Zod 推導型別 | `T_FooSchema` | `export type T_LoginSchema` |
| Zustand Store hook | `useFooStore` | `export const useConcertStore` |

## 模組系統

路由採模組自動聚合：`src/pages/*/config.ts` 會被 `import.meta.glob` 自動掃描。

### 新增頁面模組步驟

1. 在 `src/pages/` 建立新資料夾，例如 `src/pages/admin/`
2. 建立 `config.ts`（必填）：

```ts
import { lazy } from "react";
export default {
  name: "管理員",
  views: [
    {
      path: "/admin/dashboard",
      component: lazy(() => import("./views/dashboardPage")),
      meta: { title: "管理員後台" },
      needLogin: true,
    },
  ],
};
```

3. 在 `views/` 建立對應元件
4. 路由系統自動識別，無需手動修改任何路由設定

### 新增 API 請求（簡單 CRUD）

使用 `useRequest` hook：

```ts
import { useRequest } from "@/core/hooks/useRequest";

const { useGet, useCreate } = useRequest<UserProfile>({
  queryKey: ["userProfile"],
  url: "/api/v1/users/profile",
});

// 在元件中
const { data, isLoading } = useGet();
const mutation = useCreate({
  onSuccess: () => toast({ title: "更新成功" }),
});
```

### 新增複雜 API（非標準 CRUD）

直接使用 `axiosInstance`：

```ts
import { axiosInstance } from "@/core/lib/axios";

const submitConcert = async (concertId: string) => {
  await axiosInstance.put(`/api/v1/concerts/${concertId}/submit`, {});
};
```

## Zod Schema 慣例

```ts
// src/schema/ 或 src/pages/<module>/schemas/
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("請輸入有效的 email"),
  password: z.string().min(8, "密碼至少 8 字元"),
});

export type T_LoginSchema = z.infer<typeof LoginSchema>;
```

搭配 react-hook-form：

```ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm<T_LoginSchema>({
  resolver: zodResolver(LoginSchema),
  defaultValues: { email: "", password: "" },
});
```

## 樣式規範

- 主要使用 **TailwindCSS 4**，透過 `@tailwindcss/vite` plugin 整合
- 合併 class 名稱一律使用 `cn()` 函式（`src/core/lib/utils.ts`）：

```ts
import { cn } from "@/core/lib/utils";

<div className={cn("base-class", isActive && "active-class", className)} />
```

- shadcn/ui 元件在 `src/core/components/ui/`，Radix UI 為底層
- Styled Components 僅用於已有的舊元件，新功能不引入

## 圖示使用

```tsx
import { Icon } from "@iconify/react";

<Icon icon="mdi:home" className="size-5" />
```

新增圖示後需執行 `npm run register-icons` 重新掃描。

## 環境變數

| 變數 | 用途 | 必要性 | 預設值 |
|---|---|:---:|---|
| `VITE_API_BASE_URL` | 後端 API base URL | 必要 | `http://localhost:3001` |
| `VITE_GOOGLE_CALLBACK` | Google OAuth callback URL | 必要 | — |
| `VITE_PORT` | 開發伺服器 port | 選填 | `3000` |

在前端使用：`import.meta.env.VITE_API_BASE_URL`

## 計畫歸檔流程

1. **計畫檔案命名格式**：`YYYY-MM-DD-<feature-name>.md`，存於 `docs/plans/`
2. **計畫文件結構**：

```markdown
# 功能名稱

## User Story
作為...，我想要...，以便...

## Spec
- 需求 1
- 需求 2

## Tasks
- [ ] 建立 API 呼叫
- [ ] 實作 UI 元件
- [ ] 寫測試
```

3. **功能完成後**：移至 `docs/plans/archive/`
4. **更新** `docs/FEATURES.md` 功能狀態為完成
5. **更新** `docs/CHANGELOG.md` 記錄變更

## Git 分支規範

| 類型 | 格式 | 範例 |
|---|---|---|
| 新功能 | `feat/#<issue編號>/<功能名稱>` | `feat/#42/concert-filter` |
| 修正 | `fix/#<issue編號>/<修正內容>` | `fix/#138/login-redirect` |

PR 目標分支：`dev`

## Commit Message 規範

格式：`<type>: <描述>`

| type | 說明 |
|---|---|
| `feat` | 新功能 |
| `fix` | 修正 bug |
| `docs` | 文件變更 |
| `style` | 格式調整（不影響邏輯）|
| `refactor` | 重構（不新增功能也不修 bug）|
| `chore` | 建構/工具/設定變更 |

範例：`feat: 新增演唱會搜尋篩選功能`
