# 跨域登出同步機制（BroadcastChannel）

**狀態：✅ 已完成（2026-05-26）**

## 需求

前台（tickeasy.com）與後台 Dashboard（dashboard.tickeasy.com）是不同網域，後台登出無法直接清除前台的 auth 狀態，造成用戶已在後台登出但前台仍顯示為已登入的問題。

## 解法

後台在登出時以隱藏 iframe 載入前台的 `/auth/logout-broadcast` 頁面，由前台頁面本身執行清除 auth 狀態並透過 `BroadcastChannel` 廣播 `LOGOUT` 事件，同域其他 tab 收到事件後也一併登出。

## 架構

```
後台 Dashboard 登出
  └─ 載入隱藏 iframe: /auth/logout-broadcast
        └─ 清除前台 cookie + Zustand auth state
        └─ 廣播 BroadcastChannel("tickeasy_auth") { type: "LOGOUT" }
              └─ 前台其他 tab（AuthSyncProvider 監聽）→ 自動登出並導向 /login
```

## 實作

- `src/pages/comm/views/logoutBroadcastPage.tsx`：接收 iframe 呼叫，清除 auth 狀態，廣播 LOGOUT，廣播完成後 `postMessage` 通知父 iframe（修正 timing 問題）
- `src/core/components/auth-sync-provider.tsx`：全域 Provider，監聽 `BroadcastChannel("tickeasy_auth")`，收到 LOGOUT 自動呼叫 `logout()` 並導向 `/login`；不支援 BroadcastChannel 的舊版 Safari 以 `StorageEvent` 做 fallback
- `src/App.tsx`：掛載 `<AuthSyncProvider />`
- `src/pages/comm/config.ts`：新增 `/auth/logout-broadcast` 路由（`needLogin: false`）

## 注意事項

- `logoutBroadcastPage` 必須在廣播**完成後**才 `postMessage` 通知後台，避免後台過早關閉 iframe 導致廣播未送出
- `BroadcastChannel` 僅在同源（same-origin）Tab 間有效；跨域由 iframe 方案銜接
