import { CreatePartnerView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Partner | Dashboard",
  description: "Create a new partner",
};

const CreatePartner = () => {
  return <CreatePartnerView />;
};

export default CreatePartner;
