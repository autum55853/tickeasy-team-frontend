import { LatestCardProps } from "../types/LatestCard";
import { Icon } from "@iconify-icon/react";
export default function LastestCard(data: LatestCardProps) {
  return (
    <div className="mx-auto">
      <div className="relative flex w-[416px] flex-col overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]">
        <div className="h-[240px] w-full">
          <img src={data.image} alt={data.title} className="h-full w-full object-cover" />
        </div>
        <div className="flex w-full items-end justify-between px-4 py-3">
          <div>
            <p className="text-base text-neutral-600">{data.date}</p>
            <p className="text-lg font-bold">{data.title}</p>
            <p className="text-primary align-center flex items-center text-sm">
              <Icon icon="my-map-pin" className="mt-1 mr-1" />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 hover:underline"
              >
                {data.location}
              </a>
            </p>
          </div>
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-1 border-neutral-400">
            <Icon icon="mdi:heart-outline" className="text-xl text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
