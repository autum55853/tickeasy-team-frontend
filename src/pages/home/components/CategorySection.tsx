import MobileTitle from "./mobileTitle";
import CategorySelect from "./CategorySelect";
import { CategoryOptions, MusicTag } from "../types/CategoryOptions";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/core/components/ui/button";
import CategoryTab from "./CategoryTab";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";
import { RawConertData } from "../types/RawConertData";
import { useRequest } from "@/core/hooks/useRequest";
import { useToast } from "@/core/hooks/useToast";

export default function CategorySection({ rawConcertList }: { rawConcertList: RawConertData[] }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [options, setOptions] = useState<CategoryOptions[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOptions | null>(null);

  // 取得 Music Tag 列表
  const {
    data: musicTagsData,
    error,
    refetch,
  } = useRequest<MusicTag[]>({
    queryKey: ["music-tags"],
    url: "/api/v1/concerts/music-tags",
  }).useGet();

  useEffect(() => {
    if (musicTagsData) {
      const covertOptions = musicTagsData
        .map((item) => {
          return {
            label: item.musicTagName,
            value: item.musicTagName,
            subLabel: item.subLabel,
          };
        })
        .filter(Boolean);
      setOptions(covertOptions);
      setSelectedCategory(covertOptions[0]);
    }
  }, [musicTagsData]);

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
  }, []);

  const covertCardList = useMemo(() => {
    if (!rawConcertList) {
      return [];
    }

    const data = [...rawConcertList];

    const mappedData = data.map((item) => {
      return {
        type: item.musicTagName,
        title: item.conTitle,
        image: item.imgBanner,
        chips: [item.musicTagName, item.venueName],
        link: `/concerts/${item.concertId}`,
      };
    });

    return mappedData;
  }, [rawConcertList]);

  const cardList = useMemo(() => {
    return covertCardList;
  }, [covertCardList]);

  const filteredCards = useMemo(() => {
    if (!selectedCategory || !cardList.length) return [];
    return cardList
      .filter((card) => {
        return card.type === selectedCategory.value;
      })
      .slice(0, 6);
  }, [selectedCategory, cardList]);

  return (
    <section className="mt-12 min-h-[80vh] lg:mt-20">
      <div className="mx-auto h-full lg:w-[96%]">
        <MobileTitle title="活動分類" subtitle="Event Categories" deskTopShow={true} />
        {/* 手機 select */}
        <div className="my-10 flex items-center justify-center lg:hidden">
          <CategorySelect options={options} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        {/* 電腦版 Tab */}
        <div className="my-8 hidden lg:block">
          <CategoryTab tabs={options} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        {/* card content */}
        <div className="mx-4 mb-8 grid max-w-[1400px] grid-cols-2 gap-4 lg:mt-4 lg:grid-cols-3 xl:mx-auto">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => <CategoryCard key={`${card.type}-${card.title}`} {...card} />)
          ) : (
            <div className="col-span-full text-center text-lg">目前沒有任何活動</div>
          )}
        </div>

        {/* 搜尋按鈕 */}
        <div className="flex items-center justify-center">
          <Button onClick={() => navigate("/concerts")} className="w-[90%] max-w-[800px] rounded-full text-lg" variant="outline">
            搜尋更多
          </Button>
        </div>
      </div>
    </section>
  );
}
