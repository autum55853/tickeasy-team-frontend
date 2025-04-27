import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tab";
import { CategoryOptions } from "../types/CategoryOptions";

interface CategoryTabProps {
  tabs: CategoryOptions[];
  selectedCategory: CategoryOptions | null;
  setSelectedCategory: (category: CategoryOptions | null) => void;
}

export default function CategoryTab({ tabs, selectedCategory, setSelectedCategory }: CategoryTabProps) {
  // 使用安全的映射方式
  const gridColsMap: { [key: number]: string } = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    // 根據需求添加更多
  };

  const gridCols = gridColsMap[tabs.length] || "grid-cols-1"; // 設置默認值

  return (
    <Tabs
      value={selectedCategory?.value}
      className="mx-auto w-full"
      onValueChange={(value) => {
        const selected = tabs.find((tab) => tab.value === value);
        if (selected) setSelectedCategory(selected);
      }}
    >
      <TabsList className={`mx-auto grid min-h-[80px] w-full max-w-[1200px] ${gridCols} bg-slate-100`}>
        {/* {gridCols.toString()} */}
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex h-full flex-1 cursor-pointer flex-col gap-1">
            <span className="text-base font-bold">{tab.label}</span>
            <span className="text-muted-foreground text-sm">{tab.subLabel}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
