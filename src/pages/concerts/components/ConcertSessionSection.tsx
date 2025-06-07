import { Button } from "@/core/components/ui/button";
import { sessionData, sessionItem } from "@/pages/concerts/types/ConcertData";
import Separator from "@/core/components/ui/separator";
import TicketTypeAccordion from "./TicketTypeAccordion";
import { useBuyTicketContext } from "../hook/useBuyTicketContext";
export default function ConcertSessionSection({ sessionData, refundPolicy }: { sessionData: sessionData; refundPolicy: string }) {
  const { selectedSession, setSelectedSession } = useBuyTicketContext();
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="mb-4 text-lg">請選擇場次與票券</div>
        <div className="rounded-lg border border-gray-300 p-8">
          <div className="flex flex-col">
            {sessionData.map((session: sessionItem) => (
              <Button
                key={session.sessionId}
                variant="outline"
                className={`flex h-full w-[120px] flex-col ${selectedSession?.sessionId === session.sessionId ? "text-secondary bg-blue-500" : ""}`}
                onClick={() => setSelectedSession(session)}
              >
                {session.sessionDate}
                <span>{session.sessionStart}</span>
              </Button>
            ))}
          </div>
          <Separator />
          <TicketTypeAccordion ticketTypes={sessionData[0].ticketTypes} refundPolicy={refundPolicy} />
        </div>
      </div>
    </>
  );
}
