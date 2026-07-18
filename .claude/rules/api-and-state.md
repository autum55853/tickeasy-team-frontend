---
paths:
  - "src/core/lib/**"
  - "src/core/hooks/**"
  - "src/store/**"
  - "src/pages/*/store/**"
  - "src/pages/*/hook/**"
  - "src/pages/*/hooks/**"
---

# API 請求與狀態管理規則

- 所有 API 呼叫使用 `axiosInstance`（`src/core/lib/axios.ts`），禁止直接 import 原生 `axios`（除非需要特殊 header 且有明確理由）
- 標準 CRUD 操作透過 `useRequest<T>({ queryKey, url })` 封裝的 hook 進行
- 非標準 API（如 submit、cancel）直接使用 `axiosInstance` 呼叫
- Zustand store 只存放需要跨頁面持久化或全域共享的狀態
- TanStack Query 的 `queryKey` 須具描述性且唯一，避免快取衝突
- 401 回應由 Axios 攔截器統一處理（自動登出），頁面層不需重複處理
