import { NavLink } from "react-router-dom";

export default function Tabs() {
  return (
    <>
      <nav className="mb-8">
        <ul className="flex gap-6">
          <li>
            <NavLink to="/user/profile" className={({ isActive }) => (isActive ? "text-primary font-bold" : "hover:text-primary")}>
              會員中心
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/history" className={({ isActive }) => (isActive ? "text-primary font-bold" : "hover:text-primary")}>
              演唱會及票券
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/password" className={({ isActive }) => (isActive ? "text-primary font-bold" : "hover:text-primary")}>
              修改密碼
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
