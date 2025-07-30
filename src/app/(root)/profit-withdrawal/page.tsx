import { ProfitWithdrawalView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit Withdrawal | Dashboard",
  description: "Profit Withdrawal",
};

const ProfitWithdrawal = () => {
  return <ProfitWithdrawalView />;
};

export default ProfitWithdrawal;
