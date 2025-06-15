export const formatLocalTime = (dateString: string) => {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 使用24小時制
  }).format(new Date(dateString));
};

export const formatLocalTimeToDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};
