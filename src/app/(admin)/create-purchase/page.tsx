import { Metadata } from "next";
import { CreatePurchaseView } from "@/view";

export const metadata: Metadata = {
  title: "Create Purchase | Dashboard",
  description: "Create Purchase",
};

const CreatePurchase = () => {
  return <CreatePurchaseView />;
};

export default CreatePurchase;
