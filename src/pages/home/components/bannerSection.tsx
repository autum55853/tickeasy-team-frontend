import HomeCarousel from "./bannerCarousel";
import { useRequest } from "@/core/hooks/useRequest";
import { useToast } from "@/core/hooks/useToast";
import { useState, useEffect } from "react";
import { BannerData, BannerItem } from "../types/bannerSection";
import LoadingSpin from "@/core/components/global/loadingSpin";
import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.jpg";

const FALLBACK_BANNERS: BannerItem[] = [
  { id: 0, concertId: "", image: banner1, title: "Tickeasy 精彩活動即將登場", description: "" },
  { id: 1, concertId: "", image: banner2, title: "探索更多演唱會", description: "" },
  { id: 2, concertId: "", image: banner3, title: "敬請期待精彩節目", description: "" },
];

export default function BannerSection() {
  const { toast } = useToast();
  const [bannerList, setBannerList] = useState<BannerItem[]>([]);

  // 取得 Banner 列表
  const { data, error, refetch, isLoading } = useRequest<BannerData[]>({
    queryKey: ["concerts", "banners"],
    url: "/api/v1/concerts/banners",
  }).useGet();

  useEffect(() => {
    if (Array.isArray(data)) {
      const covertData = data.map((item, index) => {
        return {
          id: index,
          concertId: item.concertId,
          image: item.imgBanner,
          title: item.conTitle,
          description: item.conIntroduction,
        };
      });
      setBannerList(covertData);
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

  const displayList = bannerList.length > 0 ? bannerList : FALLBACK_BANNERS;

  return (
    <section className="relative mx-0 w-full">
      <div className="relative mx-1 sm:mx-8">
        {isLoading ? <LoadingSpin /> : <HomeCarousel bannerList={displayList} />}
      </div>
    </section>
  );
}
