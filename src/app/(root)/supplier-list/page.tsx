import { SupplierListView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplier List | Dashboard",
  description: "Supplier List",
};

const SupplierList = () => {
  return <SupplierListView />;
};

export default SupplierList;
