import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";

interface UseRequestOptions {
  queryKey: string[];
  url: string;
}

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useRequest<T>({ queryKey, url }: UseRequestOptions) {
  const queryClient = useQueryClient();

  // 獲取數據
  const useGet = (id?: string | number) => {
    return useQuery({
      queryKey: id ? [...queryKey, id] : queryKey,
      queryFn: async () => {
        try {
          const response = await axiosInstance.get<T[]>(id ? `${url}/${id}` : url);
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "獲取數據失敗");
          }
          throw error;
        }
      },
    });
  };

  // 創建數據
  const useCreate = (options?: MutationOptions) => {
    return useMutation({
      mutationFn: async (data: Partial<T>) => {
        try {
          const response = await axiosInstance.post<T>(url, data);
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "創建數據失敗");
          }
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        options?.onSuccess?.();
      },
      onError: (error: Error) => {
        options?.onError?.(error);
      },
    });
  };

  // 更新數據
  const useUpdate = (options?: MutationOptions) => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: string | number; data: Partial<T> }) => {
        try {
          const response = await axiosInstance.put<T>(`${url}/${id}`, data);
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "更新數據失敗");
          }
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        options?.onSuccess?.();
      },
      onError: (error: Error) => {
        options?.onError?.(error);
      },
    });
  };

  // 刪除數據
  const useDelete = (options?: MutationOptions) => {
    return useMutation({
      mutationFn: async (id: string | number) => {
        try {
          const response = await axiosInstance.delete(`${url}/${id}`);
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || "刪除數據失敗");
          }
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        options?.onSuccess?.();
      },
      onError: (error: Error) => {
        options?.onError?.(error);
      },
    });
  };

  return {
    useGet,
    useCreate,
    useUpdate,
    useDelete,
  };
}
