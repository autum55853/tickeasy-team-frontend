# 計畫：修正前台→Dashboard 跨分頁登出未同步

**狀態：✅ 已完成（2026-06-25）** — 功能實機驗證通過（Direction B 前台登出 → Dashboard 自動登出；Direction A 回歸正常）。`[logout-sync]` 診斷 log 已移除；單元測試同步至單例架構（124 全綠）。

## Context（為何要改）

使用者回報：前台分頁登出後，Dashboard 分頁沒有被登出（Direction B）。反向（Dashboard 登出→前台）正常。

加診斷 log 重現後，root cause 已定位（證據來自前台 console）：

```
FRONT receiver subscribe status = SUBSCRIBED      ← receiver 訂閱成功
SENDER 2s fallback timeout（subscribe 未完成）      ← sender 訂閱卡住，超時
```

**根因：** 前台 `supabase` 是單例 client（`src/lib/supabase.ts:6`）。`AuthSyncProvider`（receiver）已先用 topic `tickeasy-session-${email}` 訂閱成功。`logoutBroadcastPage`（sender）登出時又對**同一個 client、同一個 topic** 開「第二個」channel。Supabase Realtime 規則為「單 client 單 topic 只能一個 channel」，重複 join 會 hang → sender 永遠到不了 `SUBSCRIBED` → 2 秒 fallback timeout → `ch.send(LOGOUT)` 從未被呼叫 → Dashboard（跨 origin，靠 Supabase server 中轉）收不到。

Direction A 正常是因為 Dashboard 登出會 redirect 到前台 logout-broadcast 頁，兩分頁變同源，靠 `BroadcastChannel(tickeasy_auth)` 傳，根本沒用到 Supabase。

**目標：** 讓 sender 不再開重複 channel，改為重用 receiver 那個已 `SUBSCRIBED` 的單例 channel 來 `.send()`，使 LOGOUT 廣播真正送出。對齊 Dashboard 端既有的 `ensureLogoutChannel` 單例 pattern（`tickeasy-team-dashboard/lib/supabase/client.ts`）。

## 修改範圍（前台 tickeasy-team-frontend，3 檔）

### 1. 新增 `src/lib/logoutChannel.ts`（模組單例 channel）

- `ensureLogoutChannel(email, onLogout)`：模組層 singleton channel。email 改變則先 `removeChannel` 舊的再建新的；`.on("broadcast", { event: "LOGOUT" }, onLogout).subscribe()` 訂閱一次。回傳 channel。
- `sendLogout()`：重用同一個已訂閱 channel 呼叫 `channel.send(...)`。singleton 不存在則 no-op。

共用 `src/lib/supabase.ts` 單例 `supabase`。診斷 log 沿用 `[logout-sync]` 前綴。

### 2. `src/core/components/auth-sync-provider.tsx`（receiver）

自己 `supabase.channel(...).on(...).subscribe(...)` 段改為呼叫 `ensureLogoutChannel(email, performLogout)`。BroadcastChannel / storage fallback 不動。singleton 不在 unmount remove（對齊 dashboard 註解理由）。

### 3. `src/pages/comm/views/logoutBroadcastPage.tsx`（sender）

Supabase 廣播區塊（`supabase.channel`、`ch.subscribe`、2s fallback、`ch.send`、`removeChannel`）整段換成 `await sendLogout()`。其餘流程不動。

## 不在本次範圍

- Dashboard 端不改程式；但需驗證「登出當下 dashboard receiver 已 SUBSCRIBED」（email-race）。
- 診斷 `[logout-sync]` log 在實機驗證 root cause 後再以獨立 commit 移除。

## 驗證

1. `npm run build` + `npm run lint` 全綠。
2. 兩分頁（前台 + Dashboard，同帳號）。
3. Direction B：前台登出 → 前台 console `SENDER` 無 `2s fallback timeout`、成功 send；Dashboard console 出現 `DASH 收到 LOGOUT broadcast` 且自動登出。
4. Direction A 回歸：Dashboard 登出→前台仍正常登出。
5. Dashboard 沒收到時，查 dashboard console `DASH receiver subscribe status = SUBSCRIBED`。
