"use client";

import { PageHeadingTitle, PartnerForm } from "@/components/";
import { IPartner } from "@/types";
import { mockPartners } from "@/constants/partnerData";

const EditPartnerView = ({ slug }: { slug: string }) => {
  const handleSubmit = async (payload: Partial<IPartner>) => {
    const formattedValues = {
      ...payload,
      partnerJoiningDate: payload.partnerJoiningDate?.split("T")[0],
    };
    // if (isUpdating) {
    //   return;
    // }

    // const res = await updatePurchase({
    //   purchaseId: data.data._id,
    //   payload,
    // });
    // const error = res.error as IQueryMutationErrorResponse;
    // if (error) {
    //   if (error?.data?.message) {
    //     toast(error.data?.message);
    //   } else {
    //     toast("Something went wrong");
    //   }
    //   return;
    // }

    // toast.success("Purchase updated successfully");
    // router.push("/purchase-list");

    console.log(formattedValues);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeadingTitle title="Edit Purchase" />
      <PartnerForm
        buttonLabel="Update Purchase"
        onSubmit={handleSubmit}
        isLoading={false}
        defaultValue={mockPartners[0]}
      />
    </div>
  );
};

export default EditPartnerView;
