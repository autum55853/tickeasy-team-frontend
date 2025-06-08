import { Phone, LayoutTemplate, Link, Building2 } from "lucide-react";
import Separator from "@/core/components/ui/separator";

export const ContactOrganizer = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="border-primary flex w-[200px] flex-col items-center justify-center gap-2 rounded-xl border-1 p-4 text-center">
          <Building2 className="hidden h-6 w-6 lg:block" />
          公司資訊
          <Separator className="my-2" />
          <p className="">全球娛樂股份有限公司</p>
          <p className="text-sm">台北市松山區南京東路四段2號</p>
          <p className="text-sm">02-2712-3456</p>
        </div>
        <div className="border-primary flex w-[200px] flex-col items-center justify-center gap-2 rounded-xl border-1 p-4 text-center">
          <LayoutTemplate className="hidden h-6 w-6 lg:block" />
          官方網站
          <Separator className="my-2" />
          <p>全球娛樂股份有限公司</p>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">
            <Link className="hidden h-6 w-6 lg:block" />
          </a>
        </div>
        <div className="border-primary flex w-[200px] flex-col items-center justify-center gap-2 rounded-xl border-1 p-4 text-center">
          <Phone className="hidden h-6 w-6 lg:block" />
          聯絡人
          <Separator className="my-2" />
          <p>王小明</p>
          <p className="text-sm">0912-345678</p>
          <a href="mailto:sample@email.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">
            sample@email.com
          </a>
        </div>
      </div>
    </div>
  );
};
