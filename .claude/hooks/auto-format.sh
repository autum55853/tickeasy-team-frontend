#!/bin/bash
# 自動格式化：編輯 TS/TSX/JS/JSX/CSS/JSON 後執行 prettier

TOOL_INPUT=$(cat)
FILE_PATH=$(echo "$TOOL_INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('file_path',''))" 2>/dev/null)

if [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx|json|css|scss|md)$ ]]; then
  cd "$(dirname "$0")/../.." || exit 0
  npx prettier --write "$FILE_PATH" --log-level silent 2>/dev/null || true
fi

exit 0
