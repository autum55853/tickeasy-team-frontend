import useCounter from "../hooks/useCounter";
import HomeBtn from "../components/homeBtn";
import Title from "@/core/components/global/title";
export default function Page() {
  const { count, increment, decrement, reset } = useCounter({ initialValue: 7, min: 0, max: 10 });
  return (
    <div>
      <Title title="簡單的專案規劃範例-計數器" />
      <div>數字: {count}</div>
      <HomeBtn onClick={increment}>+</HomeBtn>
      <HomeBtn onClick={decrement}>-</HomeBtn>
      <HomeBtn onClick={reset}>Reset</HomeBtn>
    </div>
  );
}
