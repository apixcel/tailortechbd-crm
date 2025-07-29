"use client";

import {
  useGetInvestmentByIdQuery,
  useUpdateInvestmentByIdMutation,
} from "@/redux/features/investments/investments.api";
import { IInvestment, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { InvestmentsForm, PageHeadingTitle, Loader, DataNotFound } from "@/components";

const EditInvestmentView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetInvestmentByIdQuery({ investmentId: slug });
  const [updateInvestment, { isLoading: isUpdating }] = useUpdateInvestmentByIdMutation();
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Investment Not Found" />;
  }

  const handleSubmit = async (payload: IInvestment) => {
    const formattedValues: IInvestment = {
      ...payload,
      investmentDate: payload.investmentDate.split("T")[0],
    };

    if (isUpdating) {
      return;
    }

    const res = await updateInvestment({ investmentId: data.data._id, payload: formattedValues });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }
      return;
    }

    toast.success("Investment updated successfully");
    router.push("/investments");

    return;
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Investment" />
      <InvestmentsForm
        buttonLabel="Update Investment"
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        defaultValue={data.data}
      />
    </div>
  );
};

export default EditInvestmentView;
