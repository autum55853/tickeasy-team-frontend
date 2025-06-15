import { useState } from "react";
import PasswordInfo from "../components/PasswordInfo";
import { T_Password } from "../types/password";
import { UpdatePasswordSchema } from "../schema/updatePassword";
import { ZodError } from "zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/core/hooks/useToast";
import { useRequest } from "@/core/hooks/useRequest";
import { useLogout } from "@/core/hooks/useLogout";
import { useAuthStore } from "@/store/authStore";
export default function Password() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState<T_Password>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // const [errors, setErrors] = useState<ZodIssue[]>([]);
  // 處理重設密碼
  const { useCreate: resetPassword } = useRequest({
    queryKey: ["auth", "reset-password"],
    url: "/api/v1/auth/reset-password",
  });
  const resetPasswordMutation = resetPassword({
    onSuccess: () => {
      toast({
        title: "成功",
        description: "密碼已重設成功",
      });
      handleLogout();
      navigate("/login");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "錯誤",
        description: error.message || "重設密碼失敗，請確認驗證碼是否正確",
      });
    },
  });
  const { handleLogout } = useLogout();
  const userEmail = useAuthStore((state) => state.email);
  const handleSubmit = (updatedData: T_Password) => {
    try {
      // 使用 schema 驗證數據
      const validatedData = UpdatePasswordSchema.parse(updatedData);
      // 驗證通過後才執行更新
      setData(validatedData);
      const data = {
        email: userEmail,
        newPassword: validatedData.newPassword,
      };
      resetPasswordMutation.mutate(data);
      // navigate("/login");
    } catch (error: unknown) {
      // 處理 Zod 驗證錯誤
      if (error instanceof ZodError) {
        console.log("error", error.errors);
        // setErrors(error.errors);
        return;
      }

      // 處理其他類型錯誤
      if (error instanceof Error) {
        console.log("error", error);
        // setErrors([
        //   {
        //     code: "custom",
        //     path: [],
        //     message: error.message,
        //   },
        // ]);
        return;
      }
    }
  };

  return (
    <>
      <div className="mx-auto h-[45vh] w-full lg:w-[70%]">
        <div className="my-10 flex h-[50px] flex-col items-center gap-4 lg:mt-0 lg:flex-row">
          <h4 className="text-2xl font-bold">修改密碼</h4>
          <p className="text-center text-sm text-red-500">修改密碼後將導回登入頁面，重新登入</p>
        </div>
        <PasswordInfo onSubmit={handleSubmit} data={data} />
      </div>
    </>
  );
}
