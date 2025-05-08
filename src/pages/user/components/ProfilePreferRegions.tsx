import { UseFormRegisterReturn } from "react-hook-form";

interface ProfilePreferRegionsProps {
  regions: UseFormRegisterReturn;
}

export default function ProfilePreferRegions({ regions }: ProfilePreferRegionsProps) {
  const allRegions = ["北部", "中部", "南部", "東部", "離島", "海外"];

  return (
    <div className="ml-4 grid grid-cols-3 gap-4">
      {allRegions.map((region) => (
        <label key={region} className="flex items-center gap-1">
          <input type="checkbox" value={region} {...regions} className="rounded border-gray-300" />
          <span className="text-sm">{region}</span>
        </label>
      ))}
    </div>
  );
}
