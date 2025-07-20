import { CostingView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Costing Report | Dashboard",
  description: "Costing Report",
};

const CostingReport = () => {
  return <CostingView />;
};

export default CostingReport;
