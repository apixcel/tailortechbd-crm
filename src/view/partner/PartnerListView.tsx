import { AllPartnerListTable, PageHeadingTitle } from "@/components";

const PartnerListView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Partner List" />
      <AllPartnerListTable />
    </div>
  );
};

export default PartnerListView;
