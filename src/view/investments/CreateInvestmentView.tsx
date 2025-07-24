"use client";

import { InvestmentsForm, PageHeadingTitle } from "@/components";
import { CreateInvestmentPayload } from "@/types";

const CreateInvestmentView = () => {
  const handleSubmit = async (payload: CreateInvestmentPayload) => {
    const formattedValues = {
      ...payload,
      investmentDate: payload.investmentDate.split("T")[0],
    };

    console.log(formattedValues);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Investment" />
      <InvestmentsForm isLoading={false} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreateInvestmentView;
