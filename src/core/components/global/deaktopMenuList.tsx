import { useEffect, useState, RefObject } from "react";

export default function DesktopMenuList({ menuOpen, accountButtonRef }: { menuOpen: boolean; accountButtonRef: RefObject<HTMLDivElement | null> }) {
  const [position, setPosition] = useState({ top: 0, right: 0 });

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
      className={`fixed z-10 bg-white transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
      style={{
        top: `${position.top + 10}px`,
        right: `${position.right}px`,
      }}
    >
      <ul className="flex flex-col gap-3 rounded-2xl px-12 py-4 shadow-sm">
        <li>會員中心</li>
        <li>辦演唱會</li>
        <li>查看參與的演唱會</li>
        <li>登出</li>
      </ul>
    </div>
  );
}
