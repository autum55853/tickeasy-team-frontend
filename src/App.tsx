// 啟用路由組件
import Boot from "@/core/boot";
import { Toaster } from "@/core/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalStatusProvider } from "@/context/modalStatusContext";
// 創建一個新的 QueryClient 實例
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalStatusProvider>
        <Boot />
        <Toaster /> {/* 放在這裡可以確保所有子組件都能使用 toast */}
      </ModalStatusProvider>
    </QueryClientProvider>
  );
}

export default App;
