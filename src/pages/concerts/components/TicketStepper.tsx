import { useState, useEffect } from "react";
import { useBuyTicketContext } from "../hook/useBuyTicketContext";

export function TicketStepper({
  initial = 0,
  min = 0,
  max = 1,
  ticketTypeId,
  ticketPrice,
}: {
  initial?: number;
  min?: number;
  max?: number;
  ticketTypeId: string;
  ticketPrice: number;
}) {
  const [count, setCount] = useState(initial);
  const { selectedTickets, setSelectedTickets } = useBuyTicketContext();
  useEffect(() => {
    if (count === 0) {
      setSelectedTickets(selectedTickets.filter((ticket) => ticket.ticketTypeId !== ticketTypeId));
    } else {
      const existingTicketIndex = selectedTickets.findIndex((ticket) => ticket.ticketTypeId === ticketTypeId);

      if (existingTicketIndex !== -1) {
        const updatedTickets = [...selectedTickets];
        updatedTickets[existingTicketIndex] = { ticketTypeId, quantity: count, ticketPrice };
        setSelectedTickets(updatedTickets);
      } else {
        setSelectedTickets([...selectedTickets, { ticketTypeId, quantity: count, ticketPrice }]);
      }
    }
  }, [count]);
  return (
    <div className="flex flex-col items-center">
      {count === 0 ? (
        // 只顯示加號
        <button
          className="hover:bg-primary hover:text-secondary h-10 w-10 cursor-pointer rounded-full border border-blue-400 text-2xl text-blue-400"
          onClick={() => setCount(1)}
        >
          +
        </button>
      ) : (
        // 顯示加號和減號
        <div className="flex items-center rounded-full bg-blue-400 p-2">
          <button
            disabled={count === max}
            className="mb-1 h-8 w-8 cursor-pointer rounded-full bg-blue-100 text-2xl"
            onClick={() => setCount(Math.min(count + 1, max))}
          >
            +
          </button>
          <span className="mx-2 text-lg text-white">x{count}</span>
          <button className="bg-ring text-secondary h-8 w-8 cursor-pointer rounded-full text-2xl" onClick={() => setCount(Math.max(count - 1, min))}>
            –
          </button>
        </div>
      )}
    </div>
  );
}
