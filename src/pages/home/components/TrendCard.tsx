import { TrendCardProps } from "../types/TrendCard";
import { Button } from "@/core/components/ui/button";
import { Icon } from "@iconify-icon/react";
import { useNavigate } from "react-router-dom";

export default function TrendCard(data: TrendCardProps) {
  const navigate = useNavigate();

  return (
    <div className="relative mx-4 flex flex-col overflow-hidden rounded-[30px] border-1 border-neutral-200">
      <img src={data.image} alt={data.title} className="h-[200px] w-full object-cover" />
      <div className="space-y-2 px-4 py-2">
        <h5 className="line-clamp-2 font-bold">{data.title}</h5>
        <p className="line-clamp-3 text-base text-gray-500">{data.description}</p>
        <Button onClick={() => navigate(data.link)} variant={"outline"} className="w-[66%] rounded-full text-left">
          <div className="flex w-full items-center justify-between">
            <p className="text-base">立刻訂票</p>
            <Icon icon="my-arrow-right" className="text-2xl" />
          </div>
        </Button>
      </div>
    </div>
  );
}
