"use client";

import { PageHeadingTitle, PartnerForm } from "@/components";
import { PartnerFormValues } from "@/components/partner/PartnerForm";
import {
  useCratePartnerNomineeMutation,
  useCreatePartnerMutation,
} from "@/redux/features/partners/partner.api";
import { IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreatePartnerView = () => {
  const [createPartner, { isLoading }] = useCreatePartnerMutation();
  const router = useRouter();

  const [createNominee, { isLoading: isNomineeLoading }] = useCratePartnerNomineeMutation();

  const handleSubmit = async (payload: PartnerFormValues) => {
    const { nominees, ...rest } = payload;
    const res = await createPartner(rest);
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      if (error?.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }

    for (const nominee of nominees) {
      const nomineeRes = await createNominee({ ...nominee, partner: res.data?.data._id || "" });
      const nomineeError = nomineeRes.error as IQueryMutationErrorResponse;

      if (nomineeError) {
        if (nomineeError?.data?.message) {
          toast.error(nomineeError.data?.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    }

    toast.success("Partner created successfully");
    router.push("/partner-list");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Partner" />
      <PartnerForm isLoading={isLoading || isNomineeLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePartnerView;
