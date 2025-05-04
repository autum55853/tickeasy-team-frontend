import { Icon } from "@iconify/react";

export function GoogleButton() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const redirectUri = `${window.location.origin}/callback`;
  const googleAuthUrl = `${apiUrl}/api/v1/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;

  return (
    <div className="my-5">
      <a
        href={googleAuthUrl}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        <Icon icon="flat-color-icons:google" width="20" height="20" />
        <span>使用 Google 登入</span>
      </a>
    </div>
  );
}
