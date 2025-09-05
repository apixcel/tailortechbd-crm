import { PageHeadingTitle, AllPurchaseListTable } from "@/components";

const PurchaseListView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Purchase List" />
      <AllPurchaseListTable />
    </div>
  );
};

export default PurchaseListView;
