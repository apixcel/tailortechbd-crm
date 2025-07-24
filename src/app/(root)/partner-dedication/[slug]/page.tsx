import { EditPartnerDedicationView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Partner Dedication | Dashboard",
  description: "Edit Partner Dedication",
};

const UpdatePartnerDedication = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditPartnerDedicationView slug={slug} />;
};

export default UpdatePartnerDedication;
