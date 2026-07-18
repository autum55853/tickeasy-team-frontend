#!/bin/bash
# 敏感檔案保護：阻止編輯 .env、金鑰等敏感檔案

TOOL_INPUT=$(cat)
FILE_PATH=$(echo "$TOOL_INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('file_path',''))" 2>/dev/null)

PROTECTED_PATTERNS=(
  ".env"
  ".env.local"
  ".env.production"
  ".env.*.local"
  "*.key"
  "*.pem"
  "*.p12"
  "*.pfx"
)

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern" ]] || [[ "$(basename "$FILE_PATH")" == $pattern ]]; then
    echo "BLOCKED: 禁止編輯敏感檔案 $FILE_PATH" >&2
    exit 1
  fi
done

exit 0
