"use client";

import { toast } from "sonner";

import { CostingForm, PageHeadingTitle } from "@/components";
import { useRouter } from "next/navigation";
import { CreateCostingPayload, IInvestment } from "@/types";

const EditCostingView = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleSubmit = async (payload: CreateCostingPayload) => {
    const formattedValues: CreateCostingPayload = {
      ...payload,
      costingDate: payload.costingDate.split("T")[0],
    };

    console.log(formattedValues, "formattedValues");
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Costing" />
      <CostingForm
        buttonLabel="Update Costing"
        onSubmit={handleSubmit}
        isLoading={false}
        /* defaultValue={{
          ...data.data,
        }} */
      />
    </div>
  );
};

export default EditCostingView;
