"use client";

import { PageHeadingTitle, PartnerForm } from "@/components";
import { IPartner } from "@/types";
import React from "react";

const CreatePartnerView = () => {
  const handleSubmit = async (payload: IPartner) => {
    const formattedValues = {
      ...payload,
      partnerJoiningDate: payload.partnerJoiningDate.split("T")[0],
    };

    console.log(formattedValues);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Partner" />
      <PartnerForm isLoading={false} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePartnerView;
