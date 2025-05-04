"use client";

import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/core/lib/utils";
import { Button } from "@/core/components/ui/button";
import { Calendar } from "@/core/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/core/components/ui/popover";

interface SingleDatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  placeholder: string;
  inputClassName?: string;
  format?: string;
  defaultMonth?: Date;
}

export function SingleDatePicker({ date, setDate, placeholder, inputClassName, format = "YYYY-MM-DD", defaultMonth }: SingleDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"inputStyle"} className={cn(`${inputClassName} justify-between`, !date && "text-muted-foreground")}>
          {date ? dayjs(date).format(format) : <span>{placeholder}</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={(newDate) => {
            if (newDate && date && dayjs(newDate).format("YYYY/MM/DD") === dayjs(date).format("YYYY/MM/DD")) {
              setDate(null);
            } else {
              setDate(newDate ? dayjs(newDate).startOf("day").toDate() : null);
            }
          }}
          defaultMonth={date || (defaultMonth ? dayjs(defaultMonth).toDate() : undefined)}
          required
        />
      </PopoverContent>
    </Popover>
  );
}
