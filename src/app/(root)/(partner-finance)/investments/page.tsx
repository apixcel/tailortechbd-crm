import { Metadata } from "next";
import { InvestmentsView } from "@/view";

export const metadata: Metadata = {
  title: "Investments | Dashboard",
  description: "Investments",
};

const Investments = () => {
  return <InvestmentsView />;
};

export default Investments;
