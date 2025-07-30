"use client";

import { useCreateDepositMutation } from "@/redux/features/deposits/deposits.api";
import { IDeposit, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DepositsForm, PageHeadingTitle } from "@/components";

const CreateDepositView = () => {
  const [createDeposit, { isLoading }] = useCreateDepositMutation();
  const router = useRouter();

  const handleSubmit = async (payload: IDeposit) => {
    const formattedValues = {
      ...payload,
      depositDate: payload.depositDate.split("T")[0],
    };

    const res = await createDeposit(formattedValues);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }
      return;
    }

    toast.success("Deposit created successfully");
    router.push("/deposits");

    return;
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Deposit" />
      <DepositsForm isLoading={isLoading} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreateDepositView;
