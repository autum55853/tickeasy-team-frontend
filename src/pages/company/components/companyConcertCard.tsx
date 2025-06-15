import { Button } from "@/core/components/ui/button";
import { Copy, Eye, FileCheck, Pencil, Trash2, Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useConcertStore } from "@/pages/concerts/store/useConcertStore";
import type { ConInfoStatus } from "@/pages/concerts/store/useConcertStore";
import dayjs from "dayjs";
import { useToast } from "@/core/hooks/useToast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/core/components/ui/alertDialog";

interface CompanyConcertCardProps {
  concertId: string;
  conTitle: string;
  eventStartDate: string;
  eventEndDate: string;
  imgBanner?: string;
}

export default function CompanyConcertCard({ concertId, conTitle, eventStartDate, eventEndDate, imgBanner }: CompanyConcertCardProps) {
  const navigate = useNavigate();
  const clearConcertId = useConcertStore((state) => state.clearConcertId);
  const deleteConcert = useConcertStore((state) => state.deleteConcert);
  const organizationConcerts = useConcertStore((state) => state.organizationConcerts);
  const submitConcert = useConcertStore((state) => state.submitConcert);
  const cloneConcert = useConcertStore((state) => state.cloneConcert);
  const { toast } = useToast();

  const concert = organizationConcerts.find((c) => c.concertId === concertId);
  const conInfoStatus = concert?.conInfoStatus as ConInfoStatus | undefined;

  if (!conInfoStatus) {
    return null;
  }

  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY/MM/DD");
  };

  const handleEdit = () => {
    clearConcertId();
    navigate(`/concert/edit/${concertId}/info`);
  };

  const handleDelete = async () => {
    try {
      await deleteConcert(concertId);
      toast({
        title: "成功",
        description: "已成功刪除演唱會",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: "刪除演唱會時發生錯誤",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await submitConcert(concertId);
      toast({
        title: "成功",
        description: "已成功送審演唱會",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: "送審演唱會時發生錯誤",
      });
    }
  };

  const handleClone = async () => {
    try {
      await cloneConcert(concertId);
      toast({
        title: "成功",
        description: "已成功複製演唱會",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: "複製演唱會時發生錯誤",
      });
    }
  };

  return (
    <div className="mb-4 flex flex-col rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md 2xl:flex-row 2xl:items-center">
      {/* 圖片區域 */}
      <div className="mb-4 flex h-32 w-full flex-col items-center justify-center overflow-hidden rounded-lg border 2xl:mr-6 2xl:mb-0 2xl:h-24 2xl:w-24">
        {imgBanner ? (
          <img src={imgBanner} alt={conTitle} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm text-gray-700">上傳的圖片</span>
        )}
      </div>

      {/* 內容區域 */}
      <div className="flex flex-1 flex-col items-center justify-between gap-2 2xl:flex-row">
        <div className="flex-1">
          <div className="text-lg font-semibold text-gray-900 2xl:text-xl">{conTitle}</div>
          <div className="mt-1 text-sm text-gray-500">
            {formatDate(eventStartDate)}&nbsp;&nbsp;~&nbsp;&nbsp;{formatDate(eventEndDate)}
          </div>
        </div>

        {/* 按鈕區域 */}
        {conInfoStatus !== "reviewing" && (
          <div className="mt-4 flex flex-wrap items-center gap-3 2xl:mt-0 2xl:ml-6 2xl:gap-4">
            <Button variant="ghost" className="flex flex-col items-center p-2 hover:bg-gray-100" size="icon">
              <Eye className="h-5 w-5 text-gray-600" />
              <span className="mt-1 text-xs text-gray-600">預覽</span>
            </Button>

            {conInfoStatus === "draft" && (
              <>
                <Button variant="ghost" className="flex flex-col items-center p-2 hover:bg-gray-100" size="icon" onClick={handleSubmit}>
                  <FileCheck className="h-5 w-5 text-gray-600" />
                  <span className="mt-1 text-xs text-gray-600">送審</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center p-2 hover:bg-gray-100" size="icon" onClick={handleEdit}>
                  <Pencil className="h-5 w-5 text-gray-600" />
                  <span className="mt-1 text-xs text-gray-600">編輯</span>
                </Button>
              </>
            )}

            {conInfoStatus === "rejected" && (
              <>
                <Button variant="ghost" className="flex flex-col items-center p-2 hover:bg-gray-100" size="icon" onClick={handleSubmit}>
                  <FileCheck className="h-5 w-5 text-gray-600" />
                  <span className="mt-1 text-xs text-gray-600">送審</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center p-2 hover:bg-gray-100" size="icon" onClick={handleEdit}>
                  <Pencil className="h-5 w-5 text-gray-600" />
                  <span className="mt-1 text-xs text-gray-600">編輯</span>
                </Button>
                <Button variant="ghost" className="flex flex-col items-center p-2 hover:bg-gray-100" size="icon">
                  <Ban className="h-5 w-5 text-gray-600" />
                  <span className="mt-1 text-xs text-gray-600">退回理由</span>
                </Button>
              </>
            )}

            {(conInfoStatus === "draft" || conInfoStatus === "published" || conInfoStatus === "finished") && (
              <Button variant="ghost" className="flex flex-col items-center p-2 hover:bg-gray-100" size="icon" onClick={handleClone}>
                <Copy className="h-5 w-5 text-gray-600" />
                <span className="mt-1 text-xs text-gray-600">複製</span>
              </Button>
            )}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="flex flex-col items-center p-2 hover:bg-gray-100" size="icon">
                  <Trash2 className="h-5 w-5 text-gray-600" />
                  <span className="mt-1 text-xs text-gray-600">刪除</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>確定要刪除此演唱會嗎？</AlertDialogTitle>
                  <AlertDialogDescription>此操作無法復原，刪除後將無法再次查看或編輯此演唱會。</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>確定刪除</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}
