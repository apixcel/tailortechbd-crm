import { EditInvestmentView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Investment | Dashboard",
  description: "Edit Investment",
};

const UpdateInvestment = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditInvestmentView slug={slug} />;
};

export default UpdateInvestment;
