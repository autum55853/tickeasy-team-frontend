# 2026-07-13 全端優化計畫（Frontend 部分）

> 來源：2026-07-13 全專案（backend / frontend / dashboard）優化審查。
> 本檔只列 frontend 項目；backend 與 dashboard 項目見各自 repo 的 `docs/plans/2026-07-13-optimization.md`。
> 完成後移至 `docs/plans/archive/`。

## 優先序總覽

| # | 項目 | 類別 | 嚴重度 | 狀態 |
|---|------|------|--------|------|
| 1 | 移除 package.json 自我依賴 | 維護 | 🟡 中 | ✅ 完成（cd6996a） |
| 2 | 更新 CLAUDE.md 過期的測試描述 | 維護 | 🟡 中 | ✅ 完成（5ead27f） |
| 3 | Vite 5 → 6/7 升級評估 | 維護 | 🟢 低 | 🔄 進行中（2026-07-18 於 worktree 試升） |

---

## 1. 移除自我依賴

- **問題**：`package.json` dependencies 內有 `"tickeasy-project": "file:"`——套件依賴自己，應為誤加（可能是某次 `npm i` 打錯）。會造成 node_modules 內出現自身 symlink，部分工具解析依賴樹時出錯。
- **做法**：刪除該行，`rm -rf node_modules package-lock.json && npm i` 重建 lock。
- **驗收**：`npm run build`、`npm run test` 過；`npm ls tickeasy-project` 無自我引用。

## 2. 更新 CLAUDE.md 測試描述

- **問題**：CLAUDE.md 寫「無測試框架，無單元測試指令」，但 `package.json` 已有完整 vitest（unit）+ playwright（e2e）與 coverage 指令。下個接手的 AI／協作者會被誤導，可能重複建測試框架或跳過跑測試。
- **做法**：CLAUDE.md「常用指令」補上 `npm run test`、`npm run test:e2e` 等；刪除「無測試框架」句。順手核對 docs/TESTING.md 是否同步。
- **驗收**：CLAUDE.md 描述與 `package.json` scripts 一致。

## 3. Vite 5 → 6/7 升級評估（選配）

- **問題**：`vite: ^5.1.4`，Vite 5 已非最新主線，後續安全修補集中在新版。非急迫。
- **做法**：另開分支試升，重點驗 `@tailwindcss/vite`、`vitest` 相容性與 `import.meta.glob` 路由聚合行為。
- **驗收**：`npm run build`、`npm run test`、`npm run test:e2e` 全綠；路由自動聚合（`src/pages/*/config.ts`）行為不變。

---

## 跨 repo 項目（記錄，暫緩）

- **跨域 token 走 URL query**：前端「後台管理」按鈕跳轉 dashboard 帶 `?token=<jwt>`，token 會留在日誌與瀏覽歷史。長期解法：改一次性短效 code 交換（backend 出端點、前端改跳轉、dashboard 改接收）。牽動三個 repo，另開計畫。

## 建議執行順序

1 → 2（皆為小改動，可同日完成）→ 3（選配，另開分支）

每項完成即跑 `npm run lint` + `npm run test`，全綠才進下一項。
