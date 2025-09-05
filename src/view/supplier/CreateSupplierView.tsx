"use client";

import { useCreateSupplierMutation } from "@/redux/features/supplier/supplier.api";
import { IQueryMutationErrorResponse, ISupplier } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeadingTitle, SupplierForm } from "@/components";

const CreateSupplierView = () => {
  const [createSupplier, { isLoading }] = useCreateSupplierMutation();
  const router = useRouter();

  const handleSubmit = async (payload: Partial<ISupplier>) => {
    const res = await createSupplier(payload);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }

      return;
    }

    toast.success("Supplier created successfully");
    router.push("/supplier-list");

    return;
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Create Supplier" />
      <SupplierForm isLoading={isLoading} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreateSupplierView;
