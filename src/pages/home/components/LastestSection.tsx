import MobileTitle from "./mobileTitle";
export default function LastestSection() {
  return (
    <section className="lk min-h-[100px] bg-neutral-100">
      {/* 手機板 */}
      <div className="lg:hidden">
        <MobileTitle title="最新活動" subtitle="Latest Events" subClass="text-neutral-200" />
      </div>
      {/* 電腦板 */}
      <div className="hidden lg:block">
        <h2 className="text-4xl font-bold">最新活動</h2>
      </div>
    </section>
  );
}
