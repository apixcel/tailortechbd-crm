import { Metadata } from "next";
import { DepositsView } from "@/view";

export const metadata: Metadata = {
  title: "Deposits | Dashboard",
  description: "Deposits",
};

const Deposits = () => {
  return <DepositsView />;
};

export default Deposits;
