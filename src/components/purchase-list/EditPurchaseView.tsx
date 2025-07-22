"use client";

import { toast } from "sonner";
import PurchaseForm from "../create-purchase/PurchaseForm";
import PageHeadingTitle from "../shared/PageHeadingTitle";
import { useRouter } from "next/navigation";
import { IPurchase } from "@/types";

const EditPurchaseView = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleSubmit = async (payload: Partial<IPurchase>) => {
    /* if (isUpdating) {
          return;
        }
    
        const res = await updateProduct({
          productId: data.data._id,
          payload,
        });
        const error = res.error as IQueruMutationErrorResponse;
        if (error) {
          if (error?.data?.message) {
            toast(error.data?.message);
          } else {
            toast("Something went wrong");
          }
          return;
        }
    
        toast.success("Product updated successfully");
        router.push("/dashboard/products"); */
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Purchase" />
      <PurchaseForm
        buttonLabel="Update Purchase"
        onSubmit={handleSubmit}
        isLoading={false}
        /* defaultValue={{
          ...data.data,
        }} */
      />
    </div>
  );
};

export default EditPurchaseView;
