import { useEffect, useState, RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/core/hooks/useLogout";
export default function DesktopMenuList({ menuOpen, accountButtonRef }: { menuOpen: boolean; accountButtonRef: RefObject<HTMLDivElement | null> }) {
  const [position, setPosition] = useState({ top: -1000, right: 0 });
  const { handleLogout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const updatePosition = () => {
      if (accountButtonRef.current) {
        const rect = accountButtonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom,
          right: window.innerWidth - rect.right,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [accountButtonRef]);

  return (
    <div
      className={`fixed z-10 bg-white transition-opacity ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      style={{
        top: menuOpen ? `${position.top + 10}px` : "-1000px",
        right: `${position.right}px`,
      }}
    >
      <ul className="flex flex-col gap-3 overflow-hidden rounded-md bg-white py-2 shadow-sm">
        <li className="cursor-pointer px-12 py-2 hover:bg-neutral-100" onClick={() => navigate("/user")}>
          會員中心
        </li>
        <li className="cursor-pointer px-12 py-2 hover:bg-neutral-100" onClick={() => navigate("/user/history")}>
          查看參與的演唱會
        </li>
        <li className="cursor-pointer px-12 py-2 hover:bg-neutral-100" onClick={() => navigate("/user/password")}>
          修改密碼
        </li>
        <li className="cursor-pointer px-12 py-2 hover:bg-neutral-100" onClick={handleLogout}>
          登出
        </li>
      </ul>
    </div>
  );
}
