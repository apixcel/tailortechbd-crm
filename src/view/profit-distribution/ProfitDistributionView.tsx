import { AllProfitDistributionTable, PageHeadingTitle } from "@/components";

const ProfitDistributionView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Profit Distribution" />
      <AllProfitDistributionTable />
    </div>
  );
};

export default ProfitDistributionView;
