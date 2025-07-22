"use client";

import { PageHeadingTitle, SupplierForm } from "@/components";
import { CreateSupplierPayload } from "@/types";

const CreateSupplierView = () => {
  const handleSubmit = async (payload: CreateSupplierPayload) => {
    console.log(payload);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Create Supplier" />
      <SupplierForm isLoading={false} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreateSupplierView;
