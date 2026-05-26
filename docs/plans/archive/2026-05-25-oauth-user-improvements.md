# Google OAuth 用戶體驗改善

**狀態：✅ 已完成（2026-05-25）**

## 需求

Google OAuth 登入的用戶沒有設定密碼，但修改密碼功能對所有已登入用戶開放，導致 OAuth 用戶可進入密碼頁面並嘗試操作，造成混亂。同時密碼欄位缺乏即時驗證規則提示。

## 目標

1. OAuth 用戶隱藏「修改密碼」入口，並在頁面層加防護
2. 密碼欄位補上規則提示與更嚴謹的即時驗證邏輯

## 實作摘要

### Google OAuth 用戶停用修改密碼

- `src/pages/user/components/Tabs.tsx`：讀取 `authStore` 的 `loginType`，若為 `google` 則隱藏「修改密碼」Tab 連結
- `src/pages/user/views/password.tsx`：加入 route guard，若 `loginType === 'google'` 則 redirect 至 `/user/about/profile`

### 密碼驗證強化

- `src/core/hooks/usePasswordValidation.ts`：新增逐條規則驗證（長度 ≥ 8、含大寫、含數字），回傳 `rules[]` 供 UI 逐條顯示
- `src/pages/comm/views/components/resetPassword.tsx`：加入規則清單 UI
- `src/pages/comm/views/components/signupSection.tsx`：加入規則清單 UI
- `src/pages/user/components/PasswordInfo.tsx`：加入規則清單 UI
- `src/pages/user/schema/updatePassword.ts`：Zod schema 補上對應驗證條件

## 測試

- `src/core/hooks/__tests__/usePasswordValidation.test.ts`：修正測試中密碼長度不足的 case
