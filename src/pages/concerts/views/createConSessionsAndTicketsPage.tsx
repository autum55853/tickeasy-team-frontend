import { useState } from "react";
import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import Header from "@/core/components/global/header";
import { Button } from "@/core/components/ui/button";
import { Pencil, Trash2, Save, Calendar } from "lucide-react";
import { useConcertDraftStore } from "../store/useConcertDraftStore";
import { useNavigate } from "react-router-dom";
import { useSeattableUpload } from "../hook/useSeattableUpload";
import { Session, TicketType } from "@/pages/comm/types/Concert";
import { DateTimePicker } from "@/core/components/ui/datetimePicker";
import dayjs from "dayjs";
import { TicketTypeTable } from "../components/TicketTypeTable";
import { useSaveDraft } from "../hook/useSaveDraft";

export default function CreateConSessionsAndTicketsPage() {
  const { sessions } = useConcertDraftStore();
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
  const navigate = useNavigate();
  const { handleUploadSeattable } = useSeattableUpload();
  const { handleSaveDraft, handleSaveSession, handleTicketSave, handleAddSession, handleAddTicketType, handleDeleteSession, handleDeleteTicket } =
    useSaveDraft();

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
    handleSaveSession(id, editBuffer);
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

  const handleTicketSaveWrapper = (sessionId: string, ticketId: string) => {
    handleTicketSave(sessionId, ticketId, ticketEditBuffer);
    setEditingTicketId(null);
  };

  const handleAddSessionWrapper = () => {
    const newId = handleAddSession();
    setEditingSessionId(newId);
  };

  const handleAddTicketTypeWrapper = (sessionId: string) => {
    const newTicketId = handleAddTicketType(sessionId);
    setEditingTicketId(newTicketId);
    setExpandedTicketId(newTicketId);
  };

  const handleDeleteSessionWrapper = (sessionId: string) => {
    handleDeleteSession(sessionId);
  };

  const handleDeleteTicketWrapper = (sessionId: string, ticketId: string) => {
    handleDeleteTicket(sessionId, ticketId);
  };

  return (
    <>
      <Header />
      {/* Breadcrumb */}
      <div className="mt-24 w-full bg-[#f3f3f3] px-4 py-6">
        <h1 className="mx-auto max-w-7xl text-left text-2xl font-bold">舉辦演唱會</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-4">
        <nav className="flex items-center space-x-2 text-sm">
          <span className="font-medium text-blue-600">設定演唱會資料</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">設定場次及票種</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
          {/* 新增場次 */}
          <div className="absolute top-8 right-8">
            <Button variant="outline" className="rounded border border-[#2986cc] font-bold text-[#2986cc]" onClick={handleAddSessionWrapper}>
              新增場次
            </Button>
          </div>
          <div className="space-y-8 p-8">
            {/* 場次表格 */}
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-bold">序號</th>
                  <th className="py-2 text-left font-bold">場次名稱</th>
                  <th className="py-2 text-left font-bold">舉辦時間</th>
                  <th className="py-2 text-left font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, idx) => (
                  <>
                    <tr key={s.sessionId} className="border-b">
                      <td className="py-3">{String(idx + 1).padStart(2, "0")}</td>
                      <td>
                        {editingSessionId === s.sessionId ? (
                          <input
                            className="w-[120px] rounded border px-4 py-1 text-center"
                            value={editBuffer.sessionTitle}
                            onChange={(e) => setEditBuffer((buf) => ({ ...buf, sessionTitle: e.target.value }))}
                          />
                        ) : (
                          <span className="inline-block w-[120px] rounded border px-4 py-1 text-center">{s.sessionTitle}</span>
                        )}
                      </td>
                      <td>
                        {editingSessionId === s.sessionId ? (
                          <DateTimePicker
                            date={editBuffer.sessionDate ? new Date(editBuffer.sessionDate) : null}
                            setDate={(date) =>
                              setEditBuffer((buf) => ({
                                ...buf,
                                sessionDate: date ? dayjs(date).format("YYYY/MM/DD HH:mm") : "",
                              }))
                            }
                            placeholder="選擇日期時間"
                            inputClassName="w-[200px]"
                            format="YYYY-MM-DD HH:mm"
                          />
                        ) : (
                          <span className="inline-flex w-[200px] items-center justify-around rounded border px-4 py-1">
                            <Calendar className="h-4 w-4" />
                            {s.sessionDate}
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="border-black px-3 py-1 text-black"
                            onClick={() => setExpandedSessionId(expandedSessionId === s.sessionId ? null : s.sessionId)}
                          >
                            票種設定 <span className="ml-1">{expandedSessionId === s.sessionId ? "⌃" : "⌄"}</span>
                          </Button>
                          {editingSessionId === s.sessionId ? (
                            <Button variant="ghost" className="p-2" onClick={() => handleSave(s.sessionId)}>
                              <Save className="h-5 w-5" />
                            </Button>
                          ) : (
                            <Button variant="ghost" className="p-2" onClick={() => handleEdit(s)}>
                              <Pencil className="h-5 w-5" />
                            </Button>
                          )}
                          <Button variant="ghost" className="p-2" onClick={() => handleDeleteSessionWrapper(s.sessionId)}>
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {expandedSessionId === s.sessionId && (
                      <tr>
                        <td colSpan={4} className="m-4">
                          <div className="mb-4 flex flex-col items-center">
                            {s.imgSeattable ? (
                              <img src={s.imgSeattable} alt="座位圖" className="mb-2 h-32 w-auto rounded border object-contain" />
                            ) : (
                              <div className="my-4 text-gray-500">尚未上傳座位圖</div>
                            )}
                            <Button variant="outline" className="border-black text-black" onClick={() => handleUploadSeattable(s.sessionId)}>
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
                            handleTicketSave={handleTicketSaveWrapper}
                            handleDeleteTicket={handleDeleteTicketWrapper}
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
            {/* 按鈕 */}
            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" className="rounded border border-black text-black" onClick={() => navigate("/concert/create/info")}>
                上一步
              </Button>
              <Button variant="outline" className="rounded border-[#2986cc] bg-[#2986cc] text-white" onClick={handleSaveDraft}>
                儲存草稿
              </Button>
              <Button variant="outline" className="rounded border-[#2986cc] bg-[#2986cc] text-white">
                送審
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollTopBtn />
    </>
  );
}
