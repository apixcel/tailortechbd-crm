import { Metadata } from "next";
import { PartnerDedicationView } from "@/view";

export const metadata: Metadata = {
  title: "Partner Dedication | Dashboard",
  description: "Partner Dedication",
};

const PartnerDedication = () => {
  return <PartnerDedicationView />;
};

export default PartnerDedication;
