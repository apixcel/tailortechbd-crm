import { PageHeadingTitle, SalesOverview } from "@/components";

const SalesView = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeadingTitle title="Sales Report" />
      <SalesOverview />
    </div>
  );
};

export default SalesView;
