import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import { Upload } from "lucide-react";
import LexicalEditor from "@/core/components/global/lexicalEditor";
import Header from "@/core/components/global/header";
import { Button } from "@/core/components/ui/button";
import { useConcertDraftStore } from "../store/useConcertDraftStore";
import { useNavigate } from "react-router-dom";
import { SingleDatePicker } from "@/core/components/ui/singleDatePicker";
import dayjs from "dayjs";
import { useToast } from "@/core/hooks/useToast";
import { useSaveDraft } from "../hook/useSaveDraft";

export default function CreateConInfoPage() {
  const { info, setInfo } = useConcertDraftStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleSaveDraft } = useSaveDraft();

  const regions = ["北部", "南部", "東部", "中部", "離島", "海外"];
  const musicTypes = ["流行音樂", "搖滾", "電子音樂", "嘻哈", "爵士藍調", "古典音樂", "其他"];

  const handleFileChange = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      // 檢查檔案格式
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "錯誤",
          description: "只支援 JPEG、PNG、GIF 或 WebP 格式",
          variant: "destructive",
        });
        return;
      }

      // 檢查檔案大小 (1MB = 1024 * 1024 bytes)
      const maxSize = 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: "錯誤",
          description: "檔案大小不能超過 1MB",
          variant: "destructive",
        });
        return;
      }

      try {
        await useConcertDraftStore.getState().uploadImage(file, "CONCERT_BANNER");
        toast({
          title: "成功",
          description: "圖片上傳成功",
        });
      } catch (error) {
        toast({
          title: "錯誤",
          description: "圖片上傳失敗",
          variant: "destructive",
        });
        console.error(error);
      }
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif,image/webp";
    input.onchange = handleFileChange;
    input.click();
  };

  return (
    <>
      <Header />
      {/* Breadcrumb */}
      <div className="mt-24 w-full bg-[#f3f3f3] px-4 py-6">
        <h1 className="mx-auto max-w-7xl text-left text-2xl font-bold">舉辦演唱會</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-4">
        <nav className="flex items-center space-x-2 text-sm">
          <span className="font-medium text-blue-600">設定演唱會資料</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">基本資料</span>
        </nav>
      </div>

      {/* 上傳主視覺圖片 */}
      <div className="flex items-center justify-center py-4">
        <div
          className="flex h-[350px] w-[800px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
          onClick={handleUploadClick}
        >
          {info.imgBanner ? (
            <img src={info.imgBanner} alt="banner" className="h-full w-full rounded-lg object-cover" />
          ) : (
            <>
              <Upload className="mb-4 h-12 w-12 text-blue-500" />
              <div className="mb-1 text-lg font-medium text-gray-700">上傳主視覺圖片</div>
              <div className="text-sm text-gray-500">(1080*540) 1MB</div>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="space-y-8 p-8">
            {/* Event Info */}
            <div>
              <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-8">
                {/* 演唱會名稱 */}
                <div className="mb-5 flex-1 md:mb-0">
                  <label className="mb-4 block font-medium text-gray-700">
                    演唱會名稱<span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="請輸入演唱會名稱"
                    value={info.conTitle}
                    onChange={(e) => setInfo({ conTitle: e.target.value })}
                  />
                </div>
                {/* 演唱會時間 */}
                <div className="flex flex-1 items-center">
                  <div className="w-full">
                    <label className="mb-4 block font-medium text-gray-700">演唱會時間</label>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <SingleDatePicker
                        date={info.eventStartDate ? new Date(info.eventStartDate) : null}
                        setDate={(date) => setInfo({ eventStartDate: date ? dayjs(date).format("YYYY/MM/DD") : "" })}
                        placeholder="請選擇開始日期"
                        inputClassName="w-full"
                        format="YYYY/MM/DD"
                      />
                      <span className="text-gray-400 md:mx-2">~</span>
                      <SingleDatePicker
                        date={info.eventEndDate ? new Date(info.eventEndDate) : null}
                        setDate={(date) => setInfo({ eventEndDate: date ? dayjs(date).format("YYYY/MM/DD") : "" })}
                        placeholder="請選擇結束日期"
                        inputClassName="w-full"
                        format="YYYY/MM/DD"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    {/* 簡介 */}
                    <div className="mb-4">
                      <label className="mb-1 block font-medium text-gray-700">
                        簡介 <span className="text-sm text-gray-400">上限3,000字</span>
                      </label>
                      <textarea
                        className="w-full rounded border border-gray-300 p-3"
                        rows={4}
                        maxLength={3000}
                        placeholder="請輸入演唱會簡介"
                        value={info.conIntroduction}
                        onChange={(e) => setInfo({ conIntroduction: e.target.value })}
                      />
                    </div>
                    {/* 演唱會地點 */}
                    <div className="mb-4">
                      <label className="mb-1 block font-medium text-gray-700">演唱會地點</label>
                      <input
                        className="w-full rounded border border-gray-300 p-3"
                        placeholder="請選擇場地"
                        value={info.conLocation}
                        onChange={(e) => setInfo({ conLocation: e.target.value })}
                      />
                    </div>
                    {/* 詳細地址 */}
                    <div className="mb-4">
                      <label className="mb-1 block font-medium text-gray-700">詳細地址</label>
                      <input
                        className="w-full rounded border border-gray-300 p-3"
                        placeholder="請輸入地址"
                        value={info.conAddress}
                        onChange={(e) => setInfo({ conAddress: e.target.value })}
                      />
                    </div>
                    {/* 演唱會標籤 */}
                    <div className="mb-4 rounded-lg bg-gray-100 p-6">
                      <div className="mb-4 font-medium text-gray-800">演唱會標籤</div>
                      <div className="mb-4">
                        <label className="mb-1 block font-medium text-gray-700">地區</label>
                        <select
                          className="w-full rounded border border-gray-300 p-3 text-gray-800"
                          value={info.locationTagId || ""}
                          onChange={(e) => setInfo({ locationTagId: e.target.value })}
                        >
                          <option value="">請選擇</option>
                          {regions.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">音樂類型</label>
                        <select
                          className="w-full rounded border border-gray-300 p-3 text-gray-800"
                          value={info.musicTagId || ""}
                          onChange={(e) => setInfo({ musicTagId: e.target.value })}
                        >
                          <option value="">請選擇</option>
                          {musicTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* 右側地圖 */}
                  <div>
                    <img src="https://fakeimg.pl/548x320/" alt="map" className="h-[320px] w-full rounded border object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* 購票方式 */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">購票方式</h3>
                <span className="text-sm text-gray-400">上限1,000字</span>
              </div>
              <LexicalEditor
                initialContent={info.ticketPurchaseMethod}
                onChange={(val) => setInfo({ ticketPurchaseMethod: JSON.stringify(val) })}
                placeholder="請輸入購票方式"
                className="min-h-[120px] rounded-lg border bg-white p-4 shadow"
              />
            </div>
            {/* 注意事項 */}
            <div>
              <div className="mt-8 mb-1 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">注意事項</h3>
                <span className="text-sm text-gray-400">上限2,000字</span>
              </div>
              <LexicalEditor
                initialContent={info.precautions}
                onChange={(val) => setInfo({ precautions: JSON.stringify(val) })}
                placeholder="請輸入注意事項"
                className="min-h-[120px] rounded-lg border bg-white p-4 shadow"
              />
            </div>
            {/* 退票注意事項 */}
            <div>
              <div className="mt-8 mb-1 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">退票注意事項</h3>
                <span className="text-sm text-gray-400">上限1,000字</span>
              </div>
              <LexicalEditor
                initialContent={info.refundPolicy}
                onChange={(val) => setInfo({ refundPolicy: JSON.stringify(val) })}
                placeholder="請輸入退票注意事項"
                className="min-h-[120px] rounded-lg border bg-white p-4 shadow"
              />
            </div>
            {/* 按鈕 */}
            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" className="rounded border-[#2986cc] bg-[#2986cc] text-white" onClick={handleSaveDraft}>
                儲存草稿
              </Button>
              <Button
                variant="outline"
                className="rounded border border-black text-black"
                onClick={() => navigate("/concert/create/sessions-and-tickets")}
              >
                下一步
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollTopBtn />
    </>
  );
}
