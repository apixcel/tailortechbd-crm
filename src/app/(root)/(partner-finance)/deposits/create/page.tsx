import { CreateDepositView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Deposit | Admin Dashboard",
  description: "Create Deposit",
};

const CreateDeposit = () => {
  return <CreateDepositView />;
};

export default CreateDeposit;
