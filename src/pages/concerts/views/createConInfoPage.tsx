import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import { Upload } from "lucide-react";
import LexicalEditor from "@/core/components/global/lexicalEditor";
import Header from "@/core/components/global/header";
import { Button } from "@/core/components/ui/button";
import { useConcertDraftStore } from "../store/useConcertDraftStore";
import { useNavigate } from "react-router-dom";

export default function CreateConInfoPage() {
  const { info, setInfo } = useConcertDraftStore();
  const navigate = useNavigate();

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
        <div className="flex h-[350px] w-[800px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          <Upload className="mb-4 h-12 w-12 text-blue-500" />
          <div className="mb-1 text-lg font-medium text-gray-700">上傳主視覺圖片</div>
          <div className="text-sm text-gray-500">(1080*540)4MB</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="space-y-8 p-8">
            {/* Event Info */}
            <div>
              <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-8">
                {/* 演唱會名稱 */}
                <div className="mb-2 flex-1 md:mb-0">
                  <label className="mb-1 block font-medium text-gray-700">
                    演唱會名稱<span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    className="w-full rounded border border-gray-300 p-2"
                    placeholder="請輸入演唱會名稱"
                    value={info.eventName}
                    onChange={(e) => setInfo({ eventName: e.target.value })}
                  />
                </div>
                {/* 演唱會時間 */}
                <div className="flex flex-1 items-center">
                  <div className="w-full">
                    <label className="mb-1 block font-medium text-gray-700">演唱會時間</label>
                    <div className="flex items-center gap-2">
                      <input
                        className="w-full rounded border border-gray-300 p-2"
                        placeholder="yyyy/mm/dd"
                        value={info.eventStartDate}
                        onChange={(e) => setInfo({ eventStartDate: e.target.value })}
                      />
                      <span className="text-gray-400">~</span>
                      <input
                        className="w-full rounded border border-gray-300 p-2"
                        placeholder="yyyy/mm/dd"
                        value={info.eventEndDate}
                        onChange={(e) => setInfo({ eventEndDate: e.target.value })}
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
                        value={info.eventDescription}
                        onChange={(e) => setInfo({ eventDescription: e.target.value })}
                      />
                    </div>
                    {/* 演唱會地點 */}
                    <div className="mb-4">
                      <label className="mb-1 block font-medium text-gray-700">演唱會地點</label>
                      <input
                        className="w-full rounded border border-gray-300 p-3"
                        placeholder="請選擇場地"
                        value={info.eventVenue}
                        onChange={(e) => setInfo({ eventVenue: e.target.value })}
                      />
                    </div>
                    {/* 詳細地址 */}
                    <div className="mb-4">
                      <label className="mb-1 block font-medium text-gray-700">詳細地址</label>
                      <input
                        className="w-full rounded border border-gray-300 p-3"
                        placeholder="請輸入地址"
                        value={info.eventAddress}
                        onChange={(e) => setInfo({ eventAddress: e.target.value })}
                      />
                    </div>
                    {/* 演唱會標籤 */}
                    <div className="mb-4 rounded-lg bg-gray-100 p-6">
                      <div className="mb-4 font-medium text-gray-800">演唱會標籤</div>
                      <div className="mb-4">
                        <label className="mb-1 block font-medium text-gray-700">地區</label>
                        <select className="w-full rounded border border-gray-300 p-3 text-gray-800">
                          <option>請選擇</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block font-medium text-gray-700">音樂類型</label>
                        <select className="w-full rounded border border-gray-300 p-3 text-gray-800">
                          <option>請選擇</option>
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
                initialContent={info.eventTicket}
                onChange={(val) => setInfo({ eventTicket: val })}
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
                initialContent={info.eventNotice}
                onChange={(val) => setInfo({ eventNotice: val })}
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
                initialContent={info.eventSuperNotice}
                onChange={(val) => setInfo({ eventSuperNotice: val })}
                placeholder="請輸入退票注意事項"
                className="min-h-[120px] rounded-lg border bg-white p-4 shadow"
              />
            </div>
            {/* 按鈕 */}
            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" className="rounded border-[#2986cc] bg-[#2986cc] text-white">
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
