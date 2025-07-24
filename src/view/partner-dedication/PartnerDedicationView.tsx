import { AllPartnerDedicationTable, PageHeadingTitle } from "@/components";

const PartnerDedicationView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Partner Dedication" />
      <AllPartnerDedicationTable />
    </div>
  );
};

export default PartnerDedicationView;
