import { Button } from "@/core/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CompanyInfoSection from "./companyInfoSection";
import CompanyConcertSection from "./companyConcertSection";
import { useState } from "react";
export default function CompanyDetailSection({ companyId }: { companyId: string }) {
  const navigate = useNavigate();
  const handleBackToCompanyList = () => {
    navigate("/company");
  };
  const [activeTab, setActiveTab] = useState("companyInfo");
  const handleGoToConcertList = (str: string) => {
    setActiveTab(str);
  };
  return (
    <div className="mx-auto h-full w-full lg:w-[70%]">
      <div className="grid grid-cols-3 lg:gap-4">
        <div className="hidden lg:col-span-1 lg:block">
          <ul className="flex w-[60%] flex-col gap-4">
            <li className="hover:text-primary flex justify-start rounded-xs">
              <Button variant="text" className="w-full text-gray-400 hover:font-bold hover:text-gray-500" onClick={handleBackToCompanyList}>
                <ArrowLeftIcon />
                返回主辦方清單
              </Button>
            </li>
            <li
              className={`hover:bg-primary/10 hover:text-primary rounded-xs ${activeTab === "companyInfo" ? "bg-primary/10 text-primary" : "bg-gray-100"}`}
              onClick={() => setActiveTab("companyInfo")}
            >
              <Button variant="text" className="w-full text-start">
                公司資訊
              </Button>
            </li>
            <li
              className={`hover:bg-primary/10 hover:text-primary rounded-xs ${activeTab === "concertList" ? "bg-primary/10 text-primary" : "bg-gray-100"}`}
              onClick={() => setActiveTab("concertList")}
            >
              <Button variant="text" className="w-full">
                演唱會列表
              </Button>
            </li>
          </ul>
        </div>
        <div className="col-span-3 block flex items-center justify-between lg:hidden">
          <Button
            variant="text"
            size="lg"
            className={`text-grey-500 h-full w-full rounded-none bg-gray-100 py-3 text-xl hover:font-bold hover:text-gray-500 ${activeTab === "companyInfo" ? "bg-primary text-white" : ""} `}
            onClick={() => setActiveTab("companyInfo")}
          >
            公司資訊
          </Button>
          <Button
            variant="text"
            size="lg"
            className={`text-grey-500 h-full w-full rounded-none bg-gray-100 py-3 text-xl hover:font-bold hover:text-gray-500 ${activeTab === "concertList" ? "bg-primary text-white" : ""} `}
            onClick={() => setActiveTab("concertList")}
          >
            演唱會列表
          </Button>
        </div>
        <div className="col-span-3 lg:col-span-2">
          {activeTab === "companyInfo" && <CompanyInfoSection handleGoToConcertList={handleGoToConcertList} />}
          {activeTab === "concertList" && <CompanyConcertSection />}
        </div>
        <div className="col-span-3 mt-4 block lg:hidden">
          <Button
            variant="text"
            className="flex w-full items-center justify-center text-lg text-gray-400 hover:text-gray-500"
            onClick={handleBackToCompanyList}
          >
            <ArrowLeftIcon />
            返回主辦方清單
          </Button>
        </div>
      </div>
    </div>
  );
}
