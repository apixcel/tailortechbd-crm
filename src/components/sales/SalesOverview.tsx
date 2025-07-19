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

import SalesOverviewFilter from "./SalesOverviewFilter";
import SalesQuantityCard from "./SalesQuantityCard";
import SalesAmountCard from "./SalesAmountCard";
import SalesProfitCard from "./SalesProfitCard";

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

const SalesOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[2]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between bg-white p-4">
        <h1>Hi, Admin {/* {user?.fullName} */}</h1>
        <SalesOverviewFilter
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
          <LineChart
            data={[
              {
                time: "2025-01-01",
                TotalSales: 100,
                TotalSalesAmount: 100,
                TotalSalesProfit: 100,
              },
              {
                time: "2025-01-02",
                TotalSales: 200,
                TotalSalesAmount: 200,
                TotalSalesProfit: 200,
              },
              {
                time: "2025-01-03",
                TotalSales: 300,
                TotalSalesAmount: 300,
                TotalSalesProfit: 300,
              },
            ]}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Total Sales"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line type="monotone" dataKey="Total Sales Amount" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="Total Sales Profit" stroke="#F59E0B" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SalesOverview;
