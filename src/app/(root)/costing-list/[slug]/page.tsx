import { EditCostingView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Costing | Dashboard",
  description: "Edit Costing",
};

const UpdateCosting = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditCostingView slug={slug} />;
};

export default UpdateCosting;
