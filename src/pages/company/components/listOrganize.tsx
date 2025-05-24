import document from "@/assets/images/document.jpg";
import CompanyCard from "./companyCard";
export default function ListOrganize() {
  const companyList = [
    {
      organizationId: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
      userId: "user123-4567-89ab-cdef-123456789012",
      orgName: "測試公司股份有限公司",
      createdAt: "2023-05-20T08:30:00.000Z",
      updatedAt: "2023-06-15T10:45:00.000Z",
    },
    {
      organizationId: "b2c3d4e5-f6g7-8901-abcd-2345678901bc",
      userId: "user123-4567-89ab-cdef-123456789012",
      orgName: "創新科技有限公司",
      createdAt: "2023-07-10T14:20:00.000Z",
      updatedAt: "2023-08-05T09:15:00.000Z",
    },
  ];
  return (
    <div className="mx-auto h-full w-full lg:w-[40%]">
      <div className="border-grey-500 mt-8 flex min-h-[500px] flex-col items-center rounded-sm border-2 px-8 py-4 lg:relative lg:flex-row">
        <div className="lg:absolute lg:top-20 lg:-left-20">
          <img src={document} alt="Create Organizer" style={{ maxHeight: "200px" }} />
        </div>
        <div className="ga-4 w-full lg:mt-5 lg:ml-30">
          {companyList.map((company) => (
            <CompanyCard key={company.organizationId} title={company.orgName} companyId={company.organizationId} />
          ))}
        </div>
      </div>
    </div>
  );
}
