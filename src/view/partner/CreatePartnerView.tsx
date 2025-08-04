"use client";

import { PageHeadingTitle, PartnerForm } from "@/components";
import { useCreatePartnerMutation } from "@/redux/features/partners/partner.api";
import { IPartner, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreatePartnerView = () => {
  const [createPartner, { isLoading }] = useCreatePartnerMutation();
  const router = useRouter();

  const handleSubmit = async (payload: IPartner) => {
    const res = await createPartner(payload);
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }
      return;
    }

    toast.success("Partner created successfully");
    router.push("/partner-list");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Partner" />
      <PartnerForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePartnerView;
