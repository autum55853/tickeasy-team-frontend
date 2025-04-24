export default function DesktopSearchBar({ searchText, setSearchText }: { searchText: string; setSearchText: (text: string) => void }) {
  return (
    <div className="fixed top-20 left-0 z-10 hidden h-16 w-full bg-white sm:block">
      <div>我是電腦版收尋框</div>
      <input className="lk" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
    </div>
  );
}
