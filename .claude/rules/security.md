---
paths: []
---

# 安全性規則

- 任何 secret、token、API key 不得硬編碼在原始碼中，一律透過 `import.meta.env.VITE_*` 讀取
- Auth token 僅存於 cookie（`auth_token`），設定 `Secure` + `SameSite=Strict`，不存 localStorage
- 用戶輸入（表單、URL 參數）一律透過 Zod schema 驗證後再使用
- Axios 攔截器已統一處理 401（自動登出），頁面層不需額外處理 token 失效
- 不在前端儲存敏感資料（密碼、完整信用卡號等）
- XSS 防護：避免使用 `dangerouslySetInnerHTML`；使用 Lexical 顯示富文字內容時透過 `LexicalViewer` 元件
