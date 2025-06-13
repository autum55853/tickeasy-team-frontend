import { Button } from "@/core/components/ui/button";
import { CompanyDetailData } from "../types/company";
import { Tabs, TabsList, TabsTrigger } from "@/core/components/ui/tab";
import CompanyConcertCard from "./companyConcertCard";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useConcertStore, ConInfoStatus } from "@/pages/concerts/store/useConcertStore";
import { useToast } from "@/core/hooks/useToast";
import { Pagination } from "@/core/components/ui/pagination";

export default function CompanyConcertSection({ companyInfoData }: { companyInfoData: CompanyDetailData }) {
  const [activeTab, setActiveTab] = useState<ConInfoStatus>("draft");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { organizationConcerts, getOrganizationConcerts, organizationConcertsPagination, getConcertStatusCounts } = useConcertStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const organizationId = params.get("companyId");

    if (!organizationId) {
      navigate("/");
      return;
    }

    // 載入演唱會列表
    getOrganizationConcerts(organizationId, currentPage).catch((error) => {
      toast({
        title: "錯誤",
        description: error.message || "載入演唱會列表失敗",
        variant: "destructive",
      });
    });
  }, [navigate, getOrganizationConcerts, toast, currentPage]);

  // 當切換 tab 時重置頁碼
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // 根據狀態分類演唱會
  const concertsByStatus = useMemo(() => {
    return organizationConcerts.reduce(
      (acc, concert) => {
        const status = concert.conInfoStatus as ConInfoStatus;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(concert);
        return acc;
      },
      {} as Record<ConInfoStatus, typeof organizationConcerts>
    );
  }, [organizationConcerts]);

  // 取得當前 tab 的演唱會列表
  const currentTabConcerts = useMemo(() => {
    return concertsByStatus[activeTab] || [];
  }, [concertsByStatus, activeTab]);

  // 取得各狀態的演唱會總數
  const statusCounts = getConcertStatusCounts();

  // 處理分頁
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto h-full w-full">
      <div className="border-grey-500 rounded-xl border-2 p-12">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">{companyInfoData.orgName}</div>
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              variant="outline"
              className="my-2 flex rounded-full lg:w-[100px]"
              onClick={() => navigate(`/concert/create/info?companyId=${companyInfoData.organizationId}`)}
            >
              辦演唱會
            </Button>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ConInfoStatus)}>
          <TabsList className="mb-4 flex h-auto flex-wrap gap-2 bg-transparent p-0">
            <TabsTrigger value="draft" className="data-[state=active]:bg-primary/10 text-xs hover:bg-gray-100 sm:text-sm">
              草稿({statusCounts.draft})
            </TabsTrigger>
            <TabsTrigger value="reviewing" className="data-[state=active]:bg-primary/10 text-xs hover:bg-gray-100 sm:text-sm">
              審核中({statusCounts.reviewing})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-primary/10 text-xs hover:bg-gray-100 sm:text-sm">
              已退回({statusCounts.rejected})
            </TabsTrigger>
            <TabsTrigger value="published" className="data-[state=active]:bg-primary/10 text-xs hover:bg-gray-100 sm:text-sm">
              已發布({statusCounts.published})
            </TabsTrigger>
            <TabsTrigger value="finished" className="data-[state=active]:bg-primary/10 text-xs hover:bg-gray-100 sm:text-sm">
              已結束({statusCounts.finished})
            </TabsTrigger>
          </TabsList>

          {/* 使用 currentTabConcerts 來顯示當前 tab 的演唱會列表 */}
          {currentTabConcerts.map((concert) => (
            <CompanyConcertCard
              key={concert.concertId}
              concertId={concert.concertId}
              conTitle={concert.conTitle}
              eventStartDate={concert.createdAt}
              eventEndDate={concert.updatedAt}
              imgBanner={concert.imgBanner}
            />
          ))}

          {/* 分頁控制 */}
          {organizationConcertsPagination && (
            <div className="mt-4">
              <Pagination currentPage={currentPage} totalPages={organizationConcertsPagination.totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
