import useCounter from "../hooks/useCounter";
import HomeBtn from "../components/homeBtn";
import Title from "@/core/components/global/title";
import { Button } from "@/core/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Page() {
  const { count, increment, decrement, reset } = useCounter({ initialValue: 7, min: 0, max: 10 });
  return (
    <div>
      <Title title="簡單的專案規劃範例-計數器" />
      <div>數字: {count}</div>
      <div className="bg-black-500 flex items-center gap-2">
        <Button variant={"outline"} onClick={increment}>
          +
        </Button>
        <Button variant={"outline"} onClick={decrement}>
          -
        </Button>
        <HomeBtn onClick={reset}>Reset</HomeBtn>

        <Button variant={"default"} onClick={decrement}>
          default
        </Button>
        <Button variant={"outline"} onClick={decrement}>
          outline
        </Button>
        <Button variant="gradient">水平渐变按钮</Button>
        <Button variant="gradientVertical">垂直渐变按钮</Button>
      </div>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-600">
        <span className="text-white">top</span>
      </div>
      <h1>我是h1</h1>
      <h2>我是h2</h2>
      <h3>我是h3</h3>
      <h4>我是h4</h4>
      <h5>我是h5</h5>
      <h6>我是h6</h6>
      <div></div>
    </div>
  );
}
