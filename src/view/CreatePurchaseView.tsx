import { PageHeadingTitle, PurchaseForm } from "@/components";

const CreatePurchaseView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Create Purchase" />
      <PurchaseForm />
    </div>
  );
};

export default CreatePurchaseView;
