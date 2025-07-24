import { Metadata } from "next";
import { ProfitDistributionView } from "@/view";

export const metadata: Metadata = {
  title: "Profit Distribution | Dashboard",
  description: "Profit Distribution",
};

const ProfitDistribution = () => {
  return <ProfitDistributionView />;
};

export default ProfitDistribution;
