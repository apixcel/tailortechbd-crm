import { CostingReportOverview, PageHeadingTitle } from "@/components";

const CostingReportView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Costing Report" />
      <CostingReportOverview />
    </div>
  );
};

export default CostingReportView;
