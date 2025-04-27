import { LastestCardProps } from "../types/LastestCard";
import { Icon } from "@iconify-icon/react";
export default function LastestCard(data: LastestCardProps) {
  return (
    <div className="mx-auto">
      <div className="relative flex h-[400px] w-full max-w-[500px] flex-col overflow-hidden rounded-lg border-2 border-neutral-200 shadow-md">
        <div className="relative h-[70%] w-full">
          <img src={data.image} alt={data.title} className="h-full w-full object-cover" />
        </div>
        <div className="h-[30%] w-full space-y-1 px-4 pt-4">
          <p className="text-base text-neutral-600">{data.date}</p>
          <p className="text-lg font-bold">{data.title}</p>
          <p className="text-primary flex cursor-pointer items-center text-sm">
            <Icon icon="my-map-pin" className="mt-1 mr-1" />
            {data.location}
          </p>
          <div className="border-primary absolute right-4 bottom-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-1">
            <Icon icon="my-arrow-right" className="text-primary text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
