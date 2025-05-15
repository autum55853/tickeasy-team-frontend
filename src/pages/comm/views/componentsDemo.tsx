import { Pagination } from "@/core/components/ui/pagination";
import { usePagination } from "@/core/hooks/usePagination";
import { useEffect, useState } from "react";
import { useToast } from "@/core/hooks/useToast";
import { Button } from "@/core/components/ui/button";
import { Toaster } from "@/core/components/ui/toaster";
import { ConfirmDialog } from "@/core/components/global/confirmDialog";

const TOTAL_ITEMS = 200; // 假設總共有N筆資料
const ITEMS_PER_PAGE = 10;

export default function PaginationDemo() {
  const { currentPage, totalPages, goToPage } = usePagination({
    totalItems: TOTAL_ITEMS,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const { toast } = useToast();
  const [items, setItems] = useState<string[]>([]);

  // 模擬取得目前頁面的資料
  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(start + ITEMS_PER_PAGE - 1, TOTAL_ITEMS);

    const pageItems = Array.from({ length: end - start + 1 }, (_, i) => `Item ${start + i}`);
    setItems(pageItems);
  }, [currentPage]);

  const showToast = () => {
    toast({
      title: "Success!",
      description: "This is a toast notification",
      variant: "default",
    });
  };

  const showDestructiveToast = () => {
    toast({
      title: "Error!",
      description: "Something went wrong",
      variant: "destructive",
    });
  };

  const handleConfirm = () => {
    toast({
      title: "Confirmed!",
      description: "You confirmed the action",
      variant: "default",
    });
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-8 py-10">
        <h1 className="text-2xl font-bold">Components Demo</h1>

        {/* Toast Demo Section */}
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-xl font-semibold">Toast Demo</h2>
          <div className="flex space-x-4">
            <Button onClick={showToast}>Show Success Toast</Button>
            <Button onClick={showDestructiveToast} variant="destructive" className="text-white">
              Show Error Toast
            </Button>
          </div>
        </div>

        {/* Confirm Dialog Demo Section */}
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-xl font-semibold">Confirm Dialog Demo</h2>
          <ConfirmDialog
            title="Are you sure?"
            description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            trigger={<Button variant="default">Delete Account</Button>}
            confirmText="Yes, delete account"
            onConfirm={handleConfirm}
          />
        </div>

        {/* Pagination Demo Section */}
        <div className="mx-auto w-full max-w-md">
          <h2 className="mb-4 text-xl font-semibold">Pagination Demo</h2>
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
      </div>
      <Toaster />
      <Button>
        <a href="http://localhost:3000/api/v1/auth/google">使用 Google 登入</a>
      </Button>
    </>
  );
}
