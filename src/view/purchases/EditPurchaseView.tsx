"use client";

import { toast } from "sonner";
import PurchaseForm from "../../components/create-purchase/PurchaseForm";
import PageHeadingTitle from "../../components/shared/PageHeadingTitle";
import { useRouter } from "next/navigation";
import { IPurchase, IQueryMutationErrorResponse } from "@/types";
import {
  useGetPurchaseByIdQuery,
  useUpdatePurchaseByIdMutation,
} from "@/redux/features/purchase/purchase.api";
import { DataNotFound, Loader } from "@/components";

const EditPurchaseView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetPurchaseByIdQuery({ purchaseId: slug });
  const [updatePurchase, { isLoading: isUpdating }] = useUpdatePurchaseByIdMutation();

  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Purchase Not Found" />;
  }

  const handleSubmit = async (payload: Partial<IPurchase>) => {
    if (isUpdating) {
      return;
    }

    const res = await updatePurchase({
      purchaseId: data.data._id,
      payload,
    });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }
      return;
    }

    toast.success("Purchase updated successfully");
    router.push("/purchase-list");
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Purchase" />
      <PurchaseForm
        buttonLabel="Update Purchase"
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        defaultValue={data.data}
      />
    </div>
  );
};

export default EditPurchaseView;
