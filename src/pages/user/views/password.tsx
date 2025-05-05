import { useState } from "react";
import PasswordInfo from "../components/PasswordInfo";
import { T_Password } from "../types/password";
import { UpdatePasswordSchema } from "../schema/updatePassword";
import { ZodError, ZodIssue } from "zod";
import { useNavigate } from "react-router-dom";

export default function Password() {
  const navigate = useNavigate();
  const [data, setData] = useState<T_Password>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const handleSubmit = (updatedData: T_Password) => {
    try {
      // 使用 schema 驗證數據
      const validatedData = UpdatePasswordSchema.parse(updatedData);
      // 驗證通過後才執行更新
      setData(validatedData);

      navigate("/login");
    } catch (error: unknown) {
      // 處理 Zod 驗證錯誤
      if (error instanceof ZodError) {
        console.log("error", error.errors);
        setErrors(error.errors);
        return;
      }

      // 處理其他類型錯誤
      if (error instanceof Error) {
        console.log("error", error);
        setErrors([
          {
            code: "custom",
            path: [],
            message: error.message,
          },
        ]);
        return;
      }
    }
  };

  return (
    <>
      <div className="h-[45vh]">
        <div className="mt-10 flex h-[50px] items-center gap-4 lg:mt-0">
          <h4 className="text-2xl font-bold">修改密碼</h4>
          <p className="text-center text-sm text-red-500">修改密碼後將導回登入頁面，重新登入</p>
        </div>
        <PasswordInfo onSubmit={handleSubmit} data={data} errors={errors} />
      </div>
    </>
  );
}
