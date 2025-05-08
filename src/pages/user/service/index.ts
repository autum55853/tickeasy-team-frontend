import { useRequest } from "@/core/hooks/useRequest";
import { UserResponse } from "../types/porfile";
import { MusicTypeOption } from "../types/musicType";
import { RegionOption } from "../types/region";
// 取得會員資訊
export const useGetUserInfo = () => {
  const { useGet } = useRequest<UserResponse>({
    url: "/api/v1/users/profile",
    queryKey: ["userInfo"],
  });
  const { data, isLoading, error } = useGet();
  return { data, isLoading, error };
};
// 取得音樂類型選單
export const useGetMusicType = () => {
  const { useGet } = useRequest<MusicTypeOption>({
    url: "/api/v1/users/profile/event-types",
    queryKey: ["musicType"],
  });
  const { data, isLoading, error } = useGet();
  return { data, isLoading, error };
};

// 取得地區下選單
export const useGetRegion = () => {
  const { useGet } = useRequest<RegionOption>({
    url: "/api/v1/users/profile/regions",
    queryKey: ["region"],
  });
  const { data, isLoading, error } = useGet();
  return { data, isLoading, error };
};
