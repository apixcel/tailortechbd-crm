import { AllSuperAdminTable, PageHeadingTitle } from "@/components";

const ManageSuperAdminView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Mange Super Admin" />
      <AllSuperAdminTable />
    </div>
  );
};

export default ManageSuperAdminView;
