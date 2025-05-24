import { Layout } from "@/pages/comm/views/layout";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import CompanyDetailSection from "../components/companyDetailSection";
export default function CompanyDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCompanyId = queryParams.get("companyId");
  const companyId = useRef(urlCompanyId);
  useEffect(() => {
    // 根據 companyId 加載數據
    console.log(companyId.current);
  }, [companyId]);
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-6rem)] flex-col gap-4">
        <CompanyDetailSection companyId={companyId.current} />
      </div>
    </Layout>
  );
}
