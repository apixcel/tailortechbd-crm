"use client";

import { useCreateInvestmentMutation } from "@/redux/features/investments/investments.api";
import { IInvestment, IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { InvestmentsForm, PageHeadingTitle } from "@/components";

const CreateInvestmentView = () => {
  const [createInvestment, { isLoading }] = useCreateInvestmentMutation();
  const router = useRouter();

  const handleSubmit = async (payload: IInvestment) => {
    const formattedValues = {
      ...payload,
      investmentDate: payload.investmentDate.split("T")[0],
    };

    console.log(formattedValues);

    // const res = await createInvestment(formattedValues);
    // const error = res.error as IQueryMutationErrorResponse;
    // if (error) {
    //   if (error?.data?.message) {
    //     toast(error.data?.message);
    //   } else {
    //     toast("Something went wrong");
    //   }

    //   return;
    // }

    // toast.success("Investment created successfully");
    // router.push("/investments");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Create Investment" />
      <InvestmentsForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateInvestmentView;
