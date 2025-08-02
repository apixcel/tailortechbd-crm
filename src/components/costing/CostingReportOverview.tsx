"use client";

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

interface CostingReportOverviewProps {
  selectedRange: DateObject[] | undefined;
}

const CostingReportOverview = ({ selectedRange }: CostingReportOverviewProps) => {
  const increase = 10;

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
          selectedFilter={selectedFilterLabel}
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

export default CostingReportOverview;
