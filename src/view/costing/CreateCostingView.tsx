"use client";

import { useCreateCostingMutation } from "@/redux/features/costing/costing.api";
import { CostingForm, PageHeadingTitle } from "@/components";
import { ICosting, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateCostingView = () => {
  const [createCosting, {isLoading}] = useCreateCostingMutation();
  const router = useRouter()

  const handleSubmit = async (payload: ICosting) => {
    const res = await createCosting(payload);
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
