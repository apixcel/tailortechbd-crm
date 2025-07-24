import { PageHeadingTitle, CostingListTable } from "@/components";

const CostingListView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Costing List" />
      <CostingListTable />
    </div>
  );
};

export default CostingListView;
