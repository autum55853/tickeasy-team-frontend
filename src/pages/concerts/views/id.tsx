import { useParams } from "react-router-dom";
import Header from "@/core/components/global/header";
import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import { useRequest } from "@/core/hooks/useRequest";
export default function Page() {
  const { id } = useParams(); // 獲取路由參數
  const { useGet } = useRequest({
    queryKey: ["concert", id as string],
    url: `/api/concerts/${id}`,
  });
  const { data: concertData, error } = useGet();

  return (
    <div className="mt-24 flex h-[calc(100vh-6rem)] flex-col pb-[400px]">
      <Header />
      <main className="flex-grow">
        <h1>演唱會 ID: {id}</h1>
        {error ? (
          <div className="p-4 text-red-500">
            <p>載入失敗</p>
            <p>{error.message}</p>
          </div>
        ) : concertData ? (
          <div>
            {/* 顯示演唱會詳細信息 */}
            {/* 例如: {concertData.title} */}
          </div>
        ) : (
          <p>載入中...</p>
        )}
        <Footer />
      </main>
      <ScrollTopBtn />
    </div>
  );
}
