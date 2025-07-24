import { CreateProfitDistributionView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Profit Distribution | Admin Dashboard",
  description: "Create Profit Distribution",
};

const CreateProfitDistribution = () => {
  return <CreateProfitDistributionView />;
};

export default CreateProfitDistribution;
