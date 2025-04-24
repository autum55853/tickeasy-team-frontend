import Logo from "@/assets/images/logo.png";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import MenuList from "./menuList";
import DesktopSearchBar from "./deaktopSearchBar";
export default function Header() {
  const [menu, setMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <header className="fixed top-0 left-0 z-10 w-full bg-white">
        {/* 電腦版 */}
        <div className="hidden sm:block">
          <h1>Desktop Header</h1>
          <DesktopSearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>

        {/* 手機版 */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between p-4">
            <img src={Logo} alt="Logo" />
            {menu ? (
              <Icon icon="my-close" className="text-4xl transition-all duration-300" onClick={() => setMenu(!menu)} />
            ) : (
              <Icon icon="my-menu" className="text-2xl transition-all duration-300" onClick={() => setMenu(!menu)} />
            )}
          </div>
        </div>
      </header>
      <MenuList menuOpen={menu} isLogin={isLogin} searchText={searchText} setSearchText={setSearchText} />
    </>
  );
}
