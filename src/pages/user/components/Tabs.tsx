import { NavLink } from "react-router-dom";
import { useRequest } from "@/core/hooks/useRequest";
import { UserResponse } from "../types/porfile";

export default function Tabs() {
  const { data } = useRequest<UserResponse>({
    url: "/api/v1/users/profile",
    queryKey: ["userInfo"],
  }).useGet();

  const userData = data ? (Array.isArray(data) ? data[0] : data) : null;
  const isOAuthUser = (userData?.user?.oauthProviders?.length ?? 0) > 0;

  return (
    <>
      <nav className="fixed top-16 z-20 mb-8 flex w-full justify-center bg-white px-0 py-4 lg:relative lg:top-auto lg:left-auto lg:block lg:translate-x-0 lg:px-20">
        <ul className="flex w-full justify-center gap-8 lg:justify-start lg:px-40">
          <li>
            <NavLink to="profile" className={({ isActive }) => (isActive ? "text-primary font-bold" : "hover:text-primary")}>
              會員中心
            </NavLink>
          </li>
          <li>
            <NavLink to="history" className={({ isActive }) => (isActive ? "text-primary font-bold" : "hover:text-primary")}>
              演唱會及票券
            </NavLink>
          </li>
          <li>
            {isOAuthUser ? (
              <span className="cursor-not-allowed text-gray-400" title="使用第三方帳號登入的用戶無法修改密碼">
                修改密碼
              </span>
            ) : (
              <NavLink to="password" className={({ isActive }) => (isActive ? "text-primary font-bold" : "hover:text-primary")}>
                修改密碼
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
