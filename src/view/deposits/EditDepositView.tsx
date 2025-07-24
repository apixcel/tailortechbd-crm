"use client";

import { toast } from "sonner";

import { DepositsForm, PageHeadingTitle } from "@/components";
import { useRouter } from "next/navigation";
import { IInvestment } from "@/types";

const EditDepositView = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleSubmit = async (payload: Partial<IInvestment>) => {
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

    console.log(payload, "payload");
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Deposit" />
      <DepositsForm
        buttonLabel="Update Deposit"
        onSubmit={handleSubmit}
        isLoading={false}
        /* defaultValue={{
          ...data.data,
        }} */
      />
    </div>
  );
};

export default EditDepositView;
