export const formatLocalTime = (dateString: string) => {
  const date = new Date(dateString);
  // 加上 8 小時 (8 * 60 * 60 * 1000 毫秒)
  const twDate = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 使用24小時制
  }).format(twDate);
};

export const formatLocalTimeToDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};
