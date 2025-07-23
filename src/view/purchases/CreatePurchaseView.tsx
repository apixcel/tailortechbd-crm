"use client";

import { PageHeadingTitle, PurchaseForm } from "@/components";
import { CreatePurchasePayload } from "@/types";

const CreatePurchaseView = () => {
  const handleSubmit = async (payload: CreatePurchasePayload) => {
    console.log(payload);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Create Purchase" />
      <PurchaseForm isLoading={false} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreatePurchaseView;
