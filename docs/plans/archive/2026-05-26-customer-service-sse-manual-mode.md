# 客服支援人工模式切換與 SSE 即時接收

**狀態：✅ 已完成（2026-05-26）**

## 需求

AI 客服（bot）無法處理複雜問題時，需要切換為人工客服（human agent）並讓用戶即時收到客服人員透過 Discord 回覆的訊息。

## 目標

1. AI 不可用時提示用戶切換人工客服
2. 人工模式切換後 header 樣式改變（視覺區分）
3. 透過 SSE 即時訂閱客服人員回覆，無需輪詢

## 實作

### 人工模式切換（useCustomerService）

- `src/core/hooks/useCustomerService.ts`：
  - 新增 `isManualMode` state（由 store 管理）
  - AI bot 健康檢查失敗時顯示切換提示
  - `switchToManual()` 切換後不再對 bot 發送訊息，也不寫入 session 快取
  - 開窗瞬間 `invalidate` 健康檢查 query，確保使用最新狀態（非 5 分鐘前快取）

### 人工模式 UI（CustomerServiceWidget / Chat）

- `src/core/components/customer-service/CustomerServiceWidget.tsx`：人工模式時 header 背景改為黃色，圖示換為 Headphones
- `src/core/components/customer-service/CustomerServiceChat.tsx`：區分 bot/agent/user 訊息樣式；人工模式下隱藏 AI 快速回覆選項

### SSE 訂閱（useCustomerServiceSSE）

- `src/core/hooks/useCustomerServiceSSE.ts`：新建 hook
  - Endpoint：`GET /api/v1/smart-reply/session/{sessionId}/stream`
  - 使用原生 `EventSource`（`withCredentials: true`）
  - 連線成功設 `connected: true`；收到訊息 parse JSON 後呼叫 `addMessage()`
  - 連線失敗設 `connected: false`；cleanup 時 `es.close()`
  - 僅在 `enabled && sessionId` 時建立連線

## 資料流

```
人工模式開啟
  └─ useCustomerServiceSSE 建立 EventSource
        └─ 後端 SSE stream 推送 agent 訊息
        └─ addMessage() 更新 Zustand store
        └─ CustomerServiceChat re-render 顯示新訊息
```

## API 規格

| 端點 | 方法 | 說明 |
|---|---|---|
| `/api/v1/smart-reply/session/{sessionId}/stream` | GET (SSE) | 訂閱人工客服訊息串流 |

Event payload 格式與 `Message` 型別一致（`senderType: 'agent' | 'bot' | 'user'`）。
