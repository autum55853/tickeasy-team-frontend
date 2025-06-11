import { Upload } from "lucide-react";
import { useImageUpload } from "../hook/useImageUpload";
import { Concert } from "@/pages/comm/types/Concert";
import { useConcertStore } from "../store/useConcertStore";
import { Button } from "@/core/components/ui/button";
import { useEffect } from "react";

interface BannerUploadSectionProps {
  imgBanner: Concert["imgBanner"];
}

export function BannerUploadSection({ imgBanner }: BannerUploadSectionProps) {
  const { triggerFileInput } = useImageUpload();
  const { setInfo, info, getConcert } = useConcertStore();

  // 當 concertId 存在時，重新獲取最新的演唱會資料
  useEffect(() => {
    console.log("[BannerUploadSection] useEffect 觸發，concertId:", info.concertId);
    if (info.concertId) {
      getConcert(info.concertId)
        .then(() => console.log("[BannerUploadSection] 重新獲取資料成功，新的 imgBanner:", info.imgBanner))
        .catch(console.error);
    }
  }, [info.concertId, getConcert]);

  console.log("[BannerUploadSection] 當前 props imgBanner:", imgBanner);
  console.log("[BannerUploadSection] 當前 store info.imgBanner:", info.imgBanner);

  const handleUploadClick = async () => {
    try {
      const url = await triggerFileInput("CONCERT_BANNER");
      console.log("上傳成功，URL:", url);
      if (url) {
        setInfo({ imgBanner: url });
        console.log("更新 store 後的狀態:", { ...info, imgBanner: url });
      }
    } catch (error) {
      console.error("上傳圖片失敗:", error);
    }
  };

  return (
    <div className="flex items-center justify-center py-4">
      <div
        className="flex h-[350px] w-[800px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
        onClick={handleUploadClick}
      >
        {imgBanner ? (
          <div className="relative h-full w-full">
            <img src={imgBanner} alt="banner" className="h-full w-full rounded-lg object-cover" />
            <Button
              type="button"
              variant="destructive"
              className="absolute top-1/2 left-1/2 rounded bg-white/80 px-3 py-1 text-sm text-red-600 shadow hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setInfo({ imgBanner: "" });
              }}
            >
              移除圖片
            </Button>
          </div>
        ) : (
          <>
            <Upload className="mb-4 h-12 w-12 text-blue-500" />
            <div className="mb-1 text-lg font-medium text-gray-700">上傳主視覺圖片</div>
            <div className="text-sm text-gray-500">(1080*540) 1MB</div>
          </>
        )}
      </div>
    </div>
  );
}
