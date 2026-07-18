import { Icon } from "@iconify/react";
import { cn } from "@/core/lib/utils";

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  className?: string;
}

export default function EmptyState({ message = "目前沒有資料", subMessage, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <Icon icon="mdi:inbox-outline" className="mb-4 h-16 w-16 text-neutral-300" />
      <p className="text-lg font-medium text-neutral-500">{message}</p>
      {subMessage && <p className="mt-1 text-sm text-neutral-400">{subMessage}</p>}
    </div>
  );
}
