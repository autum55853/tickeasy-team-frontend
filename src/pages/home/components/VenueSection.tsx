import MobileTitle from "./mobileTitle";
import VenueCard from "./VenueCard";
import { VenueCardData } from "./VenueCardData";
import VenueCarousel from "./VenueCarousel";
export default function VenueSection() {
  console.log("VenueCardData", VenueCardData);

  return (
    <section className="mt-10 min-h-[100px]">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="場館資訊" subtitle="Spotlight Venues" />
        <div className="mt-10">
          <VenueCarousel cardList={VenueCardData} />
        </div>
      </div>
      {/* 電腦板 */}
      <div className="mt-20 hidden h-[60vh] min-h-[700px] lg:block">
        <div className="h-[360px] bg-neutral-100 pt-[100px]">
          <div className="mx-auto flex max-w-[1600px] gap-4">
            <div className="relative mx-4 h-fit w-fit min-w-[200px] text-center text-4xl font-bold select-none xl:min-w-[300px]">
              <h2 className="relative z-20 bg-gradient-to-r from-[#2D6ED0] to-[#2BC6CC] bg-clip-text text-[48px] text-transparent">場館資訊</h2>
              <span className={`absolute top-full -left-[0px] hidden text-[40px] text-nowrap text-neutral-200 xl:block`}>Spotlight Venues</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {VenueCardData.map((card) => (
                <VenueCard key={card.idx} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
