import { AllAdminTable, PageHeadingTitle } from "@/components";

const ManageAdminView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Mange Admins" />
      <AllAdminTable />
    </div>
  );
};

export default ManageAdminView;
