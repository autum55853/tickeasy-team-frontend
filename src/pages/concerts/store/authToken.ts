export function getAuthToken(): string {
  const authStorage = localStorage.getItem("auth-storage");
  if (authStorage) {
    try {
      const token = JSON.parse(authStorage).state?.token || "";
      if (!token) {
        console.warn("[getAuthToken] Token not found in auth-storage.state");
      }
      return token;
    } catch {
      console.warn("[getAuthToken] Failed to parse auth-storage");
      return "";
    }
  }
  console.warn("[getAuthToken] auth-storage not found in localStorage");
  return "";
}
