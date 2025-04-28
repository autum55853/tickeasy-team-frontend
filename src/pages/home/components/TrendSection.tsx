import MobileTitle from "./mobileTitle";
import { TrendCardProps } from "../types/TrendCard";
import cardsm1 from "@/assets/images/card1-sm.jpg";
import cardsm2 from "@/assets/images/card2-sm.jpg";
import cardsm3 from "@/assets/images/card3-sm.jpg";
import card1 from "@/assets/images/card1.jpg";
import card2 from "@/assets/images/card2.jpg";
import card3 from "@/assets/images/card3.jpg";
import TrendCard from "./TrendCard";
export default function TrendSection() {
  const trendCardData: TrendCardProps[] = [
    {
      title: "Mayday 五月天《回到那一天》演唱會-高雄站",
      image: cardsm1,
      bgImage: card1,
      description:
        "五月天最新巡迴《回到那一天》，延續經典的青春旋律與跨世代的感動，在高雄國家體育場熱血開唱!除了重現〈OAOA〉、〈知足〉、〈倔強〉等待唱金曲，更以全景式舞台打造環繞式聽覺饗宴。",
      link: "/",
    },
    {
      title: "夜光森林.電子音樂祭 NightGlow Festival",
      image: cardsm2,
      bgImage: card2,
      description:
        "在森林裡開趴是一種怎樣的體驗？NightGlow Festival 將森林與電子音樂結合，打造全台最具特色的戶外派對！現場邀請來自日本、韓國、歐洲的知名DJ輪番上陣，加上夜間燈光藝術裝置與主题帳篷，提供沉浸式聲光享受。",
      link: "/",
    },
    {
      title: "蘇打綠 VIVO GREEN 演唱會-綠色永續場次",
      image: cardsm3,
      bgImage: card3,
      description:
        "蘇打綠全新企劃「VIVOGREEN」系列演唱會，以音樂喚起對地球環境的關注。此次特別規劃「綠色永續場次」，從舞台搭建、票券印刷到觀眾區飲食供應,皆採用環保理念執行。",
      link: "/",
    },
  ];
  return (
    <section className="relative mt-24 min-h-[100px]">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="熱門活動" subtitle="Trending Now" />
        <div className="mt-5 space-y-4">
          {trendCardData.map((card) => (
            <TrendCard key={card.title} {...card} />
          ))}
        </div>
      </div>
      {/* 電腦板 */}
      <div className="hidden min-h-[100vh] lg:block">
        <div className="relative mx-auto w-fit text-center text-4xl font-bold select-none">
          <h2 className="relative z-20 bg-gradient-to-r from-[#2D6ED0] to-[#2BC6CC] bg-clip-text text-[48px] text-transparent">熱門活動</h2>
          <span className={`absolute top-[20%] left-[calc(100%+2rem)] text-[40px] text-nowrap text-neutral-200`}>Trending Now</span>
        </div>
        <div className="mt-20 space-y-6">
          {trendCardData.map((card) => (
            <TrendCard key={card.title} {...card} />
          ))}
        </div>
        <div className="absolute top-20 left-[40%] -z-10 hidden h-[1350px] w-[90%] rounded-2xl border-4 2xl:block"></div>
      </div>
    </section>
  );
}
