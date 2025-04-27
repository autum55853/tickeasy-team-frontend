import Logo from "@/assets/images/logo.png";
import User from "@/assets/images/user.png";
import { Icon } from "@iconify-icon/react";
import { useState, useRef } from "react";
import DesktopSearchBar from "./deaktopSearchBar";
import MobileMenuList from "./mobileMenuList";
import DesktopMenuList from "./deaktopMenuList";
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [desktopSearchBlock, setDesktopSearchBlock] = useState(false);
  const [searchText, setSearchText] = useState("");
  const accountButtonRef = useRef<HTMLDivElement>(null);

  // 新增處理互斥狀態的函數
  const toggleMenu = (value: boolean) => {
    setMenu(value);
    if (value && desktopSearchBlock) {
      setDesktopSearchBlock(false);
    }
  };

  const toggleDesktopSearch = (value: boolean) => {
    setDesktopSearchBlock(value);
    if (value && menu) {
      setMenu(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-white select-none">
        {/* 電腦版 */}
        <div className="hidden h-20 py-2 lg:block">
          <div className="flex h-full items-center justify-around px-4 md:px-10 lg:px-12 xl:px-20">
            <div className="flex w-[200px] items-center gap-4">
              <p className="cursor-pointer rounded-sm p-2 transition-all hover:bg-neutral-100">查看票券</p>
              {isLogin && <p className="cursor-pointer rounded-sm p-2 transition-all hover:bg-neutral-100">探索頁面</p>}
            </div>
            <div className="w-[300px]">
              <img className="mx-auto" src={Logo} alt="Logo" draggable={false} />
            </div>
            <div className="flex w-[200px] items-center gap-6">
              <Icon onClick={() => toggleDesktopSearch(true)} icon="my-search" className="text-2xl" />
              {isLogin ? (
                <div
                  ref={accountButtonRef}
                  onClick={() => toggleMenu(!menu)}
                  className="flex cursor-pointer items-center gap-2 rounded-sm p-2 transition-all duration-300 hover:bg-neutral-100"
                >
                  <img src={User} alt="User" className="h-6 w-6 rounded-full" draggable={false} />
                  <p>帳號</p>
                  <Icon icon="my-chevron-down" className="text-[8px]" />
                </div>
              ) : (
                <>
                  <p className="cursor-pointer rounded-sm p-2 transition-all hover:bg-neutral-100">登入</p>
                  <p className="cursor-pointer rounded-sm p-2 transition-all hover:bg-neutral-100">註冊</p>
                </>
              )}
            </div>
          </div>
          <DesktopSearchBar
            desktopSearchBlock={desktopSearchBlock}
            setDesktopSearchBlock={toggleDesktopSearch}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <DesktopMenuList menuOpen={menu} accountButtonRef={accountButtonRef} />
        </div>

        {/* 手機版 */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between p-4">
            <img src={Logo} alt="Logo" />
            {menu ? (
              <Icon icon="my-close" className="text-4xl transition-all duration-300" onClick={() => toggleMenu(!menu)} />
            ) : (
              <Icon icon="my-menu" className="text-2xl transition-all duration-300" onClick={() => toggleMenu(!menu)} />
            )}
          </div>
          <MobileMenuList menuOpen={menu} isLogin={isLogin} searchText={searchText} setSearchText={setSearchText} />
        </div>
      </header>

      {/* <div className="fixed right-0 bottom-0 left-0 z-10 flex h-12 items-center justify-center bg-white">
        <div className="flex items-center gap-4">
          <p onClick={() => setIsLogin(!isLogin)}>{isLogin ? "登出" : "登入"}</p>
        </div>
      </div> */}
    </>
  );
}
