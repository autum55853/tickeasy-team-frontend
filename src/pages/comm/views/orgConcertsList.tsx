import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import Header from "@/core/components/global/header";
import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import { ConcertCard } from "./components/concertCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tab";

type ConcertStatus = "draft" | "published" | "finished";

interface Concert {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  status: ConcertStatus;
}

export default function PaginationDemo() {
  const concerts: Concert[] = [
    {
      id: 1,
      imageUrl: "/images/concert1.jpg",
      title: "夢幻之夜",
      subtitle: "Live Concert 2025",
      startDate: "2025/08/15",
      endDate: "2025/08/15",
      status: "draft",
    },
    {
      id: 2,
      imageUrl: "/images/concert2.jpg",
      title: "星際巡航",
      subtitle: "Star Journey Tour",
      startDate: "2025/09/01",
      endDate: "2025/09/02",
      status: "draft",
    },
    {
      id: 3,
      imageUrl: "/images/concert3.jpg",
      title: "夏日音樂節",
      subtitle: "Summer Music Festival",
      startDate: "2024/07/01",
      endDate: "2024/07/03",
      status: "published",
    },
    {
      id: 4,
      imageUrl: "/images/concert4.jpg",
      title: "冬季演唱會",
      subtitle: "Winter Concert",
      startDate: "2023/12/15",
      endDate: "2023/12/15",
      status: "finished",
    },
  ];

  const [activeTab, setActiveTab] = useState<ConcertStatus>("draft");

  const filteredConcerts = concerts.filter((concert) => concert.status === activeTab);

  const getConcertCount = (status: ConcertStatus) => {
    return concerts.filter((concert) => concert.status === status).length;
  };

  return (
    <>
      <div className="mt-24 flex h-[calc(100vh-6rem)] flex-col pb-[400px]">
        <Header />
        <main className="flex-grow">
          <div className="flex h-full flex-col md:flex-row">
            <aside className="flex w-full flex-col border-r p-4 text-center md:w-64">
              <Button variant="default" className="mb-4 w-full text-lg font-semibold md:justify-start">
                返回主辦方清單
              </Button>
              <div className="space-y-2">
                <Button variant="outline" className="w-full md:justify-start">
                  公司資訊
                </Button>
                <Button variant="outline" className="w-full md:justify-start">
                  演唱會列表
                </Button>
              </div>
            </aside>
            <section className="flex-1 px-10 py-2">
              <div className="org-header mb-4 flex flex-col justify-between md:flex-row md:items-center">
                <h2 className="mb-5 text-center font-bold md:w-full md:text-left">XX有限公司</h2>
                <Button variant="gradient">辦演唱會</Button>
              </div>
              <div className="concerts-section">
                <Tabs defaultValue="draft" className="w-full" onValueChange={(value) => setActiveTab(value as ConcertStatus)}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="draft">草稿 ({getConcertCount("draft")})</TabsTrigger>
                    <TabsTrigger value="published">已發佈 ({getConcertCount("published")})</TabsTrigger>
                    <TabsTrigger value="finished">已結束 ({getConcertCount("finished")})</TabsTrigger>
                  </TabsList>
                  <TabsContent value="draft">
                    <div className="flex flex-col">
                      <div className="space-y-4">
                        {filteredConcerts.map((concert) => (
                          <ConcertCard
                            key={concert.id}
                            imageUrl={concert.imageUrl}
                            title={concert.title}
                            startDate={concert.startDate}
                            endDate={concert.endDate}
                            status={concert.status}
                            onEdit={() => console.log("Edit", concert.id)}
                            onCopy={() => console.log("Copy", concert.id)}
                            onDelete={() => console.log("Delete", concert.id)}
                            onCheckSales={() => console.log("Check Sales", concert.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="published">
                    <div className="flex flex-col">
                      <div className="space-y-4">
                        {filteredConcerts.map((concert) => (
                          <ConcertCard
                            key={concert.id}
                            imageUrl={concert.imageUrl}
                            title={concert.title}
                            startDate={concert.startDate}
                            endDate={concert.endDate}
                            status={concert.status}
                            onEdit={() => console.log("Edit", concert.id)}
                            onCopy={() => console.log("Copy", concert.id)}
                            onDelete={() => console.log("Delete", concert.id)}
                            onCheckSales={() => console.log("Check Sales", concert.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="finished">
                    <div className="flex flex-col">
                      <div className="space-y-4">
                        {filteredConcerts.map((concert) => (
                          <ConcertCard
                            key={concert.id}
                            imageUrl={concert.imageUrl}
                            title={concert.title}
                            startDate={concert.startDate}
                            endDate={concert.endDate}
                            status={concert.status}
                            onEdit={() => console.log("Edit", concert.id)}
                            onCopy={() => console.log("Copy", concert.id)}
                            onDelete={() => console.log("Delete", concert.id)}
                            onCheckSales={() => console.log("Check Sales", concert.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </section>
          </div>
          <Footer />
        </main>
        <ScrollTopBtn />
      </div>
    </>
  );
}
