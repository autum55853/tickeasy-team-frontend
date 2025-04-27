import MobileTitle from "./mobileTitle";
import LastestCard from "./LastestCard";
import card1 from "@/assets/images/card1.jpg";
import card2 from "@/assets/images/card2.jpg";
import card3 from "@/assets/images/card3.jpg";
import LastestCarousel from "./LastestCarousel";
import bgBlock from "@/assets/images/lastestBlock.jpg";
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
    <section className="mt-24 min-h-[100px] bg-neutral-100 lg:bg-white">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="最新活動" subtitle="Latest Events" subClass="text-neutral-200" />
        <div className="mt-10 flex flex-col gap-4">
          <LastestCarousel cardList={data} />
        </div>
      </div>
      {/* 電腦板 */}
      <div className="relative hidden h-[100vh] lg:block">
        <div className="relative mx-auto w-fit text-center text-4xl font-bold select-none">
          <h2 className="relative z-20 bg-gradient-to-r from-[#2D6ED0] to-[#2BC6CC] bg-clip-text text-[48px] text-transparent">最新活動</h2>
          <span className={`absolute top-[50%] left-1/2 z-10 w-[400px] -translate-x-1/2 text-center text-[40px] text-nowrap text-neutral-100`}>
            Latest Events
          </span>
        </div>
        {/* 背景灰色區塊 */}
        <img
          src={bgBlock}
          alt="bgBlock"
          className="absolute top-0 left-1/2 z-0 h-full min-h-[1000px] min-w-[1200px] -translate-x-1/2 scale-x-[1.2] scale-y-[1.1] object-cover"
        />
        {/* cardContainer */}
        <div className="mx-auto mt-16 grid w-full max-w-[1600px] grid-cols-3 gap-4">
          {data.map((item) => (
            <LastestCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
