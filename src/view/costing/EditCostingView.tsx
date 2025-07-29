"use client";

import {
  useGetCostingByIdQuery,
  useUpdateCostingByIdMutation,
} from "@/redux/features/costing/costing.api";
import { ICosting, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CostingForm, PageHeadingTitle, Loader, DataNotFound } from "@/components";

const EditCostingView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetCostingByIdQuery({ costingId: slug });
  const [updateCosting, { isLoading: isUpdating }] = useUpdateCostingByIdMutation();
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Costing Not Found" />;
  }

  const handleSubmit = async (payload: ICosting) => {
    const formattedValues: ICosting = {
      ...payload,
      costingDate: payload.costingDate.split("T")[0],
    };

    if (isUpdating) {
      return;
    }

    const res = await updateCosting({ costingId: data.data._id, payload: formattedValues });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }
      return;
    }

    toast.success("Costing updated successfully");
    router.push("/costing-list");

    return;
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Costing" />
      <CostingForm
        buttonLabel="Update Costing"
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        defaultValue={data?.data}
      />
    </div>
  );
};

export default EditCostingView;
