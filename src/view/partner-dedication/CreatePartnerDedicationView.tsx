"use client";

import { PageHeadingTitle, PartnerDedicationForm } from "@/components";
import { CreatePartnerDedicationPayload } from "@/types";
import { FormikHelpers } from "formik";

const CreatePartnerDedicationView = () => {
  const handleSubmit = async (
    payload: CreatePartnerDedicationPayload,
    _formikHelpers: FormikHelpers<CreatePartnerDedicationPayload>
  ) => {
    const formattedValues: CreatePartnerDedicationPayload = {
      ...payload,
      date: payload.date.split("T")[0],
    };

    console.log(formattedValues);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Partner Dedication" />
      <PartnerDedicationForm isLoading={false} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePartnerDedicationView;
