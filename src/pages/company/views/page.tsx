import { Layout } from "@/pages/comm/views/layout";
export default function Page() {
  return (
    <div className="mt-24 flex h-[calc(100vh-6rem)] flex-col">
      <Layout>
        <div className="flex h-[calc(80vh-6rem)] items-center justify-center text-2xl text-blue-800">這是公司資訊</div>
      </Layout>
    </div>
  );
}
