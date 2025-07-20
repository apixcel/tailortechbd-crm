"use client";

import { useState } from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AnalyticsOverviewFilter } from "@/components";
import CostingQuantityCard from "./CostingQuantityCard";
import CostingAmountCard from "./CostingAmountCard";

const options = [
  { value: "overall", label: "Overall" },
  { value: "today", label: "Today" },
  { value: "this-month", label: "This Month" },
  { value: "this-year", label: "This Year" },
];

// dummy data
const totals = {
  Sales: 100,
  Earnings: 100,
  Customers: 100,
  Sms: 100,
};

const increase = 10;

// dummy data for purchase chart
const costingChartData = [
  { time: "2025-07-01", totalCosting: 100, totalCostingAmount: 2000 },
  { time: "2025-07-02", totalCosting: 140, totalCostingAmount: 28000 },
  { time: "2025-07-03", totalCosting: 170, totalCostingAmount: 34000 },
  { time: "2025-07-04", totalCosting: 180, totalCostingAmount: 36000 },
  { time: "2025-07-05", totalCosting: 200, totalCostingAmount: 40000 },
  { time: "2025-07-06", totalCosting: 180, totalCostingAmount: 38000 },
  { time: "2025-07-07", totalCosting: 240, totalCostingAmount: 48000 },
  { time: "2025-07-08", totalCosting: 260, totalCostingAmount: 52000 },
];

const CostingOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[2]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-end bg-white p-4">
        <AnalyticsOverviewFilter
          options={options}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <CostingQuantityCard
          value={totals.Sales}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
        <CostingAmountCard
          value={totals.Earnings}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
      </div>

      <div className="2x:h-[400px] h-[360px] bg-white pt-[50px] pr-4 pb-[70px] 2xl:h-[500px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Costing Statistics
        </h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={costingChartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              yAxisId="left"
              dataKey="totalCosting"
              name="Total Costing"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              yAxisId="right"
              dataKey="totalCostingAmount"
              name="Costing Amount"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CostingOverview;
