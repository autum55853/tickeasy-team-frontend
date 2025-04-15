import React, { useState } from "react";
import { useRequest } from "@/core/hooks/useRequest";

interface VoteItem {
  id: number;
  category: string;
  name: string;
  url: string;
  description: string;
}

const DemoRequest: React.FC = () => {
  const [formData, setFormData] = useState<Partial<VoteItem>>({
    category: "",
    name: "",
    url: "",
    description: "",
  });

  // 初始化所有CRUD操作
  const { useGet } = useRequest<VoteItem>({
    queryKey: ["votes", "list"],
    url: "/api/votes",
  });

  const { useCreate, useDelete } = useRequest<VoteItem>({
    queryKey: ["votes", "mutation"],
    url: "/api/vote",
  });

  // 獲取數據
  const { data: voteList, isLoading, refetch } = useGet();

  // 創建、更新和刪除操作
  const createMutation = useCreate({
    onSuccess: () => {
      refetch(); // 創建成功後刷新數據
    },
  });

  const deleteMutation = useDelete({
    onSuccess: () => {
      refetch(); // 刪除成功後刷新數據
    },
  });

  // 表單處理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(formData);
      setFormData({ category: "", name: "", url: "", description: "" });
    } catch (error) {
      console.error("提交失敗:", error);
    }
  };

  // 刪除項目
  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("刪除失敗:", error);
    }
  };

  if (isLoading) return <div>加載中...</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">網站投票系統</h1>

      {/* 添加表單 */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <select name="category" value={formData.category} onChange={handleInputChange} className="w-full rounded border p-2">
            <option value="">選擇分類</option>
            <option value="social">網路社交</option>
            <option value="ticketing">活動票務</option>
            <option value="crowdfunding">群眾募資</option>
            <option value="subscriptions">知識內容訂閱</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="網站名稱"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <input
            type="url"
            name="url"
            placeholder="網站網址"
            value={formData.url}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="網站描述"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
          />
        </div>
        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white" disabled={createMutation.isPending}>
          {createMutation.isPending ? "提交中..." : "提交"}
        </button>
      </form>

      {/* 數據列表 */}
      <div className="space-y-4">
        {voteList?.map((item: VoteItem) => (
          <div key={item.id} className="rounded border p-4">
            <h3 className="font-bold">{item.name}</h3>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {item.url}
            </a>
            <p className="text-gray-600">{item.description}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleDelete(item.id)} className="rounded bg-red-500 px-2 py-1 text-white">
                刪除
              </button>
              {/* <button onClick={() => handleUpdate(item.id, { name: `${item.name}-已更新` })} className="rounded bg-green-500 px-2 py-1 text-white">
                更新
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoRequest;
