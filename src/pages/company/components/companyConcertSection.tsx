import { Button } from "@/core/components/ui/button";
import { CompanyDetailData } from "../types/company";

export default function CompanyConcertSection({ companyInfoData }: { companyInfoData: CompanyDetailData }) {
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
