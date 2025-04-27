import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tab";
import { CategoryOptions } from "../types/CategoryOptions";

interface CategoryTabProps {
  tabs: CategoryOptions[];
  selectedCategory: CategoryOptions | null;
  setSelectedCategory: (category: CategoryOptions | null) => void;
}

export default function CategoryTab({ tabs, selectedCategory, setSelectedCategory }: CategoryTabProps) {
  return (
    <Tabs
      value={selectedCategory?.value}
      className="mx-auto w-full"
      onValueChange={(value) => {
        const selected = tabs.find((tab) => tab.value === value);
        if (selected) setSelectedCategory(selected);
      }}
    >
      <TabsList className={`mx-auto grid min-h-[80px] w-full max-w-[1200px] grid-cols-${tabs.length} bg-slate-100`}>
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
