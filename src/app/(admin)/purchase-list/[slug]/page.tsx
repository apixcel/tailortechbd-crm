import { Metadata } from "next";
import { ApparelForm, OtherPurchaseForm, PageHeadingTitle } from "@/components";

export const metadata: Metadata = {
  title: "Edit Purchase | Dashboard",
  description: "Edit Purchase",
};

const UpdatePurchase = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { type } = await searchParams;

  return (
    <div>
      {type === "APPAREL" ? (
        <div>
          <PageHeadingTitle title="Edit Apparel Purchase" />
          <ApparelForm defaultValue={slug} />
        </div>
      ) : type === "IT" ? (
        <div>
          <PageHeadingTitle title="Edit IT Purchase" />
          <OtherPurchaseForm type="IT" defaultValue={slug} />
        </div>
      ) : type === "ELECTRONIC" ? (
        <div>
          <PageHeadingTitle title="Edit Electronic Purchase" />
          <OtherPurchaseForm type="ELECTRONIC" defaultValue={slug} />
        </div>
      ) : type === "CIVIL" ? (
        <div>
          <PageHeadingTitle title="Edit Civil Purchase" />
          <OtherPurchaseForm type="CIVIL" defaultValue={slug} />
        </div>
      ) : type === "ELECTRICAL" ? (
        <div>
          <PageHeadingTitle title="Edit Electrical Purchase" />
          <OtherPurchaseForm type="ELECTRICAL" defaultValue={slug} />
        </div>
      ) : null}
    </div>
  );
};

export default UpdatePurchase;
