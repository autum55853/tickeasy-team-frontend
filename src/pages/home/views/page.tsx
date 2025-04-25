import Header from "@/core/components/global/header";
import BannerSection from "../components/bannerSection";
import TrendSection from "../components/TrendSection";
import LastestSection from "../components/LastestSection";
import CategorySection from "../components/CategorySection";
import VenueSection from "../components/VenueSection";
import Footer from "@/core/components/global/footer";
export default function Page() {
  return (
    <div className="mt-24 flex h-[calc(100vh-6rem)] flex-col">
      <Header />
      <main className="flex-grow">
        <BannerSection />
        {/* <TrendSection /> */}
        {/* <LastestSection /> */}
        {/* <CategorySection /> */}
        {/* <VenueSection /> */}
        <Footer />
      </main>
    </div>
  );
}
