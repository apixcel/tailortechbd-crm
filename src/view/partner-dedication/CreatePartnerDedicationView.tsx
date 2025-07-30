"use client";

import { useCreatePartnerDedicationMutation } from "@/redux/features/partner-dedication/partner-dedication.api";
import { PageHeadingTitle, PartnerDedicationForm } from "@/components";
import { IPartnerDedication, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreatePartnerDedicationView = () => {
  const [createPartnerDedication, { isLoading }] = useCreatePartnerDedicationMutation();
  const router = useRouter();

  const handleSubmit = async (payload: IPartnerDedication) => {
    const formattedValues: IPartnerDedication = {
      ...payload,
      date: payload.date.split("T")[0],
    };

    const res = await createPartnerDedication(formattedValues);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }

      return;
    }

    toast.success("Partner Dedication created successfully");
    router.push("/partner-dedication");

    return;
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Partner Dedication" />
      <PartnerDedicationForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePartnerDedicationView;
