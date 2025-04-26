import MobileTitle from "./mobileTitle";
export default function VenueSection() {
  return (
    <section className="lk min-h-[100px]">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="場館資訊" subtitle="Spotlight Venues" />
      </div>
      {/* 電腦板 */}
      <div className="hidden lg:block">
        <h2 className="text-4xl font-bold">場館資訊</h2>
      </div>
    </section>
  );
}
