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

import SalesQuantityCard from "./SalesQuantityCard";
import SalesAmountCard from "./SalesAmountCard";
import SalesProfitCard from "./SalesProfitCard";
import { AnalyticsOverviewFilter } from "@/components";

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

// dummy data for sales chart
const salesChartData = [
  { time: "2025-07-01", totalSales: 120, totalSalesAmount: 24000, totalSalesProfit: 6000 },
  { time: "2025-07-02", totalSales: 140, totalSalesAmount: 28000, totalSalesProfit: 7000 },
  { time: "2025-07-03", totalSales: 130, totalSalesAmount: 26000, totalSalesProfit: 6500 },
  { time: "2025-07-04", totalSales: 160, totalSalesAmount: 32000, totalSalesProfit: 8000 },
  { time: "2025-07-05", totalSales: 150, totalSalesAmount: 30000, totalSalesProfit: 7500 },
  { time: "2025-07-06", totalSales: 170, totalSalesAmount: 34000, totalSalesProfit: 8500 },
  { time: "2025-07-07", totalSales: 180, totalSalesAmount: 36000, totalSalesProfit: 9000 },
  { time: "2025-07-08", totalSales: 160, totalSalesAmount: 32000, totalSalesProfit: 8000 },
  { time: "2025-07-09", totalSales: 190, totalSalesAmount: 38000, totalSalesProfit: 9500 },
  { time: "2025-07-10", totalSales: 200, totalSalesAmount: 40000, totalSalesProfit: 10000 },
  { time: "2025-07-11", totalSales: 210, totalSalesAmount: 42000, totalSalesProfit: 10500 },
  { time: "2025-07-12", totalSales: 190, totalSalesAmount: 38000, totalSalesProfit: 9500 },
  { time: "2025-07-13", totalSales: 220, totalSalesAmount: 44000, totalSalesProfit: 11000 },
  { time: "2025-07-14", totalSales: 230, totalSalesAmount: 46000, totalSalesProfit: 11500 },
  { time: "2025-07-15", totalSales: 240, totalSalesAmount: 48000, totalSalesProfit: 12000 },
];

const SalesOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[2]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between bg-white p-4">
        <h1>Hi, Admin {/* {user?.fullName} */}</h1>
        <AnalyticsOverviewFilter
          options={options}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        <SalesQuantityCard
          value={totals.Sales}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
        <SalesAmountCard
          value={totals.Earnings}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
        <SalesProfitCard
          value={totals.Customers}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
      </div>

      <div className="2x:h-[400px] h-[360px] bg-white pt-[50px] pr-[16px] pb-[70px] 2xl:h-[500px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Sales Statistics
        </h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesChartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              yAxisId="left"
              dataKey="totalSales"
              name="Total Sales"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              yAxisId="right"
              dataKey="totalSalesAmount"
              name="Sales Amount"
              stroke="#10B981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              yAxisId="right"
              dataKey="totalSalesProfit"
              name="Profit"
              stroke="#F59E0B"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SalesOverview;
