"use client";

import {
  useGetDepositByIdQuery,
  useUpdateDepositByIdMutation,
} from "@/redux/features/deposits/deposits.api";
import { IDeposit, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DepositsForm, Loader, PageHeadingTitle, DataNotFound } from "@/components";

const EditDepositView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetDepositByIdQuery({ depositId: slug });
  const [updateDeposit, { isLoading: isUpdating }] = useUpdateDepositByIdMutation();
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Deposit Not Found" />;
  }

  const handleSubmit = async (payload: IDeposit) => {
    const formattedValues: IDeposit = {
      ...payload,
      depositDate: payload.depositDate.split("T")[0],
    };

    if (isUpdating) {
      return;
    }

    const res = await updateDeposit({ depositId: slug, payload: formattedValues });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }
      return;
    }

    toast.success("Deposit updated successfully");
    router.push("/deposits");

    return;
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Deposit" />
      <DepositsForm
        buttonLabel="Update Deposit"
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        defaultValue={data.data}
      />
    </div>
  );
};

export default EditDepositView;
