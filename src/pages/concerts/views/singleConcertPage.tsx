import React, { useRef } from "react";
import Header from "@/core/components/global/header";
import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import { Button } from "@/core/components/ui/button";
import { ArrowRight } from "lucide-react";
import "@/core/styles/singleConcertPage.css";

export default function SingleConcertPage() {
  const sessionsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  const tabOptions = [
    { label: "活動場次", ref: sessionsRef },
    { label: "簡介", ref: introRef },
    { label: "節目資訊", ref: infoRef },
    { label: "購票方式", ref: buyRef },
    { label: "注意事項", ref: noticeRef },
  ];
  const [selectedTab, setSelectedTab] = React.useState(tabOptions[0].label);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const idx = tabOptions.findIndex((opt) => opt.label === e.target.value);
    setSelectedTab(e.target.value);
    tabOptions[idx].ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Header />
      {/* 演唱會Banner */}
      <div className="concert-banner mx-auto mt-24 h-[700px] max-w-[95vw] rounded-[24px] bg-contain bg-center bg-no-repeat" />
      {/* 跳轉頁籤 */}
      {/* mobile 下拉選單 */}
      <div className="mx-auto my-6 block w-full max-w-[400px] md:hidden">
        <select className="w-full rounded border border-slate-200 bg-white p-2 text-lg" value={selectedTab} onChange={handleSelectChange}>
          {tabOptions.map((opt) => (
            <option key={opt.label} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {/* desktop tab bar */}
      <div className="mx-auto my-12 hidden min-h-[85px] w-full max-w-[1296px] items-center justify-around space-x-4 rounded-[6px] bg-slate-100 p-3 md:flex">
        {tabOptions.map((opt) => (
          <Button
            key={opt.label}
            onClick={() => {
              setSelectedTab(opt.label);
              opt.ref.current?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="concertPageTab"
          >
            {opt.label}
          </Button>
        ))}
      </div>
      {/* 簡介 */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div ref={introRef} className="scroll-mt-24">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">晴音りフレイン(そよ風メロウ)亞洲巡迴演唱會</h2>
            <p className="text-sm leading-relaxed text-gray-600">
              「そよ風メロウ」一路從獨自彈唱開始的音樂路程，今年度首場海外ライブ演唱會等活動開訂，將為台灣歌迷們帶來清新動人的演唱會體驗。本次定於11月27日在台北小巨蛋舉行首場個人海外演唱會，歡迎大家前來共度美好的音樂時光。會推薦使用者於本系統中完成訂票，建議利用語系顯示功能進行操作完畢。
            </p>
          </div>
        </div>
        <div ref={infoRef} className="scroll-mt-24">
          {/* 節目資訊 */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">節目資訊</h3>
            <div className="space-y-6 text-base text-gray-800">
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 font-semibold">演唱會地點：</span>
                  <span>台北小巨蛋</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold">演唱會場次：</span>
                  <span>2025年10月18日</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold">演唱會日期：</span>
                  <span>19:30</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold">入場時間：</span>
                  <span>18:00</span>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2 text-lg font-bold text-blue-700">票價區間</div>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="w-32 font-semibold">VIP搖滾區：</span>
                    <span>NT$3,880(含優先進場資格)</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-semibold">內場平面區：</span>
                    <span>NT$2,880</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 font-semibold">看台區：</span>
                    <span>NT$2,880/ NT$1,880</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex">
                  <span className="w-32 font-semibold">購票時間：</span>
                  <span>2025年8月15日12:00開放預購</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold">購票限制：</span>
                  <span>每人最多限購4張</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={buyRef} className="scroll-mt-24">
          {/* 購票方式 */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">購票方式</h3>
            <div className="space-y-6 text-base text-gray-800">
              <div>
                <div className="mb-1 text-lg font-bold text-blue-700">會員購票要求</div>
                <div>購票須完成手機號碼及電子郵件驗證，建議於「設定」中預填姓名與手機，以加速購票流程。</div>
              </div>
              <div>
                <div className="mb-1 text-lg font-bold text-blue-700">付款與取票方式</div>
                <div>
                  KKTIX 支援信用卡 3D 驗證，取票可選電子票或全家 <span className="font-mono">FamiPort</span>（手續費 $30/每筆 4 張）。
                </div>
              </div>
              <div>
                <div className="mb-1 text-lg font-bold text-blue-700">購票成功確認</div>
                <div>未收到訂單通知信不代表交易失敗，請至會員帳戶「訂單」查詢，未付款票券逾期將釋出。</div>
              </div>
              <div>
                <div className="mb-1 text-lg font-bold text-blue-700">FamiPort 現場購票</div>
                <div>無須會員，每筆限購 4 張，僅收現金，須於 10 分鐘內完成結帳取票，否則訂單取消。</div>
              </div>
              <div>
                <div className="mb-1 text-lg font-bold text-blue-700">身心障礙優惠票</div>
                <div>須提前完成身份認證，每人含陪同者最多購 2 張，入場須出示證明，未符合資格者不得入場。</div>
              </div>
            </div>
          </div>
        </div>
        <div ref={noticeRef} className="scroll-mt-24">
          {/* 注意事項 */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">注意事項</h3>
            <div className="space-y-2 text-base text-gray-800">
              <div className="flex">
                <span className="w-28 font-semibold">入場規範：</span>
                <span>請攜帶有效身份證件，憑票入場，電子票須於入口驗證。</span>
              </div>
              <div className="flex">
                <span className="w-28 font-semibold">禁止事項：</span>
                <span>現場禁止攜帶外食、酒精飲品、專業攝影器材。</span>
              </div>
              <div className="flex">
                <span className="w-28 font-semibold">年齡限制：</span>
                <span>12歲以下兒童不得入場，12-18歲需家長陪同。</span>
              </div>
              <div className="flex">
                <span className="w-28 font-semibold">退票規則：</span>
                <span>開演前7天內不可退票，需依照官方規則辦理退票申請。</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-2 text-lg font-bold text-blue-700">退票注意事項</div>
              <div className="space-y-2 text-base text-gray-800">
                <p>活動當天請憑電子票或本票入場，工作人員將進行驗票，未攜帶者不得入場。</p>
                <p>為維護演出品質，場內禁止使用閃光燈拍照、錄影或直播。</p>
                <p>若遇不可抗力因素(如天災、疫情、政府法規等)，主辦單位將保留延期或取消活動的權利，並依官方公告提供退票或更換場次的辦法。</p>
                <p>
                  若有票務相關問題，請聯繫官方客服中心(電子郵件：<span className="font-mono">support@example.com</span>，客服專線：0800-123-456)。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div ref={sessionsRef} className="flex scroll-mt-24">
          {/* 活動場次 */}
          <div
            className="mx-auto mt-8 w-full max-w-lg rounded-2xl border"
            style={{
              borderColor: "#2A7AC0",
              background: "#FFF",
            }}
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                {/* Calendar Icon */}
                <div className="text-gray-200">
                  <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                    <rect x="6" y="10" width="36" height="32" rx="6" fill="#F3F4F6" />
                    <rect x="6" y="10" width="36" height="32" rx="6" stroke="#E5E7EB" strokeWidth="2" />
                    <rect x="14" y="4" width="4" height="12" rx="2" fill="#E5E7EB" />
                    <rect x="30" y="4" width="4" height="12" rx="2" fill="#E5E7EB" />
                    <circle cx="16" cy="24" r="2" fill="#E5E7EB" />
                    <circle cx="24" cy="24" r="2" fill="#E5E7EB" />
                    <circle cx="32" cy="24" r="2" fill="#E5E7EB" />
                    <circle cx="16" cy="32" r="2" fill="#E5E7EB" />
                    <circle cx="24" cy="32" r="2" fill="#E5E7EB" />
                    <circle cx="32" cy="32" r="2" fill="#E5E7EB" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">2025/10/8 19:30</div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-blue-600">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="7" stroke="#2A7AC0" strokeWidth="2" />
                      <circle cx="8" cy="8" r="2" fill="#2A7AC0" />
                    </svg>
                    台北小巨蛋
                  </div>
                </div>
              </div>
              <Button variant="default" size="lg" className="flex items-center gap-2 rounded-full bg-[#2A7AC0] px-8 hover:bg-[#2563eb]">
                下一步 <ArrowRight className="ml-1" size={20} />
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
