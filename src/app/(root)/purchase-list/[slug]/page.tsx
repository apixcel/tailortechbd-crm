import { EditPurchaseView } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Purchase | Dashboard",
  description: "Edit Purchase",
};

const UpdatePurchase = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditPurchaseView slug={slug} />;
};

export default UpdatePurchase;
