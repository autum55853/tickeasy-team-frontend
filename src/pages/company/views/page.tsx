import { Layout } from "@/pages/comm/views/layout";
import BannerSection from "../components/bannerSection";
import EmptyOrganizer from "../components/emptyOrganizer";
import CreateOrganizer from "../components/createOrangizer";
import { useCreateOrganizer } from "../hook/useCreateOrganizerContext";
import { CreateOrganizerProvider } from "../hook/CreateOrganizerProvider";

function PageContent() {
  const { isCreateOrganize } = useCreateOrganizer();
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-6rem)] flex-col">
        <BannerSection />
        <div className="grid grid-cols-1 gap-4">{isCreateOrganize ? <CreateOrganizer /> : <EmptyOrganizer />}</div>
      </div>
    </Layout>
  );
}
export default function Page() {
  return (
    <CreateOrganizerProvider>
      <PageContent />
    </CreateOrganizerProvider>
  );
}
