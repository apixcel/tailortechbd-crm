"use client";

import { toast } from "sonner";

import { PageHeadingTitle, PartnerDedicationForm } from "@/components";
import { useRouter } from "next/navigation";
import { CreatePartnerDedicationPayload } from "@/types";

const EditPartnerDedicationView = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleSubmit = async (payload: CreatePartnerDedicationPayload) => {
    const formattedValues: CreatePartnerDedicationPayload = {
      ...payload,
      date: payload.date.split("T")[0],
    };

    console.log(formattedValues, "formattedValues");

    // Submit logic here
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Partner Dedication" />
      <PartnerDedicationForm
        buttonLabel="Update Partner Dedication"
        onSubmit={handleSubmit}
        isLoading={false}
        /* defaultValue={{
          ...data.data,
        }} */
        //   defaultValue={{
        //     ...data,
        //     distributionDate: data.distributionDate.split("T")[0],
        //     period: {
        //       startDate: data.period.startDate.split("T")[0],
        //       endDate: data.period.endDate.split("T")[0],
        //     },
        //   }}
      />
    </div>
  );
};

export default EditPartnerDedicationView;
