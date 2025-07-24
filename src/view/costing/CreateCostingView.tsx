"use client";

import { CostingForm, PageHeadingTitle } from "@/components";
import { CreateCostingPayload } from "@/types";

const CreateCostingView = () => {
    const handleSubmit = async (payload: CreateCostingPayload) => {
        const formattedValues = {
          ...payload,
          costingDate: payload.costingDate.split("T")[0],
        };
    
        console.log(formattedValues);
      };
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Costing" />
      <CostingForm isLoading={false} onSubmit={(value) => handleSubmit(value)} />
    </div>
  )
}

export default CreateCostingView