import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import ProfileInfo from "../components/ProfileInfo";
import { T_ProfileInfo } from "../types/profileInfo";
import { UpdateProfileSchema } from "../schema/updateProfile";
import { ZodError } from "zod";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [profileData, setProfileData] = useState<T_ProfileInfo>({
    email: "adam294577@gmail.com",
    name: "Adam",
    phone: "0912345678",
    birthday: "1990-01-01",
    gender: "男",
    preferredRegions: ["北部", "南部"],
    preferredEventTypes: ["A"],
    country: "台灣",
    address: "台北市中山區",
    img: "",
  });

  const handleSubmit = (updatedData: T_ProfileInfo) => {
    try {
      // 使用 schema 驗證數據
      const validatedData = UpdateProfileSchema.parse(updatedData);
      // 驗證通過後才執行更新
      setProfileData(validatedData);
      setIsEdit(false);
      window.scrollTo(0, 0);
    } catch (error: unknown) {
      // 處理 Zod 驗證錯誤
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join("\n");
        console.log("errorMessages", errorMessages);
        return;
      }

      // 處理其他類型錯誤
      if (error instanceof Error) {
        console.log("error", error);
        return;
      }
    }
  };
  return (
    <>
      <div className="mt-10 flex h-[50px] items-center gap-4 lg:mt-0">
        <h4 className="text-2xl font-bold">基本資料</h4>
        {!isEdit && (
          <Button variant="outline" onClick={() => setIsEdit(true)}>
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
      />
    </>
  );
}
