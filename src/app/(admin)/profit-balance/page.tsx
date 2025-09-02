import { ProfitBalanceView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit Balance | Dashboard",
  description: "Profit Balance",
};

const ProfitBalance = () => {
  return <ProfitBalanceView />;
};

export default ProfitBalance;
