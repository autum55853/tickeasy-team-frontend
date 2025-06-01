import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";

type FormValues = z.infer<typeof formSchema>;
export default function CompanyConcertSection() {
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
    {
      type: "text",
      id: "companyName",
      label: "公司名稱",
      placeholder: "想放假無限公司",
      required: true,
    },
    {
      type: "text",
      id: "contactName",
      label: "聯絡人姓名",
      placeholder: "小明",
      required: true,
    },
    {
      type: "text",
      id: "companyAddress",
      label: "公司地址",
      placeholder: "台北市中山區XXXXX",
      required: true,
    },
    {
      type: "tel",
      id: "contactPhone",
      label: "聯絡人電話",
      placeholder: "請輸入聯絡人電話",
      required: true,
    },
    {
      type: "email",
      id: "email",
      label: "電子郵件",
      placeholder: "abcdefg@xx.com",
      required: true,
    },
    {
      type: "tel",
      id: "companyPhone",
      label: "公司電話",
      placeholder: "02-12345678",
      required: true,
    },
    {
      type: "text",
      id: "websiteUrl",
      label: "公司網站",
      placeholder: "(選填)",
    },
  ];
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // 移除所有非數字字符
    if (value.length > 1) {
      value = value.slice(0, 2) + "-" + value.slice(2); // 在第二個字符後插入 '-'
    }
    e.target.value = value;
  };
  return (
    <div className="mx-auto h-full w-full">
      <div className="border-grey-500 rounded-xl border-2 p-12">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">{companyInfoData.orgName}</div>
          <div className="flex justify-end gap-4">
            <Button type="submit" variant="outline" className="my-2 flex rounded-full lg:w-[100px]">
              辦演唱會
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
