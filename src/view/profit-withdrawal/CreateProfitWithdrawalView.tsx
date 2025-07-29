"use client";

import { useCreateProfitWithdrawalMutation } from "@/redux/features/profit-withdrawal/profit-withdrawal.api";
import { IProfitWithdrawal, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeadingTitle, ProfitWithdrawalForm } from "@/components";

const CreateProfitWithdrawalView = () => {
  const [createProfitWithdrawal, { isLoading }] = useCreateProfitWithdrawalMutation();
  const router = useRouter();

  const handleSubmit = async (payload: IProfitWithdrawal) => {
    const formattedValues: IProfitWithdrawal = {
      ...payload,
      withdrawalDate: payload.withdrawalDate.split("T")[0],
      profitPeriod: {
        startDate: payload.profitPeriod.startDate.split("T")[0],
        endDate: payload.profitPeriod.endDate.split("T")[0],
      },
    };

    const res = await createProfitWithdrawal(formattedValues);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }

      return;
    }

    toast.success("Profit Withdrawal created successfully");
    router.push("/profit-withdrawal");

    return;
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Profit Withdrawal" />
      <ProfitWithdrawalForm isLoading={isLoading} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreateProfitWithdrawalView;
