import { useState, useEffect } from "react";
import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import Header from "@/core/components/global/header";
import { Button } from "@/core/components/ui/button";
import { Pencil, Trash2, Save, Calendar } from "lucide-react";
import { useConcertStore } from "../store/useConcertStore";
import { useNavigate, useSearchParams, useLocation, useParams } from "react-router-dom";
import { useSeattableUpload } from "../hook/useSeattableUpload";
import { Session, TicketType } from "@/pages/comm/types/Concert";
import dayjs from "dayjs";
import { TicketTypeTable } from "../components/TicketTypeTable";
import { BackToListButton } from "../components/BackToListButton";
import { useToast } from "@/core/hooks/useToast";
import { SingleDatePicker } from "@/core/components/ui/singleDatePicker";
import { TimeOnlyPicker } from "@/core/components/ui/timeOnlyPicker";

export default function CreateConSessionsAndTicketsPage() {
  const { sessions, info, setInfo, updateSession, addSession, deleteSession, addTicket, deleteTicket, saveDraft } = useConcertStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { concertId: urlConcertId } = useParams();
  const isEditMode = location.pathname.includes("/edit/");
  const concertId = isEditMode ? urlConcertId : searchParams.get("concertId");
  const companyId = searchParams.get("companyId");

  // UI 狀態
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<{ sessionTitle: string; sessionDate: string; sessionStart: string; sessionEnd: string }>({
    sessionTitle: "",
    sessionDate: "",
    sessionStart: "",
    sessionEnd: "",
  });
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [ticketEditBuffer, setTicketEditBuffer] = useState<Partial<TicketType>>({});
  const { handleUploadSeattable } = useSeattableUpload();
  const { toast } = useToast();

  useEffect(() => {
    if (!concertId) {
      toast({
        title: "錯誤",
        description: "請先儲存草稿再設定場次",
        variant: "destructive",
      });
      const backPath = isEditMode ? `/concert/edit/${urlConcertId}/info` : `/concert/create/info?companyId=${companyId}`;
      navigate(backPath);
      return;
    }

    if (concertId !== info.concertId) {
      setInfo({ concertId });
    }
  }, [concertId, companyId, info.concertId, navigate, setInfo, toast, isEditMode, urlConcertId]);

  useEffect(() => {
    if (concertId) {
      useConcertStore.getState().getConcert(concertId);
    }
  }, [concertId]);

  // UI 處理函數
  const handleEdit = (s: Session) => {
    setEditingSessionId(s.sessionId);
    setEditBuffer({
      sessionTitle: s.sessionTitle,
      sessionDate: s.sessionDate,
      sessionStart: s.sessionStart,
      sessionEnd: s.sessionEnd,
    });
  };

  const handleSave = (id: string) => {
    updateSession({
      sessionId: id,
      sessionDate: editBuffer.sessionDate,
      sessionStart: editBuffer.sessionStart,
      sessionEnd: editBuffer.sessionEnd,
      sessionTitle: editBuffer.sessionTitle,
    });
    setEditingSessionId(null);
  };

  const handleTicketEdit = (t: TicketType) => {
    setEditingTicketId(t.ticketTypeId);
    setTicketEditBuffer({
      ticketTypeId: t.ticketTypeId,
      concertSessionId: t.concertSessionId,
      ticketTypeName: t.ticketTypeName,
      sellBeginDate: t.sellBeginDate,
      sellEndDate: t.sellEndDate,
      ticketTypePrice: t.ticketTypePrice,
      totalQuantity: t.totalQuantity,
      entranceType: t.entranceType,
      ticketBenefits: t.ticketBenefits,
      ticketRefundPolicy: t.ticketRefundPolicy,
    });
  };

  const handleTicketSave = (sessionId: string, ticketId: string) => {
    const session = sessions.find((s) => s.sessionId === sessionId);
    if (!session) return;

    const updatedTickets = session.ticketTypes.map((t) => (t.ticketTypeId === ticketId ? { ...t, ...ticketEditBuffer } : t));

    updateSession({
      sessionId,
      ticketTypes: updatedTickets,
    });
    setEditingTicketId(null);
  };

  const handleAddSessionWrapper = () => {
    const newSession: Session = {
      sessionId: `tmp-${Date.now()}`,
      concertId: info.concertId,
      sessionTitle: "",
      sessionDate: "",
      sessionStart: "",
      sessionEnd: "",
      imgSeattable: "",
      createdAt: new Date().toISOString(),
      ticketTypes: [],
    };
    addSession(newSession);
    setEditingSessionId(newSession.sessionId);
  };

  const handleAddTicketTypeWrapper = (sessionId: string) => {
    const newTicketId = `tmp-${Date.now()}`;
    const newTicket: TicketType = {
      ticketTypeId: newTicketId,
      concertSessionId: sessionId,
      ticketTypeName: "",
      sellBeginDate: "",
      sellEndDate: "",
      ticketTypePrice: 0,
      totalQuantity: 0,
      entranceType: "",
      ticketBenefits: "",
      ticketRefundPolicy: "",
      remainingQuantity: 0,
      createdAt: new Date().toISOString(),
    };
    addTicket(sessionId, newTicket);
    setEditingTicketId(newTicketId);
    setExpandedTicketId(newTicketId);
  };

  const handleSaveDraftWrapper = async () => {
    try {
      const result = await saveDraft();
      if (result?.concertId) {
        const queryParams = new URLSearchParams(window.location.search);
        const companyId = queryParams.get("companyId");
        const newQueryParams = new URLSearchParams();

        if (companyId) {
          newQueryParams.set("companyId", companyId);
        }
        newQueryParams.set("concertId", result.concertId);

        window.history.replaceState({}, "", `?${newQueryParams.toString()}`);
      }
    } catch (error) {
      console.error("儲存草稿失敗:", error);
    }
  };

  const handleBack = () => {
    const backPath = isEditMode
      ? `/concert/edit/${concertId}/info?tab=concertList`
      : `/concert/create/info?${new URLSearchParams({ concertId: info.concertId || "", companyId: companyId || "", tab: "concertList" }).toString()}`;
    navigate(backPath);
  };

  const handleSubmit = async () => {
    try {
      const { info, saveDraft, submitConcert } = useConcertStore.getState();

      let concertId = info.concertId;

      // 如果沒有 concertId，先儲存草稿
      if (!concertId) {
        const result = await saveDraft();
        if (!result?.concertId) {
          throw new Error("儲存草稿失敗");
        }
        concertId = result.concertId; // 使用 saveDraft 回傳的 concertId
      }

      // 使用確定的 concertId 來送審
      await submitConcert(concertId);
      toast({
        title: "成功",
        description: "送審成功",
      });
    } catch (error) {
      console.error("送審失敗:", error);
      toast({
        title: "錯誤",
        description: error instanceof Error ? error.message : "送審失敗",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Header />
      {/* Breadcrumb */}
      <div className="mt-24 w-full bg-[#f3f3f3] px-2 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2 sm:gap-6">
            <BackToListButton companyId={companyId} isEditMode={isEditMode} />
            <div className="hidden h-6 border-l border-gray-300 sm:block" />
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{isEditMode ? "編輯演唱會" : "舉辦演唱會"}</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-2 pt-4 pb-2 sm:px-4 sm:pt-6 sm:pb-4">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm">
          <span className="font-medium text-blue-600">設定演唱會資料</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">設定場次及票種</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-2 pb-8 sm:px-4 sm:pb-12 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
          {/* 新增場次 */}
          <div className="absolute top-4 right-2 sm:top-8 sm:right-8">
            <Button
              variant="outline"
              className="rounded border border-[#2986cc] px-2 py-1 text-xs font-bold text-[#2986cc] sm:px-3 sm:py-2 sm:text-sm"
              onClick={handleAddSessionWrapper}
            >
              新增場次
            </Button>
          </div>
          <div className="space-y-4 p-4 sm:space-y-8 sm:p-8">
            {/* 場次表格 */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[375px] border-separate border-spacing-0">
                <thead>
                  <tr className="border-b">
                    <th className="w-[40px] py-2 text-left text-xs font-bold sm:w-[60px] sm:text-sm">序號</th>
                    <th className="w-[100px] py-2 text-left text-xs font-bold sm:w-[120px] sm:text-sm">場次名稱</th>
                    <th className="py-2 text-left text-xs font-bold sm:text-sm">舉辦時間</th>
                    <th className="w-[100px] py-2 text-left text-xs font-bold sm:w-[120px] sm:text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s, idx) => (
                    <>
                      <tr key={s.sessionId} className="border-b">
                        <td className="py-2 text-xs sm:py-3 sm:text-sm">{String(idx + 1).padStart(2, "0")}</td>
                        <td>
                          {editingSessionId === s.sessionId ? (
                            <input
                              className="w-full rounded border px-2 py-1 text-center text-xs sm:w-[120px] sm:text-sm"
                              value={editBuffer.sessionTitle}
                              onChange={(e) => setEditBuffer((buf) => ({ ...buf, sessionTitle: e.target.value }))}
                            />
                          ) : (
                            <span className="inline-block w-full rounded border px-2 py-1 text-center text-xs sm:w-[120px] sm:text-sm">
                              {s.sessionTitle}
                            </span>
                          )}
                        </td>
                        <td>
                          {editingSessionId === s.sessionId ? (
                            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-2">
                              <SingleDatePicker
                                date={editBuffer.sessionDate ? new Date(editBuffer.sessionDate) : null}
                                setDate={(date) =>
                                  setEditBuffer((buf) => ({
                                    ...buf,
                                    sessionDate: date ? dayjs(date).format("YYYY-MM-DD") : "",
                                  }))
                                }
                                placeholder="選擇日期"
                                inputClassName="w-full text-xs sm:text-sm lg:w-[130px]"
                              />
                              <TimeOnlyPicker
                                value={editBuffer.sessionStart}
                                onChange={(time: string) => setEditBuffer((buf) => ({ ...buf, sessionStart: time }))}
                                placeholder="開始時間"
                                inputClassName="w-full text-xs sm:text-sm lg:w-[110px]"
                              />
                              <TimeOnlyPicker
                                value={editBuffer.sessionEnd}
                                onChange={(time: string) => setEditBuffer((buf) => ({ ...buf, sessionEnd: time }))}
                                placeholder="結束時間"
                                inputClassName="w-full text-xs sm:text-sm lg:w-[110px]"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-2">
                              <span className="inline-flex w-full items-center justify-around rounded border px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm lg:w-[130px] lg:px-2 lg:py-0.5">
                                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-3.5 lg:w-3.5" />
                                {s.sessionDate}
                              </span>
                              <span className="inline-flex w-full items-center justify-around rounded border px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm lg:w-[110px] lg:px-2 lg:py-0.5">
                                {s.sessionStart}
                              </span>
                              <span className="inline-flex w-full items-center justify-around rounded border px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm lg:w-[110px] lg:px-2 lg:py-0.5">
                                {s.sessionEnd}
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="flex min-w-[100px] flex-col items-end gap-1 sm:min-w-[120px] sm:flex-row sm:items-center sm:gap-2">
                            <Button
                              variant="outline"
                              className="w-full border-black px-2 py-1 text-xs whitespace-nowrap text-black sm:w-auto sm:px-3 sm:text-sm"
                              onClick={() => setExpandedSessionId(expandedSessionId === s.sessionId ? null : s.sessionId)}
                            >
                              票種設定 <span className="ml-0.5">{expandedSessionId === s.sessionId ? "⌃" : "⌄"}</span>
                            </Button>
                            <div className="flex items-center gap-1">
                              {editingSessionId === s.sessionId ? (
                                <Button variant="ghost" className="h-7 w-7 p-1 sm:h-8 sm:w-8 sm:p-2" onClick={() => handleSave(s.sessionId)}>
                                  <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                              ) : (
                                <Button variant="ghost" className="h-7 w-7 p-1 sm:h-8 sm:w-8 sm:p-2" onClick={() => handleEdit(s)}>
                                  <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" className="h-7 w-7 p-1 sm:h-8 sm:w-8 sm:p-2" onClick={() => deleteSession(s.sessionId)}>
                                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {expandedSessionId === s.sessionId && (
                        <tr>
                          <td colSpan={4} className="p-2 sm:p-4">
                            <div className="mb-4 flex flex-col items-center">
                              {s.imgSeattable ? (
                                <img src={s.imgSeattable} alt="座位圖" className="mb-2 h-24 w-auto rounded border object-contain sm:h-32" />
                              ) : (
                                <div className="my-2 text-xs text-gray-500 sm:my-4 sm:text-sm">尚未上傳座位圖</div>
                              )}
                              <Button
                                variant="outline"
                                className="border-black px-2 py-1 text-xs text-black sm:px-3 sm:py-2 sm:text-sm"
                                onClick={() => handleUploadSeattable(s.sessionId)}
                              >
                                上傳座位圖
                              </Button>
                            </div>
                            <TicketTypeTable
                              session={s}
                              editingTicketId={editingTicketId}
                              expandedTicketId={expandedTicketId}
                              ticketEditBuffer={ticketEditBuffer}
                              setTicketEditBuffer={setTicketEditBuffer}
                              handleTicketEdit={handleTicketEdit}
                              handleTicketSave={handleTicketSave}
                              handleDeleteTicket={deleteTicket}
                              handleAddTicketType={handleAddTicketTypeWrapper}
                              setExpandedTicketId={setExpandedTicketId}
                            />
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 按鈕 */}
            <div className="mt-4 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <Button
                variant="outline"
                className="w-full rounded border border-black px-2 py-1 text-xs text-black sm:w-auto sm:px-3 sm:py-2 sm:text-sm"
                onClick={handleBack}
              >
                上一步
              </Button>
              <div className="flex gap-2 sm:gap-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded border-[#2986cc] bg-[#2986cc] px-2 py-1 text-xs text-white sm:flex-none sm:px-3 sm:py-2 sm:text-sm"
                  onClick={handleSaveDraftWrapper}
                >
                  {isEditMode ? "儲存變更" : "儲存草稿"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded border-[#2986cc] bg-[#2986cc] px-2 py-1 text-xs text-white sm:flex-none sm:px-3 sm:py-2 sm:text-sm"
                  onClick={handleSubmit}
                >
                  送審
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollTopBtn />
    </>
  );
}
