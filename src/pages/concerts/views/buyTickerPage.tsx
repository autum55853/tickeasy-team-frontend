import { Layout } from "@/pages/comm/views/layout";
import BuyTicketSection from "../components/BuyTicketSection";
import { BuyTicketProvider } from "../hook/BuyTicketContext";
export default function Page() {
  return (
    <Layout>
      <BuyTicketProvider>
        <div className="min-h-[calc(100vh-6rem)]">
          <BuyTicketSection />
        </div>
      </BuyTicketProvider>
    </Layout>
  );
}
