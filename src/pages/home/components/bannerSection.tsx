import Banner1 from "@/assets/images/banner1.jpg";
import Banner2 from "@/assets/images/banner2.jpg";
import Banner3 from "@/assets/images/banner3.jpg";
import HomeCarousel from "./Carousel";
export default function BannerSection() {
  // 前端要自己加上圖片索引 確保頁嵌更新一致
  const bannerList = [
    { id: 0, image: Banner1, title: "ONE OK ROCK《Luxury Disease》亞洲巡迴演唱會" },
    { id: 1, image: Banner2, title: "第二個活動標題" },
    { id: 2, image: Banner3, title: "第三個活動標題" },
  ];

  return (
    <section className="relative mx-0 w-full">
      <div className="relative mx-1 sm:mx-8">
        <HomeCarousel bannerList={bannerList} />
      </div>
    </section>
  );
}
