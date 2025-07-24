"use client";

import { PageHeadingTitle, ProfitDistributionForm } from "@/components";
import { CreateProfitDistributionPayload } from "@/types";

const CreateProfitDistributionView = () => {
  const handleSubmit = async (
    payload: CreateProfitDistributionPayload & {
      period: { startDate: string; endDate: string };
      distributionDate: string;
    }
  ) => {
    const formattedValues: CreateProfitDistributionPayload = {
      ...payload,
      distributionDate: payload.distributionDate.split("T")[0],
      period: {
        startDate: payload.period.startDate.split("T")[0],
        endDate: payload.period.endDate.split("T")[0],
      },
    };

    console.log(formattedValues);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Profit Distribution" />
      <ProfitDistributionForm isLoading={false} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreateProfitDistributionView;
