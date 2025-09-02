"use client";

import { useCreateInvestmentMutation } from "@/redux/features/investments/investments.api";
import { IInvestment, IInvestmentPayload, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { InvestmentsForm, PageHeadingTitle } from "@/components";

const CreateInvestmentView = () => {
  const [createInvestment, { isLoading }] = useCreateInvestmentMutation();
  const router = useRouter();

  const handleSubmit = async (payload: IInvestment) => {
    const formattedValues: IInvestmentPayload = {
      investmentAmount: payload.investmentAmount,
      investmentDate: payload.investmentDate,
      note: payload.note,
      partner: payload.partner._id,
      transactionMethod: payload.transactionMethod || "",
      remarks: payload.remarks || "",
      attachment: payload.attachment || undefined,
    };

    const res = await createInvestment(formattedValues);

    if (res.error) {
      const error = res.error as IQueryMutationErrorResponse;
      if (error) {
        if (error?.data?.message) {
          toast(error.data?.message);
        } else {
          toast("Something went wrong");
        }

        return;
      }
    } else {
      toast.success("Investment created successfully");
      router.push("/investments");
    }
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Investment" />
      <InvestmentsForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateInvestmentView;
