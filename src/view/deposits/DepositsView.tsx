import { AllDepositsTable, PageHeadingTitle } from "@/components";

const DepositsView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Deposits" />
      <AllDepositsTable />
    </div>
  );
};

export default DepositsView;
