"use client";

import { DepositsForm, PageHeadingTitle } from "@/components";
import { CreateDepositPayload } from "@/types";

const CreateDepositView = () => {
  const handleSubmit = async (payload: CreateDepositPayload) => {
    const formattedValues = {
      ...payload,
      depositDate: payload.depositDate.split("T")[0],
    };

    console.log(formattedValues);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Deposit" />
      <DepositsForm isLoading={false} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default CreateDepositView;
