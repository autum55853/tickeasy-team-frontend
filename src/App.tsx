// 啟用路由組件
import Boot from "@/core/boot";
import { usePageNotFound } from "@/core/hooks/usePageNotFound";

function App() {
  usePageNotFound();

  return <Boot />;
}

export default App;
