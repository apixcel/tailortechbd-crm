"use client";

import { useCreateCostingMutation } from "@/redux/features/costing/costing.api";
import { ICosting, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CostingForm, PageHeadingTitle } from "@/components";

const CreateCostingView = () => {
  const [createCosting, { isLoading }] = useCreateCostingMutation();
  const router = useRouter();

  const handleSubmit = async (payload: ICosting) => {
    const formattedValues = {
      ...payload,
      costingDate: payload.costingDate.split("T")[0],
      fileUrl: payload.fileUrl || undefined,
    };

    const res = await createCosting(formattedValues);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }

      return;
    }

    toast.success("Costing created successfully");
    router.push("/costing-list");

    return;
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Costing" />
      <CostingForm isLoading={isLoading} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreateCostingView;
