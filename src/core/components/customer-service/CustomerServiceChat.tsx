import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Clock, 
  Star, 
  Phone, 
  Search,
  BookOpen,
  X
} from 'lucide-react';
import { useCustomerService, useKnowledgeSearch } from '@/core/hooks/useCustomerService';
import { useCustomerServiceQuickReplies } from '@/store/customer-service';
import { Message } from '@/core/types/customer-service';

interface CustomerServiceChatProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  userInfo?: Record<string, any>;
  initialCategory?: string;
  initialMessage?: string;
}

const CustomerServiceChat: React.FC<CustomerServiceChatProps> = ({
  isOpen,
  onClose,
  userId,
  userInfo,
  initialCategory = '一般諮詢',
  initialMessage,
}) => {
  const {
    messages,
    session,
    isLoading,
    isConnected,
    quickReply,
    startSession,
    sendMessage,
    requestTransfer,
    closeSession,
    markAsRead,
  } = useCustomerService();

  const quickReplies = useCustomerServiceQuickReplies();
  const { search, searchResults, isSearching } = useKnowledgeSearch();

  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'search' | 'faq'>('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自動滾動到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    setInputValue('');

    if (!session) {
      await startSession(message, initialCategory, userId);
    } else {
      await sendMessage(message);
    }
  };

  // 處理快速回覆
  const handleQuickReply = async (text: string) => {
    if (!session) {
      await startSession(text, initialCategory, userId);
    } else {
      await sendMessage(text);
    }
  };

  // 處理知識庫搜尋
  const handleSearch = () => {
    if (searchQuery.trim()) {
      search(searchQuery, { limit: 5, threshold: 0.7 });
    }
  };

  // 處理評分提交
  const handleRatingSubmit = async () => {
    if (session && rating > 0) {
      await closeSession(rating, ratingComment);
      setShowRating(false);
      setRating(0);
      setRatingComment('');
    }
  };

  // 處理鍵盤事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (activeTab === 'chat') {
        handleSendMessage();
      } else if (activeTab === 'search') {
        handleSearch();
      }
    }
  };

  // 訊息組件
  const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.senderType === 'user';
    const isBot = message.senderType === 'bot';

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* 頭像 */}
          <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUser 
                ? 'bg-blue-500 text-white' 
                : isBot 
                ? 'bg-green-500 text-white'
                : 'bg-gray-500 text-white'
            }`}>
              {isUser ? <User className="w-4 h-4" /> : 
               isBot ? <Bot className="w-4 h-4" /> : 
               <div className="w-4 h-4 bg-yellow-400 rounded-full" />}
            </div>
          </div>

          {/* 訊息內容 */}
          <div className={`${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
            <div className={`px-4 py-2 rounded-lg max-w-full ${
              isUser 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.messageText}
              </p>
              
              {/* 元數據顯示 */}
              {message.metadata && !isUser && (
                <div className="text-xs text-gray-500 mt-1 space-y-1">
                  {message.metadata.confidence && (
                    <div>信心度: {(message.metadata.confidence * 100).toFixed(0)}%</div>
                  )}
                  {message.metadata.strategy && (
                    <div>策略: {message.metadata.strategy}</div>
                  )}
                </div>
              )}
            </div>
            
            {/* 時間戳 */}
            <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
              {new Date(message.createdAt).toLocaleTimeString('zh-TW', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* 標題欄 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-800">Tickeasy 客服</h3>
            <p className="text-xs text-gray-600">
              {isConnected ? '在線服務' : '連接中斷'}
              {session && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                  {session.status === 'active' ? '進行中' : 
                   session.status === 'waiting' ? '等待中' : 
                   session.status === 'transferred' ? '已轉接' : '已結束'}
                </span>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="關閉客服"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 標籤導航 */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 px-3 text-sm font-medium ${
            activeTab === 'chat' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          對話
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-2 px-3 text-sm font-medium ${
            activeTab === 'search' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          搜尋
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex-1 py-2 px-3 text-sm font-medium ${
            activeTab === 'faq' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          常見
        </button>
      </div>

      {/* 內容區域 */}
      <div className="flex-1 overflow-hidden">
        {/* 聊天標籤 */}
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            {/* 訊息列表 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">您好！我是 Tickeasy 智能客服</p>
                  <p className="text-sm text-gray-500 mb-6">請選擇以下問題或直接輸入您的問題：</p>
                  
                  {/* 快速回覆選項 */}
                  <div className="grid gap-2">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.text)}
                        className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                        disabled={isLoading}
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                  ))}
                  
                  {/* 載入指示器 */}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="flex max-w-[80%]">
                        <div className="flex-shrink-0 mr-2">
                          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                            <Bot className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
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
            {session && session.status === 'active' && (
              <div className="px-4 py-2 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => requestTransfer('用戶主動申請')}
                    className="flex items-center space-x-1 px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition-colors"
                    disabled={isLoading}
                  >
                    <Phone className="w-3 h-3" />
                    <span>轉人工</span>
                  </button>
                  <button
                    onClick={() => setShowRating(true)}
                    className="flex items-center space-x-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                  >
                    <Star className="w-3 h-3" />
                    <span>結束評分</span>
                  </button>
                </div>
              </div>
            )}

            {/* 輸入區域 */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isConnected ? "輸入您的問題..." : "連接中斷，請稍後再試"}
                  disabled={isLoading || !isConnected}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim() || !isConnected}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  aria-label="發送訊息"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 搜尋標籤 */}
        {activeTab === 'search' && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="搜尋知識庫..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {isSearching ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">搜尋中...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <h4 className="font-medium text-gray-800 text-sm">{result.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {result.content.substring(0, 100)}...
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          相似度: {(result.similarity * 100).toFixed(0)}%
                        </span>
                        <button
                          onClick={() => {
                            setActiveTab('chat');
                            handleQuickReply(`請詳細說明：${result.title}`);
                          }}
                          className="text-blue-600 text-xs hover:underline"
                        >
                          詢問詳情
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-sm">輸入關鍵字搜尋相關資訊</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 常見問題標籤 */}
        {activeTab === 'faq' && (
          <div className="h-full overflow-y-auto p-4">
            <div className="space-y-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab('chat');
                    handleQuickReply(reply.text);
                  }}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span>{reply.text}</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {reply.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 評分對話框 */}
      {showRating && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">評價服務</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">請為此次服務評分：</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRating(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={rating === 0}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
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
