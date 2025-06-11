export function getAuthToken(): string {
  const authStorage = localStorage.getItem("auth-storage");
  if (authStorage) {
    try {
      const token = JSON.parse(authStorage).state?.token || "";
      if (!token) {
        console.warn("[getAuthToken] 在 auth-storage.state 中找不到 token");
      }
      return token;
    } catch {
      console.warn("[getAuthToken] 解析 auth-storage 失敗");
      return "";
    }
  }
  console.warn("[getAuthToken] 在 localStorage 中找不到 auth-storage");
  return "";
}

export function getOrganizationIdFromToken(): string {
  const token = getAuthToken();
  if (!token) return "";

  try {
    // JWT token 格式為：header.payload.signature
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.organizationId || "";
  } catch (error) {
    console.warn("[getOrganizationIdFromToken] 解碼 token 失敗:", error);
    return "";
  }
}
