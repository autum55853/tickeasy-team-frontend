import { useRequest } from "@/core/hooks/useRequest";
import { UserResponse } from "../types/porfile";
export const useGetUserInfo = () => {
  const { useGet } = useRequest<UserResponse>({
    url: "/api/v1/users/profile",
    queryKey: ["userInfo"],
  });
  const { data, isLoading, error } = useGet();
  return { data, isLoading, error };
};
