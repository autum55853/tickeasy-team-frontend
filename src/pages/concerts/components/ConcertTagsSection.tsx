import { Concert } from "@/pages/comm/types/Concert";

interface LocationTag {
  locationTagId: string;
  locationTagName: string;
}

interface MusicTag {
  musicTagId: string;
  musicTagName: string;
}

interface ConcertTagsSectionProps {
  locationTags: LocationTag[];
  musicTags: MusicTag[];
  locationTagId: Concert["locationTagId"];
  musicTagId: Concert["musicTagId"];
  locationLoading: boolean;
  musicLoading: boolean;
  locationError: boolean;
  musicError: boolean;
  onLocationTagChange: (value: Concert["locationTagId"]) => void;
  onMusicTagChange: (value: Concert["musicTagId"]) => void;
}

export function ConcertTagsSection({
  locationTags,
  musicTags,
  locationTagId,
  musicTagId,
  locationLoading,
  musicLoading,
  locationError,
  musicError,
  onLocationTagChange,
  onMusicTagChange,
}: ConcertTagsSectionProps) {
  return (
    <div className="mb-4 rounded-lg bg-gray-100 p-6">
      <h5 className="mb-4 font-medium text-gray-800">演唱會標籤</h5>
      <div className="mb-4">
        <label className="mb-1 block font-medium text-gray-700">地區</label>
        <select
          className="w-full rounded border border-gray-300 p-3 text-gray-800"
          value={locationTagId || ""}
          onChange={(e) => onLocationTagChange(e.target.value)}
          disabled={locationLoading}
        >
          <option value="">請選擇</option>
          {locationTags.map((tag) => (
            <option key={tag.locationTagId} value={tag.locationTagId}>
              {tag.locationTagName}
            </option>
          ))}
        </select>
        {locationError && <p className="mt-1 text-sm text-red-500">載入地區標籤失敗</p>}
      </div>
      <div>
        <label className="mb-1 block font-medium text-gray-700">音樂類型</label>
        <select
          className="w-full rounded border border-gray-300 p-3 text-gray-800"
          value={musicTagId || ""}
          onChange={(e) => onMusicTagChange(e.target.value)}
          disabled={musicLoading}
        >
          <option value="">請選擇</option>
          {musicTags.map((tag) => (
            <option key={tag.musicTagId} value={tag.musicTagId}>
              {tag.musicTagName}
            </option>
          ))}
        </select>
        {musicError && <p className="mt-1 text-sm text-red-500">載入音樂標籤失敗</p>}
      </div>
    </div>
  );
}
