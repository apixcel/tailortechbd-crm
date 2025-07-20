import { PurchaseListView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase List | Dashboard",
  description: "Purchase List",
};

const PurchaseList = () => {
  return <PurchaseListView />;
};

export default PurchaseList;
