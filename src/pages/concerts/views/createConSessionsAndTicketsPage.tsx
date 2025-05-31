import { useState } from "react";
import Footer from "@/core/components/global/footer";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import { Upload } from "lucide-react";
import Header from "@/core/components/global/header";
import { Button } from "@/core/components/ui/button";
import { Pencil, Trash2, Save, Calendar } from "lucide-react";
import { useConcertDraftStore } from "../store/useConcertDraftStore";
import { useNavigate } from "react-router-dom";

type Ticket = {
  id: number;
  name: string;
  saleStart: string; // ISO string or "YYYY-MM-DDTHH:mm"
  saleEnd: string;
  price: string;
  quantity: string;
  entryMethod: string;
  ticketType: string;
  refundPolicy: string;
};
type Session = {
  id: number;
  name: string;
  date: string; // ISO string or "YYYY-MM-DDTHH:mm"
  tickets: Ticket[];
};

export default function CreateConSessionsAndTicketsPage() {
  const { sessions, setSessions, updateSession } = useConcertDraftStore();
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<{ name: string; date: string }>({ name: "", date: "" });
  const [expandedTicketId, setExpandedTicketId] = useState<number | null>(null);
  const [editingTicketId, setEditingTicketId] = useState<number | null>(null);
  const [ticketEditBuffer, setTicketEditBuffer] = useState<Partial<Ticket>>({});
  const navigate = useNavigate();

  const handleEdit = (s: Session) => {
    setEditingSessionId(s.id);
    setEditBuffer({ name: s.name, date: s.date });
  };

  const handleSave = (id: number) => {
    const session = sessions.find((s) => s.id === id);
    if (!session) return;

    updateSession({
      ...session,
      name: editBuffer.name,
      date: editBuffer.date,
    });
    setEditingSessionId(null);
  };

  const handleTicketEdit = (t: Ticket) => {
    setEditingTicketId(t.id);
    setTicketEditBuffer({ ...t });
  };

  const handleTicketSave = (sessionId: number, ticketId: number) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    const updatedTickets = session.tickets.map((t) => (t.id === ticketId ? { ...t, ...ticketEditBuffer } : t));

    updateSession({
      ...session,
      tickets: updatedTickets,
    });
    setEditingTicketId(null);
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
            <Button variant="outline" className="rounded border border-[#2986cc] font-bold text-[#2986cc]">
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
                    <tr key={s.id} className="border-b">
                      <td className="py-3">{String(idx + 1).padStart(2, "0")}</td>
                      <td>
                        {editingSessionId === s.id ? (
                          <input
                            className="w-[120px] rounded border px-4 py-1 text-center"
                            value={editBuffer.name}
                            onChange={(e) => setEditBuffer((buf) => ({ ...buf, name: e.target.value }))}
                          />
                        ) : (
                          <span className="inline-block w-[120px] rounded border px-4 py-1 text-center">{s.name}</span>
                        )}
                      </td>
                      <td>
                        {editingSessionId === s.id ? (
                          <input
                            type="datetime-local"
                            className="w-[200px] rounded border px-4 py-1"
                            value={editBuffer.date}
                            onChange={(e) => setEditBuffer((buf) => ({ ...buf, date: e.target.value }))}
                          />
                        ) : (
                          <span className="inline-flex w-[200px] items-center rounded border px-4 py-1">
                            <Calendar className="mr-2 h-4 w-4" />
                            {s.date}
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="border-black px-3 py-1 text-black"
                            onClick={() => setExpandedSessionId(expandedSessionId === s.id ? null : s.id)}
                          >
                            票種設定 <span className="ml-1">{expandedSessionId === s.id ? "⌃" : "⌄"}</span>
                          </Button>
                          {editingSessionId === s.id ? (
                            <Button variant="ghost" className="p-2" onClick={() => handleSave(s.id)}>
                              <Save className="h-5 w-5" />
                            </Button>
                          ) : (
                            <Button variant="ghost" className="p-2" onClick={() => handleEdit(s)}>
                              <Pencil className="h-5 w-5" />
                            </Button>
                          )}
                          <Button variant="ghost" className="p-2">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {expandedSessionId === s.id && (
                      <tr>
                        <td colSpan={4} className="p-0">
                          {/* 票種表格 */}
                          <div className="m-4 border border-black">
                            <table className="w-full">
                              <thead>
                                <tr>
                                  <th className="border-b p-2 text-left">票種名稱</th>
                                  <th className="border-b p-2 text-left">販售時間</th>
                                  <th className="border-b p-2 text-left">價格</th>
                                  <th className="border-b p-2 text-left">數量</th>
                                  <th className="border-b p-2"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {s.tickets.map((t) => (
                                  <>
                                    <tr key={t.id}>
                                      <td className="p-2 text-blue-700">
                                        {editingTicketId === t.id ? (
                                          <input
                                            type="text"
                                            className="w-[80px] rounded border px-2 py-1"
                                            value={ticketEditBuffer.name}
                                            onChange={(e) => setTicketEditBuffer((buf) => ({ ...buf, name: e.target.value }))}
                                          />
                                        ) : (
                                          t.name
                                        )}
                                      </td>
                                      <td className="p-2">
                                        {editingTicketId === t.id ? (
                                          <div className="flex gap-2">
                                            <input
                                              type="datetime-local"
                                              className="w-[150px] rounded border px-2 py-1"
                                              value={ticketEditBuffer.saleStart}
                                              onChange={(e) => setTicketEditBuffer((buf) => ({ ...buf, saleStart: e.target.value }))}
                                            />
                                            <span>~</span>
                                            <input
                                              type="datetime-local"
                                              className="w-[150px] rounded border px-2 py-1"
                                              value={ticketEditBuffer.saleEnd}
                                              onChange={(e) => setTicketEditBuffer((buf) => ({ ...buf, saleEnd: e.target.value }))}
                                            />
                                          </div>
                                        ) : (
                                          `${t.saleStart} ~ ${t.saleEnd}`
                                        )}
                                      </td>
                                      <td className="p-2">
                                        {editingTicketId === t.id ? (
                                          <input
                                            type="text"
                                            className="w-[80px] rounded border px-2 py-1"
                                            value={ticketEditBuffer.price}
                                            onChange={(e) => setTicketEditBuffer((buf) => ({ ...buf, price: e.target.value }))}
                                          />
                                        ) : (
                                          <>NT$ {t.price}</>
                                        )}
                                      </td>
                                      <td className="p-2">
                                        {editingTicketId === t.id ? (
                                          <input
                                            type="text"
                                            className="w-[60px] rounded border px-2 py-1"
                                            value={ticketEditBuffer.quantity}
                                            onChange={(e) => setTicketEditBuffer((buf) => ({ ...buf, quantity: e.target.value }))}
                                          />
                                        ) : (
                                          t.quantity
                                        )}
                                      </td>
                                      <td className="flex items-center gap-2 p-2">
                                        {editingTicketId === t.id ? (
                                          <Button variant="ghost" className="p-2" onClick={() => handleTicketSave(s.id, t.id)}>
                                            <Save className="h-5 w-5" />
                                          </Button>
                                        ) : (
                                          <Button variant="ghost" className="p-2" onClick={() => handleTicketEdit(t)}>
                                            <Pencil className="h-5 w-5" />
                                          </Button>
                                        )}
                                        <Button variant="ghost" className="p-2">
                                          <Trash2 className="h-5 w-5" />
                                        </Button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={5} className="border-t p-2">
                                        <div
                                          className="mb-1 cursor-pointer font-medium select-none"
                                          onClick={() => setExpandedTicketId(expandedTicketId === t.id ? null : t.id)}
                                        >
                                          票券資訊 <span className="ml-1">{expandedTicketId === t.id ? "⌃" : "⌄"}</span>
                                        </div>
                                        {expandedTicketId === t.id && (
                                          <div className="border p-2">
                                            {editingTicketId === t.id ? (
                                              <div className="space-y-2">
                                                <div>
                                                  <label className="block text-sm font-medium">* 入場方式：</label>
                                                  <input
                                                    className="w-full rounded border px-2 py-1"
                                                    value={ticketEditBuffer.entryMethod}
                                                    onChange={(e) =>
                                                      setTicketEditBuffer((buf: Partial<Ticket>) => ({ ...buf, entryMethod: e.target.value }))
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <label className="block text-sm font-medium">* 票券類型：</label>
                                                  <input
                                                    className="w-full rounded border px-2 py-1"
                                                    value={ticketEditBuffer.ticketType}
                                                    onChange={(e) =>
                                                      setTicketEditBuffer((buf: Partial<Ticket>) => ({ ...buf, ticketType: e.target.value }))
                                                    }
                                                  />
                                                </div>
                                                <div>
                                                  <label className="block text-sm font-medium">* 退換票須知：</label>
                                                  <input
                                                    className="w-full rounded border px-2 py-1"
                                                    value={ticketEditBuffer.refundPolicy}
                                                    onChange={(e) =>
                                                      setTicketEditBuffer((buf: Partial<Ticket>) => ({ ...buf, refundPolicy: e.target.value }))
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="space-y-1">
                                                <div>* 入場方式：{t.entryMethod}</div>
                                                <div>* 票券類型：{t.ticketType}</div>
                                                <div>* 退換票須知：{t.refundPolicy}</div>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                ))}
                              </tbody>
                            </table>
                            <div className="flex justify-end p-2">
                              <Button variant="outline" className="border-black text-black">
                                新增票種
                              </Button>
                            </div>
                          </div>
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
              <Button variant="outline" className="rounded border-[#2986cc] bg-[#2986cc] text-white">
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
