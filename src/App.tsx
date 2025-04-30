// 啟用路由組件
import Boot from "@/core/boot";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 創建一個新的 QueryClient 實例
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Boot />
    </QueryClientProvider>
  );
}

export default App;
