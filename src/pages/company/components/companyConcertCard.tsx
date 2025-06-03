import { Button } from "@/core/components/ui/button";
import { Copy, Eye, FileCheck, Pencil, Trash2, Ban } from "lucide-react";

type ActionsType = "default" | "reviewed" | "rejected" | "none";

export default function CompanyConcertCard({ actionsType = "default" }: { actionsType?: ActionsType }) {
  return (
    <div className="mb-4 flex items-center border p-4">
      <div className="mr-6 flex h-24 w-24 flex-col items-center justify-center border">
        <span className="text-sm text-gray-700">上傳的圖片</span>
      </div>
      <div className="flex-1">
        <div className="text-xl font-semibold">夢幻之夜 Live Concert 2025</div>
        <div className="mt-2 text-sm text-gray-500">2025/08/15&nbsp;&nbsp;~&nbsp;&nbsp;2025/08/15</div>
      </div>
      {actionsType !== "none" && (
        <div className="mr-6 ml-6 flex items-center gap-7">
          <Button variant="ghost" className="flex flex-col items-center" size="icon">
            <Eye className="h-6 w-6" />
            <span className="mt-1 text-xs">預覽頁面</span>
          </Button>
          {actionsType === "default" && (
            <>
              <Button variant="ghost" className="flex flex-col items-center" size="icon">
                <FileCheck className="h-6 w-6" />
                <span className="mt-1 text-xs">送審</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center" size="icon">
                <Pencil className="h-6 w-6" />
                <span className="mt-1 text-xs">編輯</span>
              </Button>
            </>
          )}
          {actionsType === "rejected" && (
            <>
              <Button variant="ghost" className="flex flex-col items-center" size="icon">
                <FileCheck className="h-6 w-6" />
                <span className="mt-1 text-xs">送審</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center" size="icon">
                <Pencil className="h-6 w-6" />
                <span className="mt-1 text-xs">編輯</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center" size="icon">
                <Ban className="h-6 w-6" />
                <span className="mt-1 text-xs">查看退回理由</span>
              </Button>
            </>
          )}
          {actionsType !== "rejected" && actionsType !== "default" && (
            <Button variant="ghost" className="flex flex-col items-center" size="icon">
              <Copy className="h-6 w-6" />
              <span className="mt-1 text-xs">複製</span>
            </Button>
          )}
          <Button variant="ghost" className="flex flex-col items-center" size="icon">
            <Trash2 className="h-6 w-6" />
            <span className="mt-1 text-xs">刪除</span>
          </Button>
        </div>
      )}
    </div>
  );
}
