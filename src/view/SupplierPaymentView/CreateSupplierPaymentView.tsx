"use client";
import SupplierPaymentForm from "@/components/SupplierPayment/SupplierPaymentForm";
import { useCreateSupplierPaymentMutation } from "@/redux/features/supplierPayment/supplierPayment.api";
import { IQueryMutationErrorResponse } from "@/types";
import { ISupplierPayment } from "@/types/supplierPayment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const CreateSupplierPaymentView = () => {
  const [createSupplierPayment, { isLoading }] = useCreateSupplierPaymentMutation();

  const router = useRouter();

  const handleSubmit = async (values: Partial<ISupplierPayment>) => {
    console.log(values);
    // return;
    if (isLoading) return;
    const res = await createSupplierPayment(values);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error.data?.message || "Something went wrong");
      return;
    }

    toast.success("Supplier Payment created successfully");
    router.push("/supplier-payments-list");
  };

  return <SupplierPaymentForm isLoading={isLoading} onSubmit={handleSubmit} />;
};

export default CreateSupplierPaymentView;
