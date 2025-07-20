import { PageHeadingTitle, PurchaseListTable } from "@/components";

const PurchaseListView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Purchase List" />
      <PurchaseListTable />
    </div>
  );
};

export default PurchaseListView;
