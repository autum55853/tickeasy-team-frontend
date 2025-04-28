import { Pagination } from "@/core/components/ui/pagination";
import { usePagination } from "@/core/hooks/usePagination";
import { useEffect, useState } from "react";

const TOTAL_ITEMS = 200; // 假設總共有N筆資料
const ITEMS_PER_PAGE = 10;

export default function PaginationDemo() {
  const { currentPage, totalPages, goToPage } = usePagination({
    totalItems: TOTAL_ITEMS,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const [items, setItems] = useState<string[]>([]);

  // 模擬取得目前頁面的資料
  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(start + ITEMS_PER_PAGE - 1, TOTAL_ITEMS);

    const pageItems = Array.from({ length: end - start + 1 }, (_, i) => `Item ${start + i}`);
    setItems(pageItems);
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center space-y-8 py-10">
      <h1 className="text-2xl font-bold">Pagination Demo</h1>

      {/* 渲染資料 */}
      <ul className="min-h-[400px] space-y-2">
        {items.map((item) => (
          <li key={item} className="text-lg">
            {item}
          </li>
        ))}
      </ul>

      {/* 分頁器 */}
      <div className="bg-card rounded-lg p-4 shadow-sm">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </div>
    </div>
  );
}
