import { AllProfitBalanceListTable, PageHeadingTitle } from "@/components";

const ProfitBalanceView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Profit Balance" />
      <AllProfitBalanceListTable />
    </div>
  );
};

export default ProfitBalanceView;
