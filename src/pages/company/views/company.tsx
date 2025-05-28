import { Layout } from "@/pages/comm/views/layout";
import BannerSection from "../components/bannerSection";
import EmptyOrganizer from "../components/emptyOrganizer";
import CreateOrganizer from "../components/createOrangizer";
import { useCreateOrganizer } from "../hook/useCreateOrganizerContext";
import { CreateOrganizerProvider } from "../hook/CreateOrganizerProvider";
import ListOrganize from "../components/listOrganize";
import { useState, useEffect, useRef } from "react";
import { useRequest } from "@/core/hooks/useRequest";
import { useToast } from "@/core/hooks/useToast";
import { CompanyData } from "../types/company";

interface CompanyResponse {
  organizations: CompanyData[];
}

function PageContent() {
  const { toast } = useToast();
  const { isCreateOrganize } = useCreateOrganizer();
  const companyCount = useRef(0);
  const pageStatus = useRef<"list" | "empty">("list");
  const [companyList, setCompanyList] = useState<CompanyData[]>([]);
  const { data, error, isLoading, refetch } = useRequest<CompanyResponse>({
    queryKey: ["organizations"],
    url: "/api/v1/organizations/",
  }).useGet();

  useEffect(() => {
    if (data?.organizations) {
      setCompanyList(data.organizations);
      companyCount.current = data.organizations.length;
    }
  }, [data]);

  // 處理錯誤
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: error.message || "發生錯誤，請稍後再試",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    refetch();
  }, []); // 空依賴數組表示只在組件掛載時執行一次

  useEffect(() => {
    if (companyCount.current === 0) {
      pageStatus.current = "empty";
    } else {
      pageStatus.current = "list";
    }
  }, [companyCount]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-40 items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      );
    }
    if (isCreateOrganize) {
      return <CreateOrganizer />;
    }
    if (companyCount.current === 0) {
      return <EmptyOrganizer />;
    } else {
      return <ListOrganize companyList={companyList} />;
    }
  };

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
