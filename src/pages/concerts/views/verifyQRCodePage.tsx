import { Layout } from "@/pages/comm/views/layout";
import { useToast } from "@/core/hooks/useToast";
import QrScanner from "../components/QrScanner";
import { useState } from "react";

export default function Page() {
  const { toast } = useToast();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [apiResult, setApiResult] = useState<{ status: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // 暫時的模擬驗票 API，之後可替換為真實請求
  const verifyQrCode = async (qrCode: string): Promise<{ status: string; message: string }> => {
    return new Promise((resolve) => setTimeout(() => resolve({ status: "success", message: `模擬驗證成功：${qrCode}` }), 500));
  };

  const handleScan = (qrCode: string) => {
    setScanResult(qrCode);
    toast({ title: "掃描成功", description: qrCode });

    // 呼叫驗證 API（目前為模擬）
    setLoading(true);
    verifyQrCode(qrCode)
      .then((res) => {
        setApiResult(res);
      })
      .catch((err) => {
        toast({ variant: "destructive", title: "API 錯誤", description: err?.message || "呼叫失敗" });
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

        <QrScanner onScan={handleScan} onError={handleError} isActive={true} />

        {scanResult && (
          <div className="mt-4 w-full max-w-md rounded-lg border border-gray-200 p-4">
            <h2 className="mb-2 font-medium text-gray-800">掃描結果</h2>
            <p className="break-all text-gray-700">{scanResult}</p>
          </div>
        )}

        {loading && <p className="text-blue-600">驗證中...</p>}

        {apiResult && (
          <div
            className={`mt-4 w-full max-w-md rounded-lg border p-4 ${
              apiResult.status === "success" ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
            }`}
          >
            <h2 className={`mb-2 font-medium ${apiResult.status === "success" ? "text-green-700" : "text-red-700"}`}>API 回應</h2>
            <p className={`break-all ${apiResult.status === "success" ? "text-green-700" : "text-red-700"}`}>{apiResult.message}</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
