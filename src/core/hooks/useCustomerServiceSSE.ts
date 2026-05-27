import { useEffect, useRef } from "react";
import { Message } from "@/core/types/customer-service";
import { useCustomerServiceStore } from "@/store/customer-service";

interface UseCustomerServiceSSEOptions {
  sessionId?: string;
  enabled: boolean;
}

/**
 * 訂閱人工客服訊息串流（SSE）
 *
 * Endpoint: `${VITE_API_BASE_URL}/api/v1/smart-reply/session/{sessionId}/stream`
 * 認證：依賴同源 cookie（auth_token）；跨域需後端開 CORS Allow-Credentials
 * 事件 payload：與 Message 型別一致（senderType: 'agent' | 'bot' | 'user'）
 */
export function useCustomerServiceSSE({ sessionId, enabled }: UseCustomerServiceSSEOptions) {
  const addMessage = useCustomerServiceStore((s) => s.addMessage);
  const setConnected = useCustomerServiceStore((s) => s.setConnected);
  const sourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!enabled || !sessionId) return;

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    const url = `${baseUrl}/api/v1/smart-reply/session/${sessionId}/stream`;

    const es = new EventSource(url, { withCredentials: true });
    sourceRef.current = es;

    es.onopen = () => {
      setConnected(true);
    };

    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as Partial<Message>;
        if (!payload || !payload.messageText) return;
        addMessage(payload);
      } catch {
        // 忽略無法解析的 payload
      }
    };

    es.onerror = () => {
      setConnected(false);
    };

    return () => {
      es.close();
      sourceRef.current = null;
    };
  }, [sessionId, enabled, addMessage, setConnected]);
}

export default useCustomerServiceSSE;
