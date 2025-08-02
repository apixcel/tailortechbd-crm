import { EditPartnerView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Partner | Dashboard",
  description: "Edit Partner",
};

const UpdatePartner = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditPartnerView slug={slug} />;
};

export default UpdatePartner;
