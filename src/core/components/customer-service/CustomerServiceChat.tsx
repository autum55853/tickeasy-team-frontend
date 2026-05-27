import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Headphones,
  // Star,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCustomerService } from "@/core/hooks/useCustomerService";
import { useCustomerServiceSSE } from "@/core/hooks/useCustomerServiceSSE";
import { useCustomerServiceQuickReplies, useCustomerServiceStore } from "@/store/customer-service";
import { Message } from "@/core/types/customer-service";

interface CustomerServiceChatProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  userInfo?: Record<string, unknown>;
  initialCategory?: string;
  initialMessage?: string;
}

const CustomerServiceChat: React.FC<CustomerServiceChatProps> = ({ isOpen, onClose, userId, initialCategory = "一般諮詢" }) => {
  const { messages, session, isLoading, isConnected, startSession, sendMessage, closeSession, markAsRead, mutations, switchToHuman } =
    useCustomerService();
  const navigate = useNavigate();
  const quickReplies = useCustomerServiceQuickReplies();

  const isHumanMode = session?.sessionType === "human";

  // 人工模式啟動 SSE 串流接收 Discord 回覆
  useCustomerServiceSSE({ sessionId: session?.sessionId, enabled: isHumanMode });

  // 內部域名配置 - 可以根據環境變量或配置文件調整
  const INTERNAL_DOMAINS = [
    "https://tickeasy-frontend.onrender.com",
    window.location.origin, // 當前域名也視為內部連結
  ];

  const [inputValue, setInputValue] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自動滾動到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 當聊天開啟時標記為已讀
  useEffect(() => {
    if (isOpen) {
      markAsRead();
    }
  }, [isOpen, markAsRead]);

  // 處理發送訊息
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const message = inputValue.trim();
    setInputValue("");

    if (!session) {
      await startSession(message, initialCategory, userId);
    } else {
      await sendMessage(message);
    }
  };

  // 處理快速回覆
  const handleQuickReply = async (text: string) => {
    // 立即添加用戶訊息到界面
    const { addMessage, setLoading } = useCustomerServiceStore.getState();
    addMessage({
      senderType: "user",
      messageText: text,
      sessionId: session?.sessionId,
    });

    // 立即設置載入狀態
    setLoading(true);

    try {
      if (!session) {
        // 對於 startSession，跳過添加用戶訊息（因為我們已經手動添加了）
        mutations.startSession.mutate({
          initialMessage: text,
          category: initialCategory,
          userId,
          skipUserMessage: true,
        });
      } else {
        // 對於已有 session，跳過添加用戶訊息（因為我們已經手動添加了）
        mutations.sendMessage.mutate({
          sessionId: session.sessionId,
          message: text,
          skipUserMessage: true,
        });
      }
    } catch {
      // console.error('Quick reply error:', error);
      setLoading(false);
    }
  };

  // 處理評分提交
  const handleRatingSubmit = async () => {
    if (session && rating > 0) {
      await closeSession(rating, ratingComment);
      setShowRating(false);
      setRating(0);
      setRatingComment("");
    }
  };

  // 處理鍵盤事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 訊息組件
  const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.senderType === "user";
    const isBot = message.senderType === "bot";

    // 處理訊息中的 https 連結
    const renderMessageWithLinks = (text: string) => {
      const httpsUrlRegex = /(https:\/\/[^\s]+)/g;
      const parts = text.split(httpsUrlRegex);

      // 檢查是否為內部連結的輔助函數
      const isInternalLink = (url: string): string | null => {
        for (const domain of INTERNAL_DOMAINS) {
          if (url.startsWith(domain)) {
            return domain;
          }
        }
        return null;
      };

      // 解析內部路徑的輔助函數
      const parseInternalPath = (url: string, domain: string): string => {
        try {
          const urlObj = new URL(url);
          // 保留路徑、查詢參數和 hash
          return urlObj.pathname + urlObj.search + urlObj.hash || "/";
        } catch {
          // 如果 URL 解析失敗，使用簡單的字符串替換
          return url.replace(domain, "") || "/";
        }
      };

      return parts.map((part, index) => {
        if (part.match(httpsUrlRegex)) {
          const matchedDomain = isInternalLink(part);

          if (matchedDomain) {
            // 內部連結：使用 React Router 導航
            const internalPath = parseInternalPath(part, matchedDomain);

            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  try {
                    navigate(internalPath, {
                      state: { skipAutoScroll: true },
                    });
                    // 可選：關閉客服聊天窗口，讓用戶專注於新頁面
                    // onClose();
                  } catch (error) {
                    console.error("導航錯誤:", error);
                    // 如果路由導航失敗，降級為外部連結
                    window.open(part, "_blank", "noopener,noreferrer");
                  }
                }}
                className={`cursor-pointer border-none bg-transparent p-0 text-left break-all underline transition-colors hover:opacity-80 ${
                  isUser ? "text-blue-100 hover:text-white" : "text-blue-600 hover:text-blue-800"
                }`}
                title={`內部連結: ${internalPath}`}
              >
                {part}
              </button>
            );
          } else {
            // 外部連結：使用傳統 a 標籤
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className={`break-all underline transition-colors hover:opacity-80 ${isUser ? "text-blue-100 hover:text-white" : "text-blue-600 hover:text-blue-800"}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                title={`外部連結: ${part}`}
              >
                {part}
              </a>
            );
          }
        }
        return <span key={index}>{part}</span>;
      });
    };

    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          {/* 頭像 */}
          <div className={`flex-shrink-0 ${isUser ? "ml-2" : "mr-2"}`}>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                isUser ? "bg-blue-500 text-white" : isBot ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}
            >
              {isUser ? <User className="h-4 w-4" /> : isBot ? <Bot className="h-4 w-4" /> : <div className="h-4 w-4 rounded-full bg-yellow-400" />}
            </div>
          </div>

          {/* 訊息內容 */}
          <div className={`${isUser ? "items-end" : "items-start"} flex flex-col`}>
            <div
              className={`max-w-full rounded-lg px-4 py-2 ${
                isUser ? "rounded-br-none bg-blue-500 text-white" : "rounded-bl-none bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm break-words whitespace-pre-wrap">{renderMessageWithLinks(message.messageText)}</p>
            </div>

            {/* 時間戳 */}
            <div className={`mt-1 text-xs text-gray-500 ${isUser ? "text-right" : "text-left"}`}>
              {new Date(message.createdAt).toLocaleTimeString("zh-TW", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="flex h-[500px] w-80 flex-col rounded-lg border border-gray-200 bg-white shadow-2xl">
      {/* 標題欄 */}
      <div className={`flex items-center justify-between rounded-t-lg border-b border-gray-200 p-4 ${isHumanMode ? "bg-yellow-50" : "bg-blue-50"}`}>
        <div className="flex items-center space-x-2">
          {isHumanMode ? <Headphones className="h-5 w-5 text-yellow-600" /> : <Bot className="h-5 w-5 text-blue-600" />}
          <div>
            <h6 className="font-semibold text-gray-800">{isHumanMode ? "人工客服" : "Tickeasy 客服"}</h6>
            <p className="text-xs text-gray-600">
              {isHumanMode ? "已轉接，等待客服回覆" : isConnected ? "在線服務" : "AI 服務暫不可用"}
              {session && !isHumanMode && (
                <span className="ml-2 rounded bg-green-100 px-2 py-1 text-xs text-green-600">
                  {session.status === "active"
                    ? "進行中"
                    : session.status === "waiting"
                      ? "等待中"
                      : session.status === "transferred"
                        ? "已轉接"
                        : "已結束"}
                </span>
              )}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 transition-colors hover:text-gray-600" aria-label="關閉客服">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* 內容區域 - 只保留聊天功能 */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          {/* 訊息列表 */}
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {messages.length === 0 ? (
              !isConnected && !isHumanMode ? (
                // AI 服務不可用 → 提示切換人工客服
                <div className="py-8 text-center">
                  <Headphones className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                  <p className="mb-2 font-semibold text-gray-800">AI 智能客服暫時無法使用</p>
                  <p className="mb-6 text-sm text-gray-500">您可以切換為人工客服，訊息將由真人客服於 Discord 回覆</p>
                  <button
                    onClick={() => switchToHuman(userId, initialCategory)}
                    disabled={isLoading}
                    className="inline-flex items-center space-x-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <Headphones className="h-4 w-4" />
                    <span>切換為人工客服</span>
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Bot className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p className="mb-4 text-gray-600">您好！我是 Tickeasy 智能客服</p>
                  <p className="mb-6 text-sm text-gray-500">請選擇以下問題或直接輸入您的問題：</p>

                  {/* 快速回覆選項 */}
                  <div className="grid gap-2">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.text)}
                        className="rounded-lg bg-gray-50 p-3 text-left text-sm transition-colors hover:bg-gray-100"
                        disabled={isLoading}
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <>
                {messages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}

                {/* 載入指示器 */}
                {isLoading && (
                  <div className="mb-4 flex justify-start">
                    <div className="flex max-w-[80%]">
                      <div className="mr-2 flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                          <Bot className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="rounded-lg rounded-bl-none bg-gray-100 px-4 py-2 text-gray-800">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.1s" }} />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 快速操作按鈕 */}
          {session && session.status === "active" && (
            <div className="border-t border-gray-100 px-4 py-2">
              <div className="flex space-x-2">
                {/* 轉人工按鈕 - 暫時隱藏 */}
                {/* <button
                    onClick={() => requestTransfer('用戶主動申請')}
                    className="flex items-center space-x-1 px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition-colors"
                    disabled={isLoading}
                  >
                    <span>📞</span>
                    <span>轉人工</span>
                  </button> */}
                {/* <button
                    onClick={() => setShowRating(true)}
                    className="flex items-center space-x-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                  >
                    <Star className="w-3 h-3" />
                    <span>結束評分</span>
                  </button> */}
              </div>
            </div>
          )}

          {/* 輸入區域 */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isHumanMode ? "輸入訊息發送給人工客服..." : isConnected ? "輸入您的問題..." : "AI 服務暫不可用，請切換為人工客服"}
                disabled={isLoading || (!isHumanMode && !isConnected)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim() || (!isHumanMode && !isConnected)}
                className="rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                aria-label="發送訊息"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 評分對話框 */}
      {showRating && (
        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-lg bg-black">
          <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">評價服務</h3>

            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-600">請為此次服務評分：</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}>
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="可選：留下您的意見..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={3}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRating(false)}
                className="flex-1 rounded-lg bg-gray-300 py-2 text-gray-700 transition-colors hover:bg-gray-400"
              >
                取消
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={rating === 0}
                className="flex-1 rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300"
              >
                提交
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerServiceChat;
