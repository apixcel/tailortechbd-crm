import { CreateInvestmentView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Investment | Admin Dashboard",
  description: "Create Investment",
};

const CreateInvestment = () => {
  return <CreateInvestmentView />;
};

export default CreateInvestment;
