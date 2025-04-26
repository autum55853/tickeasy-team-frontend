import MobileTitle from "./mobileTitle";
export default function CategorySection() {
  return (
    <section className="lk min-h-[100px]">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="活動分類" subtitle="Event Categories" />
      </div>
      {/* 電腦板 */}
      <div className="hidden lg:block">
        <h2 className="text-4xl font-bold">活動分類</h2>
      </div>
    </section>
  );
}
