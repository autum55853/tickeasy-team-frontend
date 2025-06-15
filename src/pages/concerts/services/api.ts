export interface ParseResult {
  isValid: boolean;
  ticketId?: string;
}

/**
 * 簡易解析 QR Code 內容，判斷格式是否有效。
 * 目前只檢查字串是否為空；未來可依實際規格改寫。
 */
export const parseQrCode = (decodedText: string): ParseResult => {
  const trimmed = decodedText.trim();
  if (!trimmed) return { isValid: false };
  return { isValid: true, ticketId: trimmed };
};
