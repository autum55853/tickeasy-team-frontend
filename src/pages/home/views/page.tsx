import useCounter from "../hooks/useCounter";
import HomeBtn from "../components/homeBtn";
import Title from "@/core/components/global/title";
import { Button } from "@/core/components/ui/button";
export default function Page() {
  const { count, increment, decrement, reset } = useCounter({ initialValue: 7, min: 0, max: 10 });
  return (
    <div>
      <Title title="簡單的專案規劃範例-計數器" />
      <div>數字: {count}</div>
      <div className="flex items-center gap-2">
        <Button variant={"outline"} onClick={increment}>
          +
        </Button>
        <Button variant={"outline"} onClick={decrement}>
          -
        </Button>
        <HomeBtn onClick={reset}>Reset</HomeBtn>
      </div>
    </div>
  );
}
