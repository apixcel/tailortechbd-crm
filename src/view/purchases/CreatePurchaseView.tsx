"use client";

import { PageHeadingTitle, PurchaseForm } from "@/components";
import { useCreatePurchaseMutation } from "@/redux/features/purchase/purchase.api";
import { IPurchase, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreatePurchaseView = () => {
  const [createPurchase, { isLoading }] = useCreatePurchaseMutation();
  const router = useRouter();

  const handleSubmit = async (payload: Omit<IPurchase, "_id" | "createdAt" | "updatedAt">) => {
    console.log("log from create function", payload);
    const res = await createPurchase(payload);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }

      return;
    }

    toast.success("Purchase created successfully");
    router.push("/purchase-list");

    return;
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Create Purchase" />
      <PurchaseForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePurchaseView;
