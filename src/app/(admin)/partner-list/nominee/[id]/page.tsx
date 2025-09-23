import { NomineeListView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nominee List | Dashboard",
  description: "Nominee List",
};

const NomineeList = () => {
  return <NomineeListView />;
};

export default NomineeList;
