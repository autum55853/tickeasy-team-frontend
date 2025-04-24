import User from "@/assets/images/user.png";
import MobileSearchBar from "./mobileSearchBar";
export default function MenuList({
  menuOpen,
  isLogin,
  searchText,
  setSearchText,
}: {
  menuOpen: boolean;
  isLogin: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
}) {
  return (
    <div className="fixed top-0 left-0 h-16 w-full bg-white transition-all duration-300 ease-in-out">
      {/* 電腦版 */}
      <div className="hidden sm:block">
        <h1>Desktop MenuList</h1>
      </div>

      {/* 手機版 */}
      <div
        className={`fixed top-20 left-0 z-10 h-screen w-full transition-all duration-100 ease-in-out sm:hidden ${menuOpen ? "bg-[#eaf2f9] opacity-100" : "bg-white opacity-0"}`}
      >
        <nav className="p-4 text-xl">
          {isLogin ? (
            /* 已登入 */
            <ul className="flex flex-col space-y-4">
              <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">查看票券</li>
              <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">探索頁面</li>
              <li className="p-2">
                <div className="flex items-center gap-2">
                  <img src={User} alt="User" className="h-6 w-6" />
                  <span>帳號</span>
                </div>
                <ul className="mt-4 ml-8 flex flex-col space-y-4">
                  <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">會員中心</li>
                  <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">辦演唱會</li>
                  <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">查看參與的演唱會</li>
                  <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">登出</li>
                </ul>
              </li>
            </ul>
          ) : (
            /* 未登入 */
            <ul className="flex flex-col space-y-4">
              <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">探索頁面</li>
              <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">登入</li>
              <li className="cursor-pointer rounded-md p-2 hover:bg-blue-100">註冊</li>
            </ul>
          )}
        </nav>
        <MobileSearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>
    </div>
  );
}
