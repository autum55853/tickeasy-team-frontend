import { Layout } from "@/pages/comm/views/layout";
import { useToast } from "@/core/hooks/useToast";
import QrScanner from "../components/QrScanner";
import { useState } from "react";

export default function Page() {
  const { toast } = useToast();
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = (qrCode: string) => {
    setScanResult(qrCode);
    toast({ title: "掃描成功", description: qrCode });
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
          <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4">
            <h2 className="font-medium text-green-700">掃描結果</h2>
            <p className="break-all text-green-700">{scanResult}</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
