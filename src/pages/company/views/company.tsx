import { Layout } from "@/pages/comm/views/layout";
import BannerSection from "../components/bannerSection";
import EmptyOrganizer from "../components/emptyOrganizer";
import CreateOrganizer from "../components/createOrangizer";
import { useCreateOrganizer } from "../hook/useCreateOrganizerContext";
import { CreateOrganizerProvider } from "../hook/CreateOrganizerProvider";
import ListOrganize from "../components/listOrganize";
import { useState, useEffect, useRef } from "react";
function PageContent() {
  const { isCreateOrganize } = useCreateOrganizer();
  const companyCount = useRef(4);
  const [pageStatus, setPageStatus] = useState<"list" | "empty">("");
  const renderContent = () => {
    if (isCreateOrganize) {
      return <CreateOrganizer />;
    }
    if (companyCount.current === 0) {
      return <EmptyOrganizer />;
    } else {
      return <ListOrganize />;
    }
  };
  useEffect(() => {
    if (companyCount.current === 0) {
      setPageStatus("empty");
    } else {
      setPageStatus("list");
    }
  }, [companyCount]);
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-6rem)] flex-col">
        <BannerSection companyCount={companyCount.current} />
        <div className="grid grid-cols-1 gap-4">{renderContent()}</div>
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
