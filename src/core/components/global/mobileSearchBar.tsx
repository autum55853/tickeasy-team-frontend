import { Icon } from "@iconify-icon/react";
export default function DesktopSearchBar({ searchText, setSearchText }: { searchText: string; setSearchText: (text: string) => void }) {
  const test = () => {
    if (searchText.trim() !== "") {
      console.log("5207");
    }
  };

  // 處理按下 Enter 鍵的事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      test();
    }
  };

  return (
    <div className="block h-16 w-full lg:hidden">
      <div className="mx-4 flex max-w-screen-sm items-center gap-x-2 rounded-md bg-white px-4 py-2 sm:mx-auto">
        <div className="flex-1">
          <input
            className="w-full text-xl focus:outline-none"
            placeholder="搜尋活動"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-md">
          <Icon onClick={test} icon="my-search" className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
}
