import React, { useRef, useEffect, useState } from "react";
import Header from "@/core/components/global/header";
import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import { Button } from "@/core/components/ui/button";
import { ArrowRight } from "lucide-react";
import "@/core/styles/singleConcertPage.css";
import { ConcertResponse } from "@/pages/comm/types/Concert";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useConcertStore } from "../store/useConcertStore";
import { LexicalViewer } from "@/core/components/ui/LexicalViewer";

export default function SingleConcertPage() {
  const { concertId } = useParams();
  const navigate = useNavigate();
  const incrementVisitCount = useConcertStore((state) => state.incrementVisitCount);
  const [concert, setConcert] = useState<ConcertResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get<ConcertResponse>(`${import.meta.env.VITE_API_BASE_URL}/api/v1/concerts/${concertId}`);
        if (response.data.status !== "success" || !response.data.data) {
          navigate("/404");
          return;
        }
        setConcert(response.data.data);
        if (concertId) {
          await incrementVisitCount(concertId);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            navigate("/404");
            return;
          } else if (err.response?.status === 401) {
            setError("請先登入以查看演唱會資訊");
          } else if (err.code === "ECONNABORTED") {
            setError("連線超時，請稍後再試");
          } else if (!err.response) {
            setError("無法連接到伺服器，請檢查網路連線");
          } else {
            setError(`取得演唱會資訊失敗 (${err.response.status})`);
          }
        } else {
          setError("發生未知錯誤，請稍後再試");
        }
        console.error("Concert fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, [concertId, navigate, incrementVisitCount]);

  const tabOptions = [
    { label: "活動場次", ref: sessionsRef },
    { label: "簡介", ref: introRef },
    { label: "節目資訊", ref: infoRef },
    { label: "購票方式", ref: buyRef },
    { label: "注意事項", ref: noticeRef },
  ];
  const [selectedTab, setSelectedTab] = React.useState(tabOptions[0].label);

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const idx = tabOptions.findIndex((opt) => opt.label === e.target.value);
    setSelectedTab(e.target.value);
    tabOptions[idx].ref.current?.scrollIntoView({ behavior: "smooth" });
  }

  function isLexicalJson(str: string) {
    try {
      const obj = JSON.parse(str);
      return obj && typeof obj === "object" && obj.root;
    } catch {
      return false;
    }
  }

  function renderContent(content: string) {
    if (isLexicalJson(content)) {
      return <LexicalViewer content={content} />;
    }
    return content;
  }

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-red-500">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            重新整理
          </button>
        </div>
      </div>
    );
  if (!concert) {
    navigate("/404");
    return null;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string | null | undefined) => {
    if (!timeStr) return "--:--";
    return timeStr.split(":").slice(0, 2).join(":");
  };

  // eventStartDate 或 eventEndDate 缺失就導向 404
  if (!concert.eventStartDate || !concert.eventEndDate) {
    navigate("/404");
    return null;
  }

  return (
    <>
      <Header />
      {/* 演唱會Banner */}
      <div
        className="concert-banner mx-auto mt-24 h-[700px] max-w-[95vw] rounded-[24px] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${concert.imgBanner})` }}
      />
      {/* 跳轉頁籤 */}
      {/* mobile 下拉選單 */}
      <div className="mx-auto my-6 block w-full max-w-[400px] md:hidden">
        <select className="w-full rounded border border-slate-200 bg-white p-2 text-lg" value={selectedTab} onChange={handleSelectChange}>
          {tabOptions.map((opt) => (
            <option key={opt.label} value={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {/* desktop tab bar */}
      <div className="mx-auto my-12 hidden min-h-[85px] w-full max-w-[1296px] items-center justify-around space-x-4 rounded-[6px] bg-slate-100 p-3 md:flex">
        {tabOptions.map((opt) => (
          <Button
            key={opt.label}
            onClick={() => {
              setSelectedTab(opt.label);
              opt.ref.current?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="concertPageTab"
          >
            {opt.label}
          </Button>
        ))}
      </div>
      {/* 簡介 */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div ref={introRef} className="scroll-mt-24">
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">{concert.conTitle}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{renderContent(concert.conIntroduction)}</p>
          </div>
        </div>
        <div ref={infoRef} className="scroll-mt-24">
          {/* 節目資訊 */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">節目資訊</h3>
            <div className="space-y-6 text-base text-gray-800">
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 font-semibold">演唱會地點：</span>
                  <span>{concert.conLocation}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold">演唱會場次：</span>
                  <span>{formatDate(concert.eventStartDate)}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold">演唱會舉辦區間：</span>
                  <span>
                    {formatTime(concert.eventStartDate)} - {formatTime(concert.eventEndDate)}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2 text-lg font-bold text-blue-700">票價區間</div>
                <div className="space-y-2">
                  {Array.from(new Set(concert.sessions[0].ticketTypes.map((ticket) => `${ticket.ticketTypeName}-${ticket.ticketTypePrice}`))).map(
                    (ticketKey) => {
                      const [name, price] = ticketKey.split("-");
                      const ticket = concert.sessions[0].ticketTypes.find((t) => t.ticketTypeName === name && t.ticketTypePrice.toString() === price);
                      return (
                        <div key={ticket?.ticketTypeId} className="flex">
                          <span className="w-32 font-semibold">{name}：</span>
                          <span>NT${parseFloat(price).toLocaleString()}</span>
                          {ticket?.ticketBenefits && <span className="ml-2 text-sm text-gray-500">({ticket.ticketBenefits})</span>}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="mb-2 text-lg font-bold text-blue-700">開始售票時間</div>
                {concert.sessions.map((session) => (
                  <div key={session.sessionId} className="space-y-2">
                    <div className="font-semibold text-gray-700">{formatDate(session.sessionDate)}</div>
                    {session.ticketTypes.map((ticket) => (
                      <div key={ticket.ticketTypeId} className="flex pl-4">
                        <span className="w-32 font-semibold">{ticket.ticketTypeName}：</span>
                        <span>
                          {formatDate(ticket.sellBeginDate)} {formatTime(ticket.sellBeginDate.split("T")[1])}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div ref={buyRef} className="scroll-mt-24">
          {/* 購票方式 */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">購票方式</h3>
            <div className="space-y-6 text-base text-gray-800">
              <div>{renderContent(concert.ticketPurchaseMethod)}</div>
            </div>
          </div>
        </div>
        <div ref={noticeRef} className="scroll-mt-24">
          {/* 注意事項 */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">注意事項</h3>
            <div className="space-y-6 text-base text-gray-800">
              <div>{renderContent(concert.precautions)}</div>
              <div>
                <div className="mb-2 text-lg font-bold text-blue-700">退票注意事項</div>
                <div>{renderContent(concert.refundPolicy)}</div>
              </div>
            </div>
          </div>
        </div>

        <div ref={sessionsRef} className="flex scroll-mt-24 flex-col items-center gap-4">
          {/* 活動場次 */}
          {concert.sessions.map((session) => (
            <div
              key={session.sessionId}
              className="w-full max-w-lg rounded-2xl border"
              style={{
                borderColor: "#2A7AC0",
                background: "#FFF",
              }}
            >
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="text-gray-200">
                    <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                      <rect x="6" y="10" width="36" height="32" rx="6" fill="#F3F4F6" />
                      <rect x="6" y="10" width="36" height="32" rx="6" stroke="#E5E7EB" strokeWidth="2" />
                      <rect x="14" y="4" width="4" height="12" rx="2" fill="#E5E7EB" />
                      <rect x="30" y="4" width="4" height="12" rx="2" fill="#E5E7EB" />
                      <circle cx="16" cy="24" r="2" fill="#E5E7EB" />
                      <circle cx="24" cy="24" r="2" fill="#E5E7EB" />
                      <circle cx="32" cy="24" r="2" fill="#E5E7EB" />
                      <circle cx="16" cy="32" r="2" fill="#E5E7EB" />
                      <circle cx="24" cy="32" r="2" fill="#E5E7EB" />
                      <circle cx="32" cy="32" r="2" fill="#E5E7EB" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatDate(session.sessionDate)} {formatTime(session.sessionStart)}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-blue-600">
                      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7" stroke="#2A7AC0" strokeWidth="2" />
                        <circle cx="8" cy="8" r="2" fill="#2A7AC0" />
                      </svg>
                      {concert.conLocation}
                    </div>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2 rounded-full bg-[#2A7AC0] px-8 hover:bg-[#2563eb]"
                  onClick={() => navigate(`/concert/buyTicket/${concertId}`)}
                >
                  下一步 <ArrowRight className="ml-1" size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ScrollTopBtn />
    </>
  );
}
