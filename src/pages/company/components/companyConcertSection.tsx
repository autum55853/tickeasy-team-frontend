import { Button } from "@/core/components/ui/button";
import { CompanyDetailData } from "../types/company";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/core/components/ui/tab";
import CompanyConcertCard from "./companyConcertCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyConcertSection({ companyInfoData }: { companyInfoData: CompanyDetailData }) {
  // const companyInfoData = {
  //   orgAddress: "台北市松山區民生東路四段133號",
  //   orgMail: "contact@megastar.com",
  //   orgContact: "王經理",
  //   orgMobile: "0912345678",
  //   orgPhone: "02-27885678",
  //   orgWebsite: "https://www.megastar.com",
  //   status: "active",
  //   verificationStatus: "verified",
  //   createdAt: "2023-01-15T08:30:00Z",
  //   updatedAt: "2023-05-20T10:15:00Z",
  // };

  const [activeTab, setActiveTab] = useState("draft");
  const navigate = useNavigate();

  return (
    <div className="mx-auto h-full w-full">
      <div className="border-grey-500 rounded-xl border-2 p-12">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">{companyInfoData.orgName}</div>
          <div className="flex justify-end gap-4">
            <Button type="submit" variant="outline" className="my-2 flex rounded-full lg:w-[100px]" onClick={() => navigate("/concert/create/info")}>
              辦演唱會
            </Button>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="draft">草稿(1)</TabsTrigger>
            <TabsTrigger value="review">審核中(0)</TabsTrigger>
            <TabsTrigger value="rejected">已退回(0)</TabsTrigger>
            <TabsTrigger value="published">已發布(0)</TabsTrigger>
            <TabsTrigger value="ended">已結束(0)</TabsTrigger>
          </TabsList>
          <TabsContent value="draft">
            <CompanyConcertCard actionsType="default" />
          </TabsContent>
          <TabsContent value="review">
            <CompanyConcertCard actionsType="none" />
          </TabsContent>
          <TabsContent value="rejected">
            <CompanyConcertCard actionsType="rejected" />
          </TabsContent>
          <TabsContent value="published">
            <CompanyConcertCard actionsType="reviewed" />
          </TabsContent>
          <TabsContent value="ended">
            <CompanyConcertCard actionsType="reviewed" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
