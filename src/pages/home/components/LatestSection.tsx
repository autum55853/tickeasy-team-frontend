import MobileTitle from "./mobileTitle";
import LastestCard from "./LatestCard";
import LastestCarousel from "./LatestCarousel";
import bgBlock from "@/assets/images/lastestBlock.jpg";
import { RawConertData } from "../types/RawConertData";
import { useMemo } from "react";
import EmptyState from "@/core/components/ui/emptyState";
import LoadingSpin from "@/core/components/global/loadingSpin";

export default function LastestSection({ rawConcertList, isLoading }: { rawConcertList: RawConertData[]; isLoading: boolean }) {
  const data = useMemo(() => {
    const rawData = rawConcertList
      .sort((a, b) => {
        const dateA = new Date(a.eventStartDate);
        const dateB = new Date(b.eventStartDate);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 9); // 只取前9筆;
    return rawData.map((item, index) => {
      return {
        idx: index,
        id: item.concertId,
        date: `${item.eventStartDate} - ${item.eventEndDate}`,
        title: item.conTitle,
        image: item.imgBanner,
        location: item.conAddress,
        link: `/concerts/${item.concertId}`,
      };
    });
  }, [rawConcertList]);

  return (
    <section className="min-h-[100px] bg-neutral-100 lg:bg-white">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="最新活動" subtitle="Latest Events" subClass="text-neutral-200" />
        {isLoading ? (
          <div className="mt-10">
            <LoadingSpin />
          </div>
        ) : data.length === 0 ? (
          <EmptyState message="目前沒有最新活動" className="py-20" />
        ) : (
          <div className="mt-10 flex flex-col gap-4">
            <LastestCarousel cardList={data} />
          </div>
        )}
      </div>
      {/* 電腦板 */}
      <div className="relative mx-auto hidden h-full w-[90%] rounded-3xl lg:block lg:min-h-[400px] lg:overflow-hidden">
        <div className="relative text-center text-4xl font-bold select-none">
          <h2 className="relative z-20 bg-gradient-to-r from-[#2D6ED0] to-[#2BC6CC] bg-clip-text text-[48px] text-transparent">最新活動</h2>
          <span className={`absolute top-[50%] left-1/2 z-10 w-[400px] -translate-x-1/2 text-center text-[40px] text-nowrap text-neutral-100`}>
            Latest Events
          </span>
        </div>
        {/* 背景灰色區塊 */}
        <img
          src={bgBlock}
          alt="bgBlock"
          className="absolute top-0 left-1/2 z-0 h-full min-w-[1200px] -translate-x-1/2 scale-x-[1.2] scale-y-[1.1] object-cover lg:min-h-[1050px]"
        />
        {isLoading ? (
          <div className="relative z-10 mt-20">
            <LoadingSpin />
          </div>
        ) : data.length === 0 ? (
          <EmptyState message="目前沒有最新活動" className="relative z-10 py-20" />
        ) : (
          <div className="mx-auto mt-20 grid w-[96%] max-w-[1300px] grid-cols-1 gap-4 lg:grid-cols-3">
            {data.map((item) => (
              <LastestCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
