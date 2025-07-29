"use client";

import {
  useGetProfitWithdrawalByIdQuery,
  useUpdateProfitWithdrawalByIdMutation,
} from "@/redux/features/profit-withdrawal/profit-withdrawal.api";
import { IProfitWithdrawal, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataNotFound, Loader, PageHeadingTitle, ProfitWithdrawalForm } from "@/components";

const EditProfitWithdrawalView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetProfitWithdrawalByIdQuery({
    profitWithdrawalId: slug,
  });
  const [updateProfitWithdrawal, { isLoading: isUpdating }] =
    useUpdateProfitWithdrawalByIdMutation();
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Profit Distribution Not Found" />;
  }

  const handleSubmit = async (payload: IProfitWithdrawal) => {
    const formattedValues: IProfitWithdrawal = {
      ...payload,
      withdrawalDate: payload.withdrawalDate.split("T")[0],
      profitPeriod: {
        startDate: payload.profitPeriod.startDate.split("T")[0],
        endDate: payload.profitPeriod.endDate.split("T")[0],
      },
    };

    if (isUpdating) {
      return;
    }

    const res = await updateProfitWithdrawal({
      profitWithdrawalId: data.data._id,
      payload: formattedValues,
    });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }

    toast.success("Profit Withdrawal updated successfully");
    router.push("/profit-withdrawal");

    return;
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Profit Withdrawal" />
      <ProfitWithdrawalForm
        buttonLabel="Update Profit Withdrawal"
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        defaultValue={data?.data}
      />
    </div>
  );
};

export default EditProfitWithdrawalView;
