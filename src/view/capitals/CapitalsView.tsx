import { AllCapitalsListTable, PageHeadingTitle } from "@/components";

const CapitalsView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Capitals" />
      <AllCapitalsListTable />
    </div>
  );
};

export default CapitalsView;
