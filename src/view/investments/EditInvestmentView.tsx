"use client";

import { toast } from "sonner";

import { InvestmentsForm, PageHeadingTitle } from "@/components";
import { useRouter } from "next/navigation";
import { CreateInvestmentPayload } from "@/types";

const EditInvestmentView = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleSubmit = async (payload: CreateInvestmentPayload) => {
    const formattedValues: CreateInvestmentPayload = {
      ...payload,
      investmentDate: payload.investmentDate.split("T")[0],
    };

    console.log(formattedValues, "formattedValues");
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Investment" />
      <InvestmentsForm
        buttonLabel="Update Investment"
        onSubmit={handleSubmit}
        isLoading={false}
        /* defaultValue={{
          ...data.data,
        }} */
      />
    </div>
  );
};

export default EditInvestmentView;
