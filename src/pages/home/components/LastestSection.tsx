import MobileTitle from "./mobileTitle";
// import LastestCard from "./LastestCard";
import card1 from "@/assets/images/card1.jpg";
import card2 from "@/assets/images/card2.jpg";
import card3 from "@/assets/images/card3.jpg";
import LastestCarousel from "./LastestCarousel";
export default function LastestSection() {
  const data = [
    {
      idx: 0,
      id: "1",
      date: "2025/06/15",
      title: "五月天《回到未來》世界巡迴",
      image: card1,
      location: "台北小巨蛋",
      link: "/",
    },
    {
      idx: 1,
      id: "2",
      date: "2025/07/10",
      title: "周杰倫《嘉年華》巡迴演唱會",
      image: card2,
      location: "台北小巨蛋",
      link: "/",
    },
    {
      idx: 2,
      id: "3",
      date: "2025/08/17",
      title: "BTS (Beyond the Scene》世界巡迴",
      image: card3,
      location: "新北大都會公園",
      link: "/",
    },
    {
      idx: 3,
      id: "4",
      date: "2025/06/15",
      title: "五月天《回到未來》世界巡迴",
      image: card1,
      location: "台北小巨蛋",
      link: "/",
    },
    {
      idx: 4,
      id: "5",
      date: "2025/07/10",
      title: "周杰倫《嘉年華》巡迴演唱會",
      image: card2,
      location: "台北小巨蛋",
      link: "/",
    },
    {
      idx: 5,
      id: "6",
      date: "2025/08/17",
      title: "BTS (Beyond the Scene》世界巡迴",
      image: card3,
      location: "新北大都會公園",
      link: "/",
    },
  ];
  return (
    <section className="mt-24 min-h-[100px] bg-neutral-100">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="最新活動" subtitle="Latest Events" subClass="text-neutral-200" />
        <div className="mt-10 flex flex-col gap-4">
          <LastestCarousel cardList={data} />
          {/* {data.map((item) => (
            <LastestCard key={item.id} {...item} />
          ))} */}
        </div>
      </div>
      {/* 電腦板 */}
      <div className="hidden lg:block">
        <h2 className="text-4xl font-bold">最新活動</h2>
      </div>
    </section>
  );
}
