import { EditSupplierView } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Supplier | Dashboard",
  description: "Edit Supplier",
};

const UpdateSupplier = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditSupplierView slug={slug} />;
};

export default UpdateSupplier;
