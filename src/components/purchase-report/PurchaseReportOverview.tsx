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
import PurchaseQuantityCard from "./PurchaseQuantityCard";
import PurchaseAmountCard from "./PurchaseAmountCard";

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
const purchaseChartData = [
  { time: "2025-07-01", totalPurchase: 100, totalPurchaseAmount: 2000 },
  { time: "2025-07-02", totalPurchase: 140, totalPurchaseAmount: 28000 },
  { time: "2025-07-03", totalPurchase: 170, totalPurchaseAmount: 34000 },
  { time: "2025-07-04", totalPurchase: 180, totalPurchaseAmount: 36000 },
  { time: "2025-07-05", totalPurchase: 200, totalPurchaseAmount: 40000 },
  { time: "2025-07-06", totalPurchase: 180, totalPurchaseAmount: 38000 },
  { time: "2025-07-07", totalPurchase: 240, totalPurchaseAmount: 48000 },
  { time: "2025-07-08", totalPurchase: 260, totalPurchaseAmount: 52000 },
];

const PurchaseReportOverview = () => {
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
        <PurchaseQuantityCard
          value={totals.Sales}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
        <PurchaseAmountCard
          value={totals.Earnings}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
      </div>

      <div className="2x:h-[400px] h-[360px] bg-white pt-[50px] pr-4 pb-[70px] 2xl:h-[500px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Purchase Statistics
        </h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={purchaseChartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              yAxisId="left"
              dataKey="totalPurchase"
              name="Total Purchase"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              yAxisId="right"
              dataKey="totalPurchaseAmount"
              name="Purchase Amount"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PurchaseReportOverview;
