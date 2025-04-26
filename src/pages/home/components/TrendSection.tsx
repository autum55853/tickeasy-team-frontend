import MobileTitle from "./mobileTitle";

export default function TrendSection() {
  return (
    <section className="lk mt-24 min-h-[100px]">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="熱門活動" subtitle="Trending Now" />
      </div>
      {/* 電腦板 */}
      <div className="hidden lg:block">
        <h2 className="text-4xl font-bold">熱門活動</h2>
      </div>
    </section>
  );
}
