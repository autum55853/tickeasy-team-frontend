import { Layout } from "@/pages/comm/views/layout";
import { useToast } from "@/core/hooks/useToast";
import QrScanner from "../components/QrScanner";
import { useState } from "react";
import { axiosInstance } from "@/core/lib/axios";

// 驗票 API 回傳型別
interface VerifyApiResponse<T = unknown> {
  status: string;
  message: string;
  data: T;
}

export default function Page() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);

  // 真實驗票 API
  const verifyQrCode = async (qrCode: string): Promise<VerifyApiResponse> => {
    const data = (await axiosInstance.post("/api/v1/ticket/verify", { qrCode })) as VerifyApiResponse;
    console.log("API result", data);
    return data;
  };

  const handleScan = (qrCode: string) => {
    toast({ title: "掃描成功", description: qrCode });
    setScannerActive(false);
    setLoading(true);
    verifyQrCode(qrCode)
      .then((res) => {
        console.log("API result", res);
        toast({
          title: res.status === "success" ? "驗證成功" : "驗證結果",
          description: res.message,
          variant: res.status === "success" ? "default" : "destructive",
        });
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || err?.message || "呼叫失敗";
        toast({ variant: "destructive", title: "API 錯誤", description: msg });
      })
      .finally(() => setLoading(false));
  };

  const handleError = (msg?: string) => {
    toast({ variant: "destructive", title: "掃描錯誤", description: msg || "未知錯誤" });
  };

  return (
    <Layout>
      <section className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-6 py-8">
        <h1 className="text-3xl font-bold">票券 QR Code 驗證</h1>

        <QrScanner onScan={handleScan} onError={handleError} isActive={scannerActive} />

        {loading && <p className="text-blue-600">驗證中...</p>}

        {/* API 結果已以 toast 顯示，若要顯示於畫面可在此處加入 */}

        {/* {!scannerActive && (
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => {
              setApiResult(null);
              setScannerActive(true);
            }}
          >
            再次掃描
          </button>
        )} */}
      </section>
    </Layout>
  );
}
