---
paths: []
---

# Git Commit 規則

Commit message 格式：`<type>: <描述>`（繁體中文或英文均可）

## type 類型

| type | 說明 |
|---|---|
| `feat` | 新功能 |
| `fix` | 修正 bug |
| `docs` | 文件變更 |
| `style` | 格式調整（不影響邏輯）|
| `refactor` | 重構（不新增功能也不修 bug）|
| `chore` | 建構/工具/設定變更 |
| `test` | 新增或修改測試 |

## 禁止 commit 的檔案

- `.env`、`.env.local`、`.env.*.local`
- `*.key`、`*.pem`、`*.p12`（憑證檔）
- `node_modules/`

## 分支命名

- 新功能：`feat/#<issue編號>/<功能名稱>`
- 修正：`fix/#<issue編號>/<修正內容>`
- PR 目標分支：`dev`
