import { CategoryCardProps } from "../types/CategoryCard";
import { Link } from "react-router-dom";
import { cn } from "@/core/lib/utils";

export default function CategoryCard(data: CategoryCardProps) {
  return (
    <Link to={data.link} className="block h-full">
      <div className={cn("relative overflow-hidden rounded-2xl transition-transform select-none hover:scale-[1.02]")}>
        <div className="h-[180px] w-full lg:h-[234px]">
          <img className="h-full w-full rounded-2xl object-cover" src={data.image} alt={data.title} />
        </div>
        <div className="w-full space-y-2 px-1 py-2 lg:p-4">
          <div className="chips flex flex-wrap items-center gap-1 lg:gap-2">
            {data.chips.map((chip, i) => (
              <p key={i} className="border-primary text-primary rounded-full border px-3 py-1 text-xs">
                {chip}
              </p>
            ))}
          </div>
          <p className="line-clamp-1 text-base lg:text-xl">{data.title}</p>
        </div>
      </div>
    </Link>
  );
}
