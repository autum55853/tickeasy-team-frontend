import { useState, useEffect } from "react";
import { Button } from "@/core/components/ui/button";
import ProfileInfo from "../components/ProfileInfo";
import { T_Profile } from "../types/porfile";
import { UpdateProfileSchema } from "../schema/updateProfile";
import { ZodError } from "zod";
import { useRequest } from "@/core/hooks/useRequest";
import AlertError from "../components/AlertError";
import { UserResponse } from "../types/porfile";
import { useToast } from "@/core/hooks/useToast";
import LoadingSpin from "@/core/components/global/loadingSpin";
export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const [profileData, setProfileData] = useState<T_Profile>({});
  const { data, isLoading } = useRequest<UserResponse>({
    url: "/api/v1/users/profile",
    queryKey: ["userInfo"],
  }).useGet();

  const { useUpdate: putProfile } = useRequest({
    url: "/api/v1/users/profile",
    queryKey: ["userInfo"],
  });
  const putProfileMutation = putProfile({
    onSuccess: () => {
      toast({
        title: "更新成功",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: error.message || "更新失敗，請稍後再試",
      });
    },
  });

  useEffect(() => {
    if (isLoading || !data) return;
    const userData = Array.isArray(data) ? data[0] : data;
    if (userData.user) {
      setProfileData(userData.user);
    }
  }, [data, isLoading]);

  const handleSubmit = async (updatedData: T_Profile) => {
    try {
      // 使用 schema 驗證數據
      const validatedData = UpdateProfileSchema.parse(updatedData);
      await putProfileMutation.mutateAsync({ id: "", data: validatedData });
      // // 驗證通過後才執行更新
      setProfileData(validatedData);
      setIsEdit(false);
      window.scrollTo(0, 0);
    } catch (error: unknown) {
      // 處理 Zod 驗證錯誤
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join("\n");
        setError(errorMessages);
        setShowError(true);
        return;
      }

      // 處理其他類型錯誤
      if (error instanceof Error) {
        setError(error.message);
        setShowError(true);
        return;
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <>
          <div className="mx-auto mt-10 flex h-[50px] w-full items-center justify-around gap-4 lg:mt-0 lg:w-[70%] lg:justify-start">
            <h4 className="text-2xl font-bold">基本資料</h4>
            {!isEdit && (
              <Button variant="outline" onClick={() => setIsEdit(true)} disabled={putProfileMutation.isPending}>
                修改會員資料
              </Button>
            )}
          </div>
          <ProfileInfo
            isEdit={isEdit}
            data={profileData}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsEdit(false);
              window.scrollTo(0, 0);
            }}
            isPending={putProfileMutation.isPending}
          />
          {/* 錯誤提示 */}
          <AlertError error={error} isOpen={showError} onClose={() => setShowError(false)} />
        </>
      )}
    </>
  );
}
