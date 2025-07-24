import { CreatePartnerDedicationView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Partner Dedication | Admin Dashboard",
  description: "Create Partner Dedication",
};

const CreatePartnerDedication = () => {
  return <CreatePartnerDedicationView />;
};

export default CreatePartnerDedication;
