import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/core/components/ui/checkbox";
import documentAdd from "@/assets/images/documentAdd.jpg";
import { useCreateOrganizer } from "../hook/useCreateOrganizerContext";
import { TermsDialog } from "@/core/components/global/termsDialog";
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
  agreementService: z.boolean().refine((val) => val === true, {
    message: "請同意服務條款及隱私政策",
  }),
});
type FormValues = z.infer<typeof formSchema>;
export default function FormCreateOrganize() {
  const { setIsCreateOrganize } = useCreateOrganizer();
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
      email: "",
      companyPhone: "",
      websiteUrl: "",
      agreementService: false,
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    console.log("Form Errors:", errors);
    // 在這裡處理表單提交邏輯
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
    <div className="mx-auto h-full w-full lg:w-[40%]">
      <div className="border-grey-500 rounded-sm border-2 px-8 py-4 lg:relative">
        <div className="flex justify-center lg:absolute lg:top-20 lg:-left-20">
          <img src={documentAdd} alt="Create Organizer" style={{ maxHeight: "200px" }} />
        </div>
        <div className="mt-5 lg:ml-30">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {formItems.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <Input
                    labelClass="text-start"
                    type={item.type}
                    id={item.id}
                    label={item.label}
                    placeholder={item.placeholder}
                    required={item.required}
                    {...register(item.id, { required: item.required })}
                    error={!!errors[item.id as keyof FormValues]}
                    errorMessage={errors[item.id as keyof FormValues]?.message}
                    onChange={item.id === "companyPhone" ? handlePhoneChange : undefined}
                  />
                </div>
              ))}
            </div>
            <div>
              <Checkbox
                label={
                  <>
                    我已閱讀並同意
                    <TermsDialog
                      title="服務條款"
                      trigger={
                        <Button variant="link" className="text-primary text-md h-auto p-0 hover:underline">
                          服務條款
                        </Button>
                      }
                      type="service"
                    ></TermsDialog>
                    及
                    <TermsDialog
                      title="隱私政策"
                      trigger={
                        <Button variant="link" className="text-primary text-md h-auto p-0 hover:underline">
                          隱私政策
                        </Button>
                      }
                      type="privacy"
                    ></TermsDialog>
                  </>
                }
                id="agreementService"
                required
                {...register("agreementService")}
                error={!!errors.agreementService}
                errorMessage={errors.agreementService?.message}
              />
              {/* {errors.agreementService && <p className="pl-2 text-sm text-red-500">{errors.agreementService.message}</p>} */}
            </div>
            <div className="flex justify-between gap-4">
              <Button type="submit" className="bg-primary flex-start my-2 flex w-full rounded-full text-white lg:w-[200px]">
                建立
              </Button>
              <Button
                type="button"
                className="bg-destructive/70 hover:bg-destructive my-2 rounded-full text-white"
                onClick={() => setIsCreateOrganize(false)}
              >
                取消
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
