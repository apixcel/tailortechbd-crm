import { PageHeadingTitle, PurchaseReportOverview } from "@/components";

const PurchaseReportView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Purchase Report" />
      <PurchaseReportOverview />
    </div>
  );
};

export default PurchaseReportView;
