import { CostingListView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Costing List | Dashboard",
  description: "Costing List",
};

const CostingList = () => {
  return <CostingListView />;
};

export default CostingList;
