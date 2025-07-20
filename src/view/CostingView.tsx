import { CostingOverview, PageHeadingTitle } from "@/components";

const CostingView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Costing Report" />
      <CostingOverview />
    </div>
  );
};

export default CostingView;
