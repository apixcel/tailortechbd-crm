"use client";

import { useCreateProfitWithdrawalMutation } from "@/redux/features/profit-withdrawal/profit-withdrawal.api";
import { IProfitWithdrawal } from "@/types";
import { useRouter } from "next/navigation";

import { PageHeadingTitle, ProfitWithdrawalForm } from "@/components";

const CreateProfitWithdrawalView = () => {
  const [createProfitWithdrawal, { isLoading }] = useCreateProfitWithdrawalMutation();
  const router = useRouter();

  const handleSubmit = async (payload: IProfitWithdrawal) => {
    const formattedValues: IProfitWithdrawal = {
      ...payload,
      withdrawalDate: payload.withdrawalDate.split("T")[0],
    };

    console.log(formattedValues);

    // const res = await createProfitWithdrawal(formattedValues);
    // const error = res.error as IQueryMutationErrorResponse;
    // if (error) {
    //   if (error?.data?.message) {
    //     toast(error.data?.message);
    //   } else {
    //     toast("Something went wrong");
    //   }

    //   return;
    // }

    // toast.success("Profit Withdrawal created successfully");
    // router.push("/profit-withdrawal");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Profit Withdrawal" />
      <ProfitWithdrawalForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateProfitWithdrawalView;
