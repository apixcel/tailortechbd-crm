"use client";

import { toast } from "sonner";

import { DataNotFound, Loader, PageHeadingTitle, PartnerDedicationForm } from "@/components";
import { useRouter } from "next/navigation";
import {
  useGetPartnerDedicationByIdQuery,
  useUpdatePartnerDedicationByIdMutation,
} from "@/redux/features/partner-dedication/partner-dedication.api";
import { IPartnerDedication, IQueryMutationErrorResponse } from "@/types";

const EditPartnerDedicationView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetPartnerDedicationByIdQuery({
    partnerDedicationId: slug,
  });
  const [updatePartnerDedication, { isLoading: isUpdating }] =
    useUpdatePartnerDedicationByIdMutation();
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Partner Dedication Not Found" />;
  }

  const handleSubmit = async (payload: IPartnerDedication) => {
    const formattedValues: IPartnerDedication = {
      ...payload,
      date: payload.date.split("T")[0],
    };

    if (isUpdating) {
      return;
    }

    const res = await updatePartnerDedication({
      partnerDedicationId: data.data._id,
      payload: formattedValues,
    });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }

    toast.success("Partner Dedication updated successfully");
    router.push("/partner-dedication");

    return;
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Partner Dedication" />
      <PartnerDedicationForm
        buttonLabel="Update Partner Dedication"
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        defaultValue={data?.data}
      />
    </div>
  );
};

export default EditPartnerDedicationView;
