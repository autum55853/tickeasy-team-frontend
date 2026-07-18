import { ApiResponse, Message, SmartReplyResponse, SearchResult } from "../types/customer-service";

export class CustomerServiceAPI {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1/smart-reply`) {
    this.baseUrl = baseUrl;
    // 從 localStorage 或其他地方獲取認證 token
    this.token = localStorage.getItem("auth_token") || undefined;
  }

  // 設定認證 token
  setAuthToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  // 清除認證 token
  clearAuthToken() {
    this.token = undefined;
    localStorage.removeItem("auth_token");
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    // 健康檢查的詳細日誌
    // if (endpoint === '/health') {
    //   console.log('📞 [Request] 健康檢查請求開始:', {
    //     url,
    //     method: options.method || 'GET',
    //     headers,
    //     timestamp: new Date().toISOString()
    //   });
    // }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // if (endpoint === '/health') {
      //   console.log('📬 [Response] 健康檢查回應:', {
      //     status: response.status,
      //     statusText: response.statusText,
      //     ok: response.ok,
      //     headers: Object.fromEntries(response.headers.entries()),
      //     timestamp: new Date().toISOString()
      //   });
      // }

      if (!response.ok) {
        const errorMsg = `HTTP ${response.status}: ${response.statusText}`;
        // if (endpoint === '/health') {
        //   console.error('❌ [Response] 健康檢查 HTTP 錯誤:', errorMsg);
        // }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      // if (endpoint === '/health') {
      //   console.log('📊 [Data] 健康檢查數據:', data);
      // }

      return data;
    } catch (error) {
      // if (endpoint === '/health') {
      //   console.error('🚨 [Error] 健康檢查異常:', {
      //     error: error instanceof Error ? error.message : '未知錯誤',
      //     stack: error instanceof Error ? error.stack : undefined,
      //     timestamp: new Date().toISOString()
      //   });
      // }

      // console.error('Customer Service API Request failed:', error);

      // 返回統一的錯誤格式
      return {
        success: false,
        error: error instanceof Error ? error.message : "請求失敗",
        message: error instanceof Error ? error.message : "網路連接異常，請稍後再試",
      };
    }
  }

  // 智能回覆相關
  async quickReply(message: string, enableAI = true): Promise<ApiResponse<SmartReplyResponse>> {
    return this.request("/reply", {
      method: "POST",
      body: JSON.stringify({ message, enableAI }),
    });
  }

  async testKeywords(message: string): Promise<ApiResponse<unknown>> {
    return this.request("/test", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  // 會話管理相關
  async startSession(data: { userId?: string; category?: string; initialMessage?: string }): Promise<
    ApiResponse<{
      sessionId: string;
      status: string;
      sessionType: string;
      category: string;
      botMessage?: {
        text: string;
        confidence: number;
        strategy: string;
      };
    }>
  > {
    return this.request("/session/start", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async sendMessage(
    sessionId: string,
    message: string
  ): Promise<
    ApiResponse<{
      message: string;
      confidence: number;
      strategy: string;
      sessionType?: string;
      sessionStatus: string;
    }>
  > {
    return this.request(`/session/${sessionId}/message`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  async getSessionHistory(sessionId: string): Promise<
    ApiResponse<{
      sessionId: string;
      sessionType: string;
      status: string;
      category: string;
      priority: string;
      createdAt: string;
      firstResponseAt?: string;
      messages: Message[];
      messageCount: number;
    }>
  > {
    return this.request(`/session/${sessionId}/history`);
  }

  async requestTransfer(
    sessionId: string,
    reason?: string
  ): Promise<
    ApiResponse<{
      sessionId: string;
      status: string;
      priority: string;
      estimatedWaitTime: string;
    }>
  > {
    return this.request(`/session/${sessionId}/transfer`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  }

  async closeSession(
    sessionId: string,
    satisfactionRating?: number,
    satisfactionComment?: string
  ): Promise<
    ApiResponse<{
      sessionId: string;
      status: string;
      closedAt: string;
      durationMinutes: number;
      satisfactionRating?: number;
    }>
  > {
    return this.request(`/session/${sessionId}/close`, {
      method: "POST",
      body: JSON.stringify({ satisfactionRating, satisfactionComment }),
    });
  }

  // 健康檢查
  async healthCheck(): Promise<
    ApiResponse<{
      status: string;
      timestamp: string;
      version: string;
    }>
  > {
    // console.log('📋 [API] 健康檢查 API 呼叫開始:', this.baseUrl + '/health');

    const result = await this.request<{
      status: string;
      timestamp: string;
      version: string;
    }>("/health");
    // const duration = Date.now() - startTime;
    // console.log(`🟢 [API] 健康檢查 API 成功 (${duration}ms):`, result);
    return result;
  }

  // 知識庫搜尋
  async searchKnowledgeBase(
    query: string,
    options: {
      limit?: number;
      threshold?: number;
      categories?: string[];
    } = {}
  ): Promise<ApiResponse<SearchResult[]>> {
    const params = new URLSearchParams({
      q: query,
      ...(options.limit && { limit: options.limit.toString() }),
      ...(options.threshold && { threshold: options.threshold.toString() }),
      ...(options.categories && { categories: options.categories.join(",") }),
    });

    return this.request(`${import.meta.env.VITE_API_BASE_URL}/api/v1/knowledge-base/search?${params}`, {
      method: "GET",
    });
  }

  async getQuerySuggestions(query: string, limit = 5): Promise<ApiResponse<string[]>> {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
    });

    return this.request(`/knowledge-base/suggestions?${params}`, {
      method: "GET",
    });
  }

  // 取得常見問題
  async getCommonQuestions(category?: string): Promise<
    ApiResponse<
      {
        category: string;
        questions: Array<{
          id: string;
          question: string;
          category: string;
          popularity: number;
        }>;
      }[]
    >
  > {
    const params = category ? `?category=${encodeURIComponent(category)}` : "";
    return this.request(`/faq/common${params}`);
  }

  // 錯誤回報
  async reportError(error: {
    sessionId?: string;
    errorType: string;
    errorMessage: string;
    userAgent: string;
    timestamp: string;
  }): Promise<ApiResponse<{ reportId: string }>> {
    return this.request("/error/report", {
      method: "POST",
      body: JSON.stringify(error),
    });
  }
}

// 創建單例實例
export const customerServiceAPI = new CustomerServiceAPI();

// 預設匯出，方便其他地方使用
export default customerServiceAPI;
