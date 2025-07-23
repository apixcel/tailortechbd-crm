"use client";

import { toast } from "sonner";
import SupplierForm from "../create-supplier/SupplierForm";
import PageHeadingTitle from "../shared/PageHeadingTitle";
import { useRouter } from "next/navigation";
import { ISupplier } from "@/types";

const EditSupplierView = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleSubmit = async (payload: Partial<ISupplier>) => {
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
      <PageHeadingTitle title="Edit Supplier" />
      <SupplierForm
        buttonLabel="Update Supplier"
        onSubmit={handleSubmit}
        isLoading={false}
        /* defaultValue={{
          ...data.data,
        }} */
      />
    </div>
  );
};

export default EditSupplierView;
