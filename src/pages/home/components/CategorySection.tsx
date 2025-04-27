import MobileTitle from "./mobileTitle";
import CategorySelect from "./CategorySelect";
import { CategoryOptions } from "../types/CategoryOptions";
import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import CategoryTab from "./CategoryTab";
import { CategoryDemoApiData } from "./CategoryDemoApiData";
import { CategoryCardProps } from "../types/CategoryCard";
import CategoryCard from "./CategoryCard";
export default function CategorySection() {
  const options: CategoryOptions[] = [
    {
      label: "療癒系音樂",
      value: "A",
      subLabel: "Pop",
    },
    {
      label: "搖滾音樂",
      value: "B",
      subLabel: "Rock",
    },
    {
      label: "電子音樂",
      value: "C",
      subLabel: "Electronic",
    },
    {
      label: "嘻哈/饒舌",
      value: "D",
      subLabel: "Hip-Hop/Rap",
    },
    {
      label: "古典/交響樂",
      value: "E",
      subLabel: "Classical/Symphony",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState<CategoryOptions | null>(options[0]);

  // 模擬的資料
  const cardList: CategoryCardProps[] = [...CategoryDemoApiData()];

  // 根據選中的類別過濾卡片
  const filteredCards = cardList.filter((card) => card.type === selectedCategory?.value);
  console.log("filteredCards", filteredCards);

  return (
    <section className="mt-12 min-h-[100px] lg:mt-60">
      <div className="">
        <MobileTitle title="活動分類" subtitle="Event Categories" deskTopShow={true} />
        {/* 手機 select */}
        <div className="my-10 flex items-center justify-center lg:hidden">
          <CategorySelect options={options} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        {/* 電腦版 Tab */}
        <div className="mt-8 hidden lg:block">
          <CategoryTab tabs={options} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        {/* card content */}
        <div className="mx-4 mb-8 grid max-w-[1400px] grid-cols-2 gap-4 lg:mt-4 lg:grid-cols-3 xl:mx-auto">
          {filteredCards.map((card, index) => (
            <CategoryCard key={index} {...card} />
          ))}
        </div>

        {/* 搜尋按鈕 */}
        <div className="flex items-center justify-center">
          <Button className="w-[90%] max-w-[800px] rounded-full text-lg" variant="outline">
            搜尋更多
          </Button>
        </div>
      </div>
    </section>
  );
}
