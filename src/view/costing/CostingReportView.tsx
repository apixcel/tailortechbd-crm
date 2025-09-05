"use client";

import { AnalyticsOverviewFilter, CostingReportOverview, PageHeadingTitle } from "@/components";
import { DateObject } from "react-multi-date-picker";
import { useState } from "react";

const CostingReportView = () => {
  const today = new DateObject();

  const copyDate = (date: DateObject) => new DateObject(date.toDate());

  const last7Days = [copyDate(today).subtract(6, "days"), copyDate(today)];
  const [selectedRange, setSelectedRange] = useState<DateObject[] | null>(last7Days);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between gap-4">
        <PageHeadingTitle title="Costing Report" />

        <div className="flex items-center gap-2">
          Filter by: <AnalyticsOverviewFilter value={selectedRange} onChange={setSelectedRange} />
        </div>
      </div>
      <CostingReportOverview selectedRange={selectedRange || undefined} />
    </div>
  );
};

export default CostingReportView;
