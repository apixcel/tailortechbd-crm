import { SupplierPaymentsListView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplier Payments List | Dashboard",
  description: "Supplier Payments List",
};

const SupplierList = () => {
  return <SupplierPaymentsListView />;
};

export default SupplierList;
