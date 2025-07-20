import { PurchaseReportView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Report | Dashboard",
  description: "Purchase Report",
};

const PurchaseReport = () => {
  return <PurchaseReportView />;
};

export default PurchaseReport;
