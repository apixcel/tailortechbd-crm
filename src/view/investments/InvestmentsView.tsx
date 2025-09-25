import { AllInvestmentsTable, PageHeadingTitle } from "@/components";

const InvestmentsView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Investment List" />
      <AllInvestmentsTable />
    </div>
  );
};

export default InvestmentsView;
