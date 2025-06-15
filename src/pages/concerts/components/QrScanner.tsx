import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';
import { parseQrCode } from '../services/api';

interface QrScannerProps {
  onScan: (qrCode: string) => void;
  onError?: (error: string) => void;
  isActive: boolean;
}

export const QrScanner: React.FC<QrScannerProps> = ({ 
  onScan, 
  onError, 
  isActive 
}) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [error, setError] = useState<string>('');
  const elementId = 'qr-reader';

  useEffect(() => {
    if (isActive && !scannerRef.current) {
      initializeScanner();
    } else if (!isActive && scannerRef.current) {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isActive]);

  const initializeScanner = async () => {
    try {
      // 檢查相機權限
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasCamera(true);
      setError('');

      // 初始化掃描器
      const scanner = new Html5QrcodeScanner(
        elementId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          // 成功掃描
          const parsedResult = parseQrCode(decodedText);
          if (parsedResult.isValid) {
            onScan(decodedText);
            setIsScanning(false);
          } else {
            setError('無效的 QR Code 格式');
            onError?.('無效的 QR Code 格式');
          }
        },
        (errorMessage) => {
          // 掃描失敗（這是正常的，當沒有 QR Code 時會觸發）
          console.log('掃描中...', errorMessage);
        }
      );

      scannerRef.current = scanner;
      setIsScanning(true);
    } catch (error: any) {
      console.error('初始化掃描器失敗:', error);
      setHasCamera(false);
      setError('無法訪問相機，請檢查權限設置');
      onError?.('無法訪問相機，請檢查權限設置');
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
      } catch (error) {
        console.warn('停止掃描器時發生錯誤:', error);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const restartScanner = () => {
    stopScanner();
    setTimeout(() => {
      if (isActive) {
        initializeScanner();
      }
    }, 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 這裡可以實作檔案上傳掃描 QR Code 的功能
      // 需要使用 html5-qrcode 的檔案掃描功能
      console.log('檔案上傳功能待實作');
    }
  };

  if (!hasCamera) {
    return (
      <div className="qr-scanner-container">
        <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <CameraOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            無法訪問相機
          </h3>
          <p className="text-gray-600 mb-4">
            請檢查瀏覽器相機權限設置
          </p>
          <button
            onClick={restartScanner}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重新嘗試
          </button>
          
          {/* 備用檔案上傳選項 */}
          <div className="mt-4">
            <label className="block">
              <span className="sr-only">選擇 QR Code 圖片</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-scanner-container">
      {error && (
        <div className="error-message mb-4">
          {error}
        </div>
      )}
      
      <div className="relative">
        <div id={elementId} className="w-full" />
        
        {isScanning && (
          <div className="qr-scanner-overlay">
            <div className="qr-scanner-corner top-left"></div>
            <div className="qr-scanner-corner top-right"></div>
            <div className="qr-scanner-corner bottom-left"></div>
            <div className="qr-scanner-corner bottom-right"></div>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {isScanning ? (
          <button
            onClick={stopScanner}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <CameraOff className="w-4 h-4 mr-2" />
            停止掃描
          </button>
        ) : (
          <button
            onClick={initializeScanner}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Camera className="w-4 h-4 mr-2" />
            開始掃描
          </button>
        )}
        
        <button
          onClick={restartScanner}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          重新掃描
        </button>
      </div>
    </div>
  );
};

export default QrScanner;
