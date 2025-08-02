import {
  AllProfitWithdrawalTable,
  PageHeadingTitle,
} from "@/components";

const ProfitWithdrawalView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Profit Withdrawal" />
      <AllProfitWithdrawalTable />
    </div>
  );
};

export default ProfitWithdrawalView;
