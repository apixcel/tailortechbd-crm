import { InvestmentsForm, PageHeadingTitle } from "@/components";

const CreateInvestmentView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Investment" />
      <InvestmentsForm />
    </div>
  );
};

export default CreateInvestmentView;
