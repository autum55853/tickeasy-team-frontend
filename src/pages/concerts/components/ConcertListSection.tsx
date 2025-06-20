import FilterSection from "./FilterSection";
import ConcertCard from "./ConcertCard";
import { useState, useMemo, useEffect } from "react";
import { useRequest } from "@/core/hooks/useRequest";
import { useToast } from "@/core/hooks/useToast";
import { Pagination } from "@/core/components/ui/pagination";
import { useFilterContext } from "../hook/useFilterContext";
import { ConcertCardProps } from "../types/ConcertCard";
import { RawConertData } from "../types/RawConertData";
export default function ConcertListSection() {
  const { toast } = useToast();
  const { filterType, clearFilter, setClearFilter } = useFilterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [previousData, setPreviousData] = useState<ConcertCardProps[]>([]);
  const [rawConcertList, setRawConcertList] = useState<ConcertCardProps[]>([]);

  // 取得 原始Convert 列表
  const { data, error, refetch } = useRequest<RawConertData[]>({
    queryKey: [],
    url: "/api/v1/concerts/search",
  }).useGet();

  useEffect(() => {
    if (data) {
      const convertData = data.map((item, index) => ({
        idx: index,
        id: String(index + 1),
        startDate: item.eventStartDate,
        endDate: item.eventEndDate,
        title: item.conTitle,
        image: item.imgBanner,
        location: item.conLocation,
        link: `/concerts/${item.concertId}`,
        category: item.musicTagName,
        locationTagName: item.locationTagName,
      }));
      setRawConcertList(convertData);
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
  }, []);

  // 篩選邏輯
  const filteredCards = () => {
    let data: ConcertCardProps[] = [];
    if (Object.keys(filterType).length === 0 || clearFilter || previousData.length === 0) {
      data = rawConcertList;
    } else {
      data = [...previousData];
    }
    // 地區篩選
    if (filterType.area && filterType.area.length > 0) {
      data = data.filter((card) => filterType.area?.includes(card.locationTagName));
    }

    // 類別篩選
    if (filterType.category && filterType.category.length > 0) {
      data = data.filter((card) => filterType.category?.includes(card.category));
    }

    // 日期範圍篩選
    if (filterType.date && filterType.date.length > 0) {
      const [start, end] = filterType.date;
      data = data.filter((card) => {
        return (
          (card.startDate >= start && card.startDate <= end) || // 開始日在範圍內
          (card.endDate >= start && card.endDate <= end) // 結束日在範圍內
        );
      });
    }

    // 日期排序
    if (filterType.dateSort && filterType.dateSort.length > 0) {
      data.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return filterType.dateSort![0] === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      });
    } else {
      data.sort((a, b) => a.idx - b.idx);
    }
    setPreviousData(data);
  };
  useEffect(() => {
    filteredCards();

    if (clearFilter) {
      setClearFilter(false);
    }
  }, [filterType, clearFilter, rawConcertList]);
  // 分頁邏輯
  const totalPages = useMemo(() => {
    return Math.ceil(previousData.length / 9);
  }, [filteredCards]);

  const currentPageCards = useMemo(() => {
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    return previousData.slice(startIndex, endIndex);
  }, [currentPage, filteredCards]);

  return (
    <>
      <FilterSection />
      <section className="min-h-[100px] lg:mt-15">
        <div className="mx-auto lg:w-[96%]">
          {/* card content */}
          <div className="mb-8 grid max-w-[1300px] grid-cols-1 gap-8 lg:mt-4 lg:grid-cols-3 xl:mx-auto">
            {currentPageCards.length > 0 ? (
              currentPageCards.map((item) => <ConcertCard key={item.id} {...item} />)
            ) : (
              <div className="col-span-full text-center text-lg">目前沒有任何活動</div>
            )}
          </div>

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
        </div>
      </section>
    </>
  );
}
