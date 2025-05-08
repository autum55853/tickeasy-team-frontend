import { CategoryCardProps } from "../types/CategoryCard";

export default function CategoryCard(data: CategoryCardProps) {
  return (
    <>
      {/* 這裡可以放置你的卡片組件 */}
      <div className="relative min-h-[280px] overflow-hidden rounded-lg border-2 border-neutral-200 select-none">
        <div className="relative h-[70%] w-full">
          <img className="h-full w-full object-cover" src={data.image} alt={data.title} />
        </div>
        <div className="h-[30%] w-full space-y-2 p-4">
          <div className="chips flex items-center gap-2">
            {data.chips.map((chip, index) => (
              <p key={index} className="bg-primary rounded-full px-3 py-1 text-xs text-white">
                {chip}
              </p>
            ))}
          </div>
          <p className="line-clamp-1 text-xs md:text-sm lg:text-base">{data.title}</p>
        </div>
      </div>
    </>
  );
}
