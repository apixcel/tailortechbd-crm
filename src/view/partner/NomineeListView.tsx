import { AllNomineeListTable, PageHeadingTitle } from "@/components";

const NomineeListView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <PageHeadingTitle title="Nominee List" />
      <AllNomineeListTable />
    </div>
  );
};

export default NomineeListView;
