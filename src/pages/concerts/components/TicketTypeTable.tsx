import { Button } from "@/core/components/ui/button";
import { DateTimePicker } from "@/core/components/ui/datetimePicker";
import { Pencil, Save, Trash2 } from "lucide-react";
import { Session, TicketType } from "@/pages/comm/types/Concert";

interface TicketTypeTableProps {
  session: Session;
  editingTicketId: string | null;
  expandedTicketId: string | null;
  ticketEditBuffer: Partial<TicketType>;
  setTicketEditBuffer: (buffer: Partial<TicketType> | ((prev: Partial<TicketType>) => Partial<TicketType>)) => void;
  handleTicketEdit: (ticket: TicketType) => void;
  handleTicketSave: (sessionId: string, ticketId: string) => void;
  handleDeleteTicket: (sessionId: string, ticketId: string) => void;
  handleAddTicketType: (sessionId: string) => void;
  setExpandedTicketId: (id: string | null) => void;
}

export function TicketTypeTable({
  session,
  editingTicketId,
  expandedTicketId,
  ticketEditBuffer,
  setTicketEditBuffer,
  handleTicketEdit,
  handleTicketSave,
  handleDeleteTicket,
  handleAddTicketType,
  setExpandedTicketId,
}: TicketTypeTableProps) {
  return (
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
          {session.ticketTypes.map((t) => (
            <>
              <tr key={t.ticketTypeId}>
                <td className="p-2 text-blue-700">
                  {editingTicketId === t.ticketTypeId ? (
                    <input
                      type="text"
                      className="w-[80px] rounded border px-2 py-1"
                      value={ticketEditBuffer.ticketTypeName}
                      onChange={(e) => setTicketEditBuffer((prev) => ({ ...prev, ticketTypeName: e.target.value }))}
                    />
                  ) : (
                    t.ticketTypeName
                  )}
                </td>
                <td className="p-2">
                  {editingTicketId === t.ticketTypeId ? (
                    <div className="flex gap-2">
                      <DateTimePicker
                        date={ticketEditBuffer.sellBeginDate ? new Date(ticketEditBuffer.sellBeginDate) : null}
                        setDate={(date) => setTicketEditBuffer((prev) => ({ ...prev, sellBeginDate: date ? date.toISOString() : "" }))}
                        placeholder="開始時間"
                        inputClassName="w-[150px]"
                        format="YYYY/MM/DD HH:mm"
                      />
                      <span>~</span>
                      <DateTimePicker
                        date={ticketEditBuffer.sellEndDate ? new Date(ticketEditBuffer.sellEndDate) : null}
                        setDate={(date) => setTicketEditBuffer((prev) => ({ ...prev, sellEndDate: date ? date.toISOString() : "" }))}
                        placeholder="結束時間"
                        inputClassName="w-[150px]"
                        format="YYYY/MM/DD HH:mm"
                      />
                    </div>
                  ) : (
                    `${t.sellBeginDate} ~ ${t.sellEndDate}`
                  )}
                </td>
                <td className="p-2">
                  {editingTicketId === t.ticketTypeId ? (
                    <input
                      type="text"
                      className="w-[80px] rounded border px-2 py-1"
                      value={ticketEditBuffer.ticketTypePrice}
                      onChange={(e) => setTicketEditBuffer((prev) => ({ ...prev, ticketTypePrice: e.target.value }))}
                    />
                  ) : (
                    <>NT$ {t.ticketTypePrice}</>
                  )}
                </td>
                <td className="p-2">
                  {editingTicketId === t.ticketTypeId ? (
                    <input
                      type="text"
                      className="w-[60px] rounded border px-2 py-1"
                      value={ticketEditBuffer.totalQuantity}
                      onChange={(e) => setTicketEditBuffer((prev) => ({ ...prev, totalQuantity: parseInt(e.target.value, 10) }))}
                    />
                  ) : (
                    t.totalQuantity
                  )}
                </td>
                <td className="flex items-center gap-2 p-2">
                  {editingTicketId === t.ticketTypeId ? (
                    <Button variant="ghost" className="p-2" onClick={() => handleTicketSave(session.sessionId, t.ticketTypeId)}>
                      <Save className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button variant="ghost" className="p-2" onClick={() => handleTicketEdit(t)}>
                      <Pencil className="h-5 w-5" />
                    </Button>
                  )}
                  <Button variant="ghost" className="p-2" onClick={() => handleDeleteTicket(session.sessionId, t.ticketTypeId)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="border-t p-2">
                  <div
                    className="mb-1 cursor-pointer font-medium select-none"
                    onClick={() => setExpandedTicketId(expandedTicketId === t.ticketTypeId ? null : t.ticketTypeId)}
                  >
                    票券資訊 <span className="ml-1">{expandedTicketId === t.ticketTypeId ? "⌃" : "⌄"}</span>
                  </div>
                  {expandedTicketId === t.ticketTypeId && (
                    <div className="border p-2">
                      {editingTicketId === t.ticketTypeId ? (
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium">入場方式：</label>
                            <input
                              className="w-full rounded border px-2 py-1"
                              value={ticketEditBuffer.entranceType}
                              onChange={(e) => setTicketEditBuffer((prev) => ({ ...prev, entranceType: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">票種福利：</label>
                            <input
                              className="w-full rounded border px-2 py-1"
                              value={ticketEditBuffer.ticketBenefits}
                              onChange={(e) => setTicketEditBuffer((prev) => ({ ...prev, ticketBenefits: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">票種退票政策：</label>
                            <input
                              className="w-full rounded border px-2 py-1"
                              value={ticketEditBuffer.ticketRefundPolicy}
                              onChange={(e) => setTicketEditBuffer((prev) => ({ ...prev, ticketRefundPolicy: e.target.value }))}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div>入場方式：{t.entranceType}</div>
                          <div>票種福利：{t.ticketBenefits}</div>
                          <div>票種退票政策：{t.ticketRefundPolicy}</div>
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
        <Button variant="outline" className="border-black text-black" onClick={() => handleAddTicketType(session.sessionId)}>
          新增票種
        </Button>
      </div>
    </div>
  );
}
