"use client";

import { toast } from "sonner";

import { PageHeadingTitle, ProfitDistributionForm } from "@/components";
import { useRouter } from "next/navigation";
import { CreateProfitDistributionPayload } from "@/types";

const EditProfitDistributionView = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleSubmit = async (payload: CreateProfitDistributionPayload) => {
    const formattedValues: CreateProfitDistributionPayload = {
      ...payload,
      distributionDate: payload.distributionDate.split("T")[0],
      period: {
        startDate: payload.period.startDate.split("T")[0],
        endDate: payload.period.endDate.split("T")[0],
      },
    };

    console.log(formattedValues, "formattedValues");

    // Submit logic here
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Profit Distribution" />
      <ProfitDistributionForm
        buttonLabel="Update Profit Distribution"
        onSubmit={handleSubmit}
        isLoading={false}
        /* defaultValue={{
          ...data.data,
        }} */
        //   defaultValue={{
        //     ...data,
        //     distributionDate: data.distributionDate.split("T")[0],
        //     period: {
        //       startDate: data.period.startDate.split("T")[0],
        //       endDate: data.period.endDate.split("T")[0],
        //     },
        //   }}
      />
    </div>
  );
};

export default EditProfitDistributionView;
