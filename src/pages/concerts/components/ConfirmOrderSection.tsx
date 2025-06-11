import { formatNumberToPrice } from "@/utils/formatToPrice";

export default function ConfirmOrderSection({ totalPrice }: { totalPrice: number }) {
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="relative flex h-[400px] flex-col justify-between rounded-lg border border-gray-300 p-8">
          <div className="absolute top-0 left-0 translate-x-1/4 -translate-y-1/2 bg-white px-2 text-2xl font-bold">請確認訂單內容</div>

          <div className="flex flex-col gap-3 text-start">
            <p>
              訂單編號: <span className="ml-4">250610165911-403B</span>
            </p>
            <p>
              演唱會名稱: <span className="ml-4">我們的歌 2025 Our Song 2025</span>
            </p>
            <p>
              票券類型: <span className="ml-4">一般票</span>
            </p>
            <p>
              總金額: <span className="ml-4">NT$ {formatNumberToPrice("zh-TW", totalPrice, 0)}</span>
            </p>
            <p>
              開始時間: <span className="ml-4">2025-08-15 18:00:00</span>
            </p>
            <p>
              結束時間: <span className="ml-4">2025-08-15 20:00:00</span>
            </p>
          </div>
          <div className="text-destructive flex gap-4">點擊立即付款後，將由綠界金流透過信用卡付款</div>
        </div>
      </div>
    </>
  );
}
