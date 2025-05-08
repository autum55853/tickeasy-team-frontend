import { UseFormRegisterReturn } from "react-hook-form";
import { MusicTypeOption } from "../types/musicType";

interface ProfilePreferEventTypesProps {
  eventTypes: UseFormRegisterReturn;
  allEventTypes: MusicTypeOption[];
}

export default function ProfilePreferEventTypes({ eventTypes, allEventTypes }: ProfilePreferEventTypesProps) {
  return (
    <div className="ml-4 grid grid-cols-1 gap-4">
      {allEventTypes.map((eventType) => (
        <label key={eventType.value} className="flex items-center gap-1">
          <input type="checkbox" value={eventType.value} {...eventTypes} className="rounded border-gray-300" />
          <span className="text-sm">
            {eventType.label} ({eventType.subLabel})
          </span>
        </label>
      ))}
    </div>
  );
}
