import { Button } from "@/core/components/ui/button";
import { useConcertStore } from "../store/useConcertStore";
import { useToast } from "@/core/hooks/useToast";

interface ConcertFormActionsProps {
  onSaveAndNext: () => void;
  isEditMode?: boolean;
}

export function ConcertFormActions({ onSaveAndNext, isEditMode = false }: ConcertFormActionsProps) {
  const { saveDraft, getConcert } = useConcertStore();
  const { toast } = useToast();

  const handleSaveDraft = async () => {
    try {
      const result = await saveDraft();
      if (result?.concertId) {
        await getConcert(result.concertId); // 重新抓最新資料
      }
      toast({
        title: "成功",
        description: "草稿儲存成功",
        variant: "default",
      });
    } catch (e) {
      console.error("草稿儲存失敗:", e);
      toast({
        title: "錯誤",
        description: "草稿儲存失敗",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-8 flex items-center justify-between">
      <Button variant="outline" className="rounded border-[#2986cc] bg-[#2986cc] text-white" onClick={handleSaveDraft}>
        {isEditMode ? "儲存變更" : "儲存草稿"}
      </Button>
      <Button variant="outline" className="rounded border border-black text-black" onClick={onSaveAndNext}>
        下一步
      </Button>
    </div>
  );
}
