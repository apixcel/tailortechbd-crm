import { EditDepositView } from "@/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Deposit | Dashboard",
  description: "Edit Deposit",
};

const UpdateDeposit = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <EditDepositView slug={slug} />;
};

export default UpdateDeposit;
