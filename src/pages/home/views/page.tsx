import Header from "@/core/components/global/header";
import BannerSection from "../components/bannerSection";
import TrendSection from "../components/TrendSection";
import LastestSection from "../components/LastestSection";
import CategorySection from "../components/CategorySection";
import VenueSection from "../components/VenueSection";

export default function Page() {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <Header />
      <main className="lk mt-24">
        <BannerSection />
        <TrendSection />
        <LastestSection />
        <CategorySection />
        <VenueSection />
      </main>
      <footer></footer>
    </div>
  );
}
