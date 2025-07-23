import { PageHeadingTitle, SupplierListTable } from "@/components";

const SupplierListView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Supplier List" />
      <SupplierListTable />
    </div>
  );
};

export default SupplierListView;
