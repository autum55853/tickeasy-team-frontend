import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";

import { SaveIcon } from "lucide-react";
import { useState } from "react";
// 定義表單驗證 schema
const formSchema = z.object({
  companyName: z.string().min(1, "公司名稱為必填"),
  contactName: z.string().min(1, "聯絡人姓名為必填"),
  companyAddress: z.string().min(1, "公司地址為必填"),
  contactPhone: z.string().min(1, "聯絡人電話為必填"),
  email: z
    .string()
    .email("請輸入有效的電子郵件")
    .refine((val) => val.endsWith("@example.com"), {
      message: "電子郵件必須是 @example.com 結尾",
    }),
  companyPhone: z
    .string()
    .min(9, "公司電話必須為9碼")
    .max(9, "公司電話必須為9碼")
    .regex(/^\d{9}$/, "公司電話必須為9碼且只能包含數字"),
  websiteUrl: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;
export default function CompanyInfoSection({ handleGoToConcertList }) {
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      companyAddress: "",
      contactPhone: "",
      companyPhone: "",
      websiteUrl: "",
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    console.log("Form Errors:", errors);
    // 在這裡處理表單提交邏輯
  };

  const companyInfoData = {
    organizationId: "550e8400-e29b-41d4-a716-446655440000",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    orgName: "巨星娛樂公司",
    orgAddress: "台北市松山區民生東路四段133號",
    orgMail: "contact@megastar.com",
    orgContact: "王經理",
    orgMobile: "0912345678",
    orgPhone: "02-27885678",
    orgWebsite: "https://www.megastar.com",
    status: "active",
    verificationStatus: "verified",
    createdAt: "2023-01-15T08:30:00Z",
    updatedAt: "2023-05-20T10:15:00Z",
  };
  const formItems = [
    { title: "公司名稱", value: companyInfoData.orgName },
    { title: "聯絡人姓名", value: companyInfoData.orgContact },
    { title: "公司地址", value: companyInfoData.orgAddress },
    { title: "聯絡人電話", value: companyInfoData.orgMobile },
    { title: "公司電話", value: companyInfoData.orgPhone },
    { title: "公司網址", value: companyInfoData.orgWebsite },
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // 移除所有非數字字符
    if (value.length > 1) {
      value = value.slice(0, 2) + "-" + value.slice(2); // 在第二個字符後插入 '-'
    }
    e.target.value = value;
  };
  const handleSave = () => {
    setIsEdit(false);
  };
  const goToConcertList = () => {
    handleGoToConcertList("concertList");
  };
  return (
    <div className="mx-auto h-full w-full">
      <div className="border-grey-500 rounded-xl border-2 p-8 lg:p-12">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">{companyInfoData.orgName}</div>
          {!isEdit && (
            <div className="flex hidden justify-end gap-4 lg:block">
              <Button type="submit" variant="outline" className="my-2 flex rounded-full lg:w-[100px]" onClick={() => setIsEdit(true)}>
                編輯
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-destructive hover:bg-destructive text-destructive my-2 rounded-full border lg:w-[80px]"
              >
                刪除
              </Button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="my-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
            {formItems.map((item) => (
              <div key={item.title} className="flex flex-col">
                {isEdit ? (
                  <Input
                    labelClass="text-start"
                    type="text"
                    id={item.title}
                    label={item.title}
                    value={item.value}
                    error={!!errors[item.title as keyof FormValues]}
                    errorMessage={errors[item.title as keyof FormValues]?.message}
                    onChange={item.title === "companyPhone" ? handlePhoneChange : undefined}
                  />
                ) : (
                  <div className="p-3 lg:p-5">
                    <p className="lg:text-md my-1 text-lg font-semibold">{item.title}</p>
                    <p className="text-primary text-md ml-3 lg:text-sm">{item.value}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </form>
        {!isEdit && (
          <div className="block flex justify-end gap-4 lg:hidden">
            <Button type="submit" variant="outline" className="my-2 flex w-full rounded-full lg:w-[100px]" onClick={() => setIsEdit(true)}>
              編輯
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-destructive hover:bg-destructive text-destructive my-2 rounded-full border lg:w-[80px]"
            >
              刪除
            </Button>
          </div>
        )}
        {isEdit ? (
          <div className="flex justify-between gap-4">
            <Button type="submit" className="bg-primary/80 hover:bg-primary my-2 w-full rounded-full text-white lg:w-[100px]" onClick={handleSave}>
              <SaveIcon />
              儲存
            </Button>
            <Button
              type="submit"
              className="bg-destructive/70 hover:bg-destructive my-2 rounded-full text-white lg:w-[60px]"
              onClick={() => setIsEdit(false)}
            >
              取消
            </Button>
          </div>
        ) : (
          <Button type="submit" className="my-3 flex w-full rounded-full lg:w-[120px]" onClick={goToConcertList}>
            演唱會列表
          </Button>
        )}
      </div>
    </div>
  );
}
