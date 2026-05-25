import MobileTitle from "./mobileTitle";
import { TrendCardProps } from "../types/TrendCard";
import { useRequest } from "@/core/hooks/useRequest";
import { useToast } from "@/core/hooks/useToast";
import { useState, useEffect, useRef } from "react";
import { TrendData } from "../types/TrendCard";
import TrendCard from "./TrendCard";
import LoadingSpin from "@/core/components/global/loadingSpin";
import EmptyState from "@/core/components/ui/emptyState";

export default function TrendSection() {
  const { toast } = useToast();
  const [trendCardData, setTrendCardData] = useState<TrendCardProps[]>([]);
  const cardsListRef = useRef<HTMLDivElement>(null);
  const [borderHeight, setBorderHeight] = useState<number | undefined>(undefined);
  // 取得 Trend 列表
  const { data, error, refetch, isLoading } = useRequest<TrendData[]>({
    queryKey: ["take=3"],
    url: "/api/v1/concerts/popular",
  }).useGet();

  useEffect(() => {
    if (Array.isArray(data)) {
      const covertData = data.map((item) => {
        return {
          title: item.conTitle,
          image: item.imgBanner ?? "",
          bgImage: item.imgBanner ?? "",
          description: item.conIntroduction ?? "",
          link: item.concertId,
        };
      });

      setTrendCardData(covertData);
    }
  }, [data]);

  // 處理錯誤
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: error.message || "發生錯誤，請稍後再試",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const el = cardsListRef.current;
    if (!el) return;
    const update = () => setBorderHeight(el.offsetHeight + 80);
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => observer.disconnect();
  }, [trendCardData]);
  return (
    <section className="relative my-24">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="熱門活動" subtitle="Trending Now" />
        {isLoading ? (
          <div className="mt-5">
            <LoadingSpin />
          </div>
        ) : trendCardData.length > 0 ? (
          <div className="mt-5 space-y-4">
            {trendCardData.map((card) => (
              <TrendCard key={card.title} {...card} />
            ))}
          </div>
        ) : (
          <EmptyState message="目前沒有熱門活動" className="mt-5" />
        )}
      </div>
      {/* 電腦板 */}

      <div className="relative w-fit text-4xl font-bold select-none 2xl:ml-[25%]">
        <h2 className="relative z-20 bg-gradient-to-r from-[#2D6ED0] to-[#2BC6CC] bg-clip-text text-[48px] text-transparent">熱門活動</h2>
        <span className={`absolute top-[20%] left-[calc(100%+1rem)] text-[40px] text-nowrap text-neutral-200`}>Trending Now</span>
      </div>
      <div className="hidden lg:block" style={{ height: borderHeight !== undefined ? `${Math.ceil(borderHeight / 1) + 20}px` : "100vh" }}>
        <div
          className="absolute top-[5rem] left-[25%] hidden w-[90%] rounded-2xl border-4 border-[#F0F0F0] 2xl:block"
          style={{ height: borderHeight !== undefined ? `${borderHeight}px` : "80%" }}
        >
          <div className="absolute left-[-30%]">
            {isLoading ? (
              <div className="mt-20">
                <LoadingSpin />
              </div>
            ) : trendCardData.length > 0 ? (
              <div ref={cardsListRef} className="mt-10 space-y-6">
                {trendCardData.map((card) => (
                  <TrendCard key={card.title} {...card} />
                ))}
              </div>
            ) : (
              <EmptyState message="目前沒有熱門活動" className="mt-20" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
