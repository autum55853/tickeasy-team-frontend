import { useNavigate } from "react-router-dom";

export const useHeaderSearchBar = (onSearchComplete?: () => void) => {
  const navigate = useNavigate();

  const handleSearch = (text: string) => {
    if (text.trim() !== "") {
      // 如果已经在 concerts 页面，只需要更新 state
      if (location.pathname === "/concerts") {
        navigate(".", {
          state: { searchText: text },
          replace: true,
        });
      } else {
        navigate(`/concerts`, {
          state: { searchText: text },
        });
      }
      // 搜索完成后执行回调函数
      onSearchComplete?.();
    }
  };

  return { handleSearch };
};
