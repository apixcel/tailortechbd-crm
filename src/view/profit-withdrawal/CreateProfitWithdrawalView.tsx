"use client";

import { useCreateProfitWithdrawalMutation } from "@/redux/features/profit-withdrawal/profit-withdrawal.api";
import { IProfitWithdrawal, IProfitWithdrawalPayload, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";

import { PageHeadingTitle, ProfitWithdrawalForm } from "@/components";
import { toast } from "sonner";

const CreateProfitWithdrawalView = () => {
  const [createProfitWithdrawal, { isLoading }] = useCreateProfitWithdrawalMutation();
  const router = useRouter();

  const handleSubmit = async (payload: IProfitWithdrawal) => {
    const formattedValues: IProfitWithdrawalPayload = {
      ...payload,
      partner: payload.partner._id,
      attachment: payload.attachment || "",
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

    toast.success("Withdrawal created successfully");
    router.push("/profit-withdrawal");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Profit Withdrawal" />
      <ProfitWithdrawalForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateProfitWithdrawalView;
