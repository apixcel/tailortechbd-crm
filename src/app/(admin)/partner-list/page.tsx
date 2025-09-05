import { PartnerListView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner List | Dashboard",
  description: "Partner List",
};

const PartnerList = () => {
  return <PartnerListView />;
};

export default PartnerList;
