# 功能清單

## 認證

| 功能 | 狀態 | 路徑 |
|---|:---:|---|
| 一般登入（email + 密碼）| ✅ 完成 | `/login` |
| 一般註冊 | ✅ 完成 | `/signup` |
| Google OAuth 登入 | ✅ 完成 | `/callback` |
| 忘記密碼（Modal 流程）| ✅ 完成 | Modal（在 `/login` 觸發）|
| 自動登出（401 / 7 天到期）| ✅ 完成 | Axios 攔截器 |

### 忘記密碼流程

`ModalStatusContext` 管理整個流程的跨 Modal 狀態：
1. 使用者在登入頁點擊「忘記密碼」→ 開啟 Modal（`isModalForgotPasswordActive: true`）
2. 輸入 email → 後端寄送驗證碼
3. 輸入驗證碼 + 新密碼（`isResetPassword: true`）→ 完成重設

---

## 演唱會（參與者端）

| 功能 | 狀態 | 路徑 |
|---|:---:|---|
| 演唱會列表搜尋 | ✅ 完成 | `/concerts` |
| 演唱會詳情 | ✅ 完成 | `/concert/:concertId` |
| 購票流程 | ✅ 完成 | `/concert/buyTicket/:concertId` |
| 付款結果頁 | ✅ 完成 | `/concert/paymentResult` |

### 購票流程（BuyTicketContext）

`BuyTicketContext` 管理整個購票流程的狀態，跨多個步驟共享：

1. **選擇場次** → `setSelectedSession(sessionItem)`
2. **選擇票種/數量** → `setSelectedTickets(SelectedTicket[])`
3. **填寫購買人資訊** → `setBuyerInfo(BuyerInfo)` 含即時 Zod 驗證
4. **建立訂單** → API 回傳 `lockExpireTime` + `orderId`，存於 `newOrderInfo`
5. **付款** → 外部金流（`method` + `provider`）
6. **付款結果** → `/concert/paymentResult` 查詢結果

### 演唱會搜尋篩選

`ConcertFilterContext` 管理搜尋條件，包含：地點標籤、音樂標籤、日期範圍、關鍵字。

---

## 演唱會（主辦方端）

| 功能 | 狀態 | 路徑 |
|---|:---:|---|
| 建立演唱會（基本資料）| ✅ 完成 | `/concert/create/info` |
| 建立演唱會（場次/票種）| ✅ 完成 | `/concert/create/sessions-and-tickets` |
| 編輯演唱會 | ✅ 完成 | `/concert/edit/:concertId/info` 等 |
| 演唱會預覽 | ✅ 完成 | `/concert/preview/:concertId` |
| 送審演唱會 | ✅ 完成 | `PUT /api/v1/concerts/:concertId/submit` |
| 複製演唱會 | ✅ 完成 | `POST /api/v1/concerts/:concertId/duplicate` |
| 取消演唱會 | ✅ 完成 | `PATCH /api/v1/concerts/:concertId/cancel` |
| 演唱會販售統計 | ✅ 完成 | `/company/concert/status/:concertId` |
| QR Code 票券驗證 | ✅ 完成 | `/concert/verify-qrcode/:ticketId?` |

### 演唱會建立流程（useConcertStore）

`useConcertStore` 是核心 Zustand store，管理整個建立/編輯流程：

- **自動暫存**：`concertId` 存於 localStorage，頁面刷新後可繼續上次進度
- **草稿儲存**：`saveDraft()` 若有 `concertId` 則 PUT，否則 POST（自動識別建立/更新）
- **圖片上傳**：`uploadImage(file, context)` 支援 `USER_AVATAR`、`VENUE_PHOTO`、`CONCERT_SEATING_TABLE`、`CONCERT_BANNER`
- **必填僅 `conTitle`**：其他欄位均可選填，支援逐步填寫

### 演唱會審核機制

審核分兩種：
- `ai_auto` — AI 自動審核（含信心度、理由、建議）
- `manual_admin` — 人工審核

審核結果：`pending` → `approved` 或 `rejected`

---

## 主辦方後台

| 功能 | 狀態 | 路徑 |
|---|:---:|---|
| 公司列表（主辦方列表）| ✅ 完成 | `/company` |
| 公司詳情 | ✅ 完成 | `/companyDetail` |
| 演唱會販售統計 | ✅ 完成 | `/company/concert/status/:concertId` |

---

## 會員中心

| 功能 | 狀態 | 路徑 |
|---|:---:|---|
| 個人資料查看/編輯 | ✅ 完成 | `/user/about/profile` |
| 訂票紀錄 | ✅ 完成 | `/user/about/history` |
| 修改密碼 | ✅ 完成 | `/user/about/password` |

---

## 其他

| 功能 | 狀態 | 路徑 |
|---|:---:|---|
| 常見問題（FAQ）| ✅ 完成 | `/question` |
| 問題詳情 | ✅ 完成 | `/question/detail` |
| AI 客服 Widget | ✅ 完成 | 全域浮動（右下角）|
| 服務條款 / 隱私政策 | ✅ 完成 | Dialog 元件 |
| Google Map 嵌入 | ✅ 完成 | `googleMap.tsx` |
