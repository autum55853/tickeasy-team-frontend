import MobileTitle from "./mobileTitle";
import { TrendCardProps } from "../types/TrendCard";
import { useRequest } from "@/core/hooks/useRequest";
import { useToast } from "@/core/hooks/useToast";
import { useState, useEffect } from "react";
import { TrendData } from "../types/TrendCard";
import TrendCard from "./TrendCard";
import LoadingSpin from "@/core/components/global/loadingSpin";
import EmptyState from "@/core/components/ui/emptyState";

export default function TrendSection() {
  const { toast } = useToast();
  const [trendCardData, setTrendCardData] = useState<TrendCardProps[]>([]);
  // 取得 Trend 列表
  const { data, error, refetch, isLoading } = useRequest<TrendData[]>({
    queryKey: ["take=3"],
    url: "/api/v1/concerts/popular",
  }).useGet();

  useEffect(() => {
    if (Array.isArray(data)) {
      let covertData = data.map((item) => {
        return {
          title: item.conTitle,
          image: item.imgBanner ?? "",
          bgImage: item.imgBanner ?? "",
          description: item.conIntroduction ?? "",
          link: item.concertId,
        };
      });
      covertData = [
        {
          title: "《復古潮浪 Retro Beats 2025》90’s 嘻哈音樂派對",
          image:
            "https://xrsirihlrdtobbmgjcuv.supabase.co/storage/v1/object/public/concert/concerts/3a44ed48-8cef-4ecf-9e52-ae32650754ad/banner.webp",
          bgImage:
            "https://xrsirihlrdtobbmgjcuv.supabase.co/storage/v1/object/public/concert/concerts/3a44ed48-8cef-4ecf-9e52-ae32650754ad/banner.webp",
          description:
            "準備好回到 90 年代的街頭了嗎？\nRetro Beats 2025 將經典老派嘻哈與現代潮流音樂融合，邀請台灣本土與亞洲人氣嘻哈歌手，打造專屬於潮流迷的懷舊派對。\n除了精彩演出，現場更有 塗鴉牆、復古遊戲機、街舞快閃表演與服飾市集，讓你從視覺、聽覺到整體氛圍都沉浸在濃濃的復古街頭感中。",
          link: "3a44ed48-8cef-4ecf-9e52-ae32650754ad",
        },
        {
          title: "《復古潮浪 Retro Beats 2025》90’s 嘻哈音樂派對",
          image:
            "https://xrsirihlrdtobbmgjcuv.supabase.co/storage/v1/object/public/concert/concerts/3a44ed48-8cef-4ecf-9e52-ae32650754ad/banner.webp",
          bgImage:
            "https://xrsirihlrdtobbmgjcuv.supabase.co/storage/v1/object/public/concert/concerts/3a44ed48-8cef-4ecf-9e52-ae32650754ad/banner.webp",
          description:
            "準備好回到 90 年代的街頭了嗎？\nRetro Beats 2025 將經典老派嘻哈與現代潮流音樂融合，邀請台灣本土與亞洲人氣嘻哈歌手，打造專屬於潮流迷的懷舊派對。\n除了精彩演出，現場更有 塗鴉牆、復古遊戲機、街舞快閃表演與服飾市集，讓你從視覺、聽覺到整體氛圍都沉浸在濃濃的復古街頭感中。",
          link: "3a44ed48-8cef-4ecf-9e52-ae32650754ad",
        },
      ];
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
  return (
    <section className="relative my-24 h-[100%]">
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
      <div className="hidden min-h-[100vh] lg:block">
        <div className="absolute top-[10%] left-[25%] hidden h-[80%] w-[90%] rounded-2xl border-4 2xl:block">
          <div className="absolute top-[-15%] w-fit text-4xl font-bold select-none">
            <h2 className="relative z-20 bg-gradient-to-r from-[#2D6ED0] to-[#2BC6CC] bg-clip-text text-[48px] text-transparent">熱門活動</h2>
            <span className={`absolute top-[20%] left-[calc(100%+1rem)] text-[40px] text-nowrap text-neutral-200`}>Trending Now</span>
          </div>
          <div className="absolute left-[-30%]">
            {isLoading ? (
              <div className="mt-20">
                <LoadingSpin />
              </div>
            ) : trendCardData.length > 0 ? (
              <div className="mt-10 space-y-6">
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
