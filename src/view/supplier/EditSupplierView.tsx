"use client";

import { toast } from "sonner";
import { SupplierForm, PageHeadingTitle, Loader, DataNotFound } from "@/components";
import { useRouter } from "next/navigation";
import { IQueryMutationErrorResponse, ISupplier } from "@/types";
import {
  useGetSupplierByIdQuery,
  useUpdateSupplierByIdMutation,
} from "@/redux/features/supplier/supplier.api";

const EditSupplierView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetSupplierByIdQuery({ supplierId: slug });
  const [updateSupplier, { isLoading: isUpdating }] = useUpdateSupplierByIdMutation();

  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Product Not Found" />;
  }

  const handleSubmit = async (payload: Partial<ISupplier>) => {
    if (isUpdating) {
      return;
    }

    const res = await updateSupplier({
      supplierId: data.data._id || "",
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

    toast.success("Supplier updated successfully");
    router.push("/supplier-list");
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Supplier" />
      <SupplierForm
        buttonLabel="Update Supplier"
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        defaultValue={{
          ...data?.data,
        }}
      />
    </div>
  );
};

export default EditSupplierView;
