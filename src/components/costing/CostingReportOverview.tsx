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

import CostingQuantityCard from "./CostingQuantityCard";
import CostingAmountCard from "./CostingAmountCard";
import { DateObject } from "react-multi-date-picker";

const options = [
  { value: "overall", label: "Overall" },
  { value: "today", label: "Today" },
  { value: "this-month", label: "This Month" },
  { value: "this-year", label: "This Year" },
];

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

interface CostingReportOverviewProps {
  selectedRange: DateObject[] | undefined;
}

const CostingReportOverview = ({ selectedRange }: CostingReportOverviewProps) => {
  const [selectedFilter, setSelectedFilter] = useState(options[2]);

  // Filter sales data by selected date range
  const filteredData = costingChartData.filter((item) => {
    if (!selectedRange || selectedRange.length !== 2) return true;

    const from = selectedRange[0].toDate();
    const to = selectedRange[1].toDate();
    const itemDate = new Date(item.time);

    return itemDate >= from && itemDate <= to;
  });

  // Calculate totals
  const totals = {
    quantity: filteredData.reduce((acc, item) => acc + item.totalCosting, 0),
    amount: filteredData.reduce((acc, item) => acc + item.totalCostingAmount, 0),
  };

  // Format the selected filter label
  const formatDate = (dateObj: DateObject) => dateObj?.format("DD-MM-YYYY");

  const selectedFilterLabel =
    selectedRange && selectedRange.length === 2
      ? `${formatDate(selectedRange[0])} to ${formatDate(selectedRange[1])}`
      : "Custom";

  return (
    <section>
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <CostingQuantityCard
          value={totals.quantity}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
        <CostingAmountCard
          value={totals.amount}
          selectedFilter={selectedFilterLabel}
          increase={increase}
        />
      </div>

      <div className="2x:h-[400px] h-[360px] bg-white pt-[50px] pr-4 pb-[70px] 2xl:h-[500px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Costing Statistics
        </h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={costingChartData}
            margin={{ top: 10, right: 24, left: 8, bottom: 12 }}
            style={{
              fontFamily: "var(--font-primary), 'Source Sans Pro', sans-serif",
            }}
          >
            <CartesianGrid stroke="var(--border-main)" />
            <XAxis
              dataKey="time"
              stroke="var(--primary)"
              tick={{
                fill: "var(--primary)",
                fontFamily: "var(--font-primary), 'Source Sans Pro', sans-serif",
                fontSize: 12,
              }}
              axisLine={{ stroke: "var(--primary)" }}
            />
            <YAxis
              yAxisId="left"
              stroke="var(--primary)"
              tick={{
                fill: "var(--primary)",
                fontFamily: "var(--font-primary), 'Source Sans Pro', sans-serif",
                fontSize: 12,
              }}
              axisLine={{ stroke: "var(--primary)" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--danger)"
              tick={{
                fill: "var(--danger)",
                fontFamily: "var(--font-primary), 'Source Sans Pro', sans-serif",
                fontSize: 12,
              }}
              axisLine={{ stroke: "var(--danger)" }}
            />
            <Tooltip
              contentStyle={{
                fontFamily: "var(--font-primary), 'Source Sans Pro', sans-serif",
                borderRadius: 8,
                background: "#fff",
                border: "1px solid var(--border-main)",
                color: "var(--primary)",
              }}
              labelStyle={{
                fontFamily: "var(--font-primary), 'Source Sans Pro', sans-serif",
                color: "var(--primary)",
                fontWeight: 700,
              }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-primary), 'Source Sans Pro', sans-serif",
                fontSize: 13,
                color: "var(--primary)",
              }}
            />
            <Line
              type="monotone"
              yAxisId="left"
              dataKey="totalPurchase"
              name="Total Purchase"
              stroke="var(--primary)"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              yAxisId="right"
              dataKey="totalPurchaseAmount"
              name="Purchase Amount"
              stroke="var(--danger)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CostingReportOverview;
