// import CategorySelect from "./CategorySelect";
// import { CategoryOptions, MusicTag } from "../types/CategoryOptions";
// import { useState, useEffect, useMemo } from "react";
// import { Button } from "@/core/components/ui/button";

import FilterSection from "./FilterSection";
import { ConcertDemoApiData } from "./ConcertDemoApiData";
import ConcertCard from "./ConcertCard";
import { useState, useMemo, useEffect } from "react";
import { Pagination } from "@/core/components/ui/pagination";
import { useFilterContext } from "../hook/useFilterContext";
import { ConcertCardProps } from "../types/ConcertCard";
export default function ConcertListSection() {
  const { filterType, clearFilter, setClearFilter } = useFilterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [previousData, setPreviousData] = useState<ConcertCardProps[]>([]);

  // 篩選邏輯
  const filteredCards = () => {
    let data: ConcertCardProps[] = [];
    if (Object.keys(filterType).length === 0) {
      data = ConcertDemoApiData();
    } else if (clearFilter) {
      data = ConcertDemoApiData();
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
        const cardDate = new Date(card.date);
        return cardDate >= new Date(start) && cardDate <= new Date(end);
      });
    }

    // 日期排序
    if (filterType.dateSort && filterType.dateSort.length > 0) {
      data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
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
  }, [filterType, clearFilter]);
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
