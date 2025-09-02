import { EditProfitWithdrawalView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profit Withdrawal | Dashboard",
  description: "Edit Profit Withdrawal",
};

const UpdateProfitWithdrawal = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditProfitWithdrawalView slug={slug} />;
};

export default UpdateProfitWithdrawal;
