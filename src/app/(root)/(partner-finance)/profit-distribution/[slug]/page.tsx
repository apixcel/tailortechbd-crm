import { EditProfitDistributionView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profit Distribution | Dashboard",
  description: "Edit Profit Distribution",
};

const UpdateProfitDistribution = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditProfitDistributionView slug={slug} />;
};

export default UpdateProfitDistribution;
