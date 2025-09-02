import { CreateProfitWithdrawalView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Profit Withdrawal | Admin Dashboard",
  description: "Create Profit Withdrawal",
};

const CreateProfitWithdrawal = () => {
  return <CreateProfitWithdrawalView />;
};

export default CreateProfitWithdrawal;
