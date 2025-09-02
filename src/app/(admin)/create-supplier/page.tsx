import { Metadata } from "next";
import { CreateSupplierView } from "@/view";

export const metadata: Metadata = {
  title: "Create Supplier | Dashboard",
  description: "Create Supplier",
};

const CreateSupplier = () => {
  return <CreateSupplierView />;
};

export default CreateSupplier;
