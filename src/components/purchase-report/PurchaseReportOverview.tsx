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

import PurchaseQuantityCard from "./PurchaseQuantityCard";
import PurchaseAmountCard from "./PurchaseAmountCard";
import { DateObject } from "react-multi-date-picker";

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

interface PurchaseReportOverviewProps {
  selectedRange: DateObject[] | undefined;
}

const PurchaseReportOverview = ({ selectedRange }: PurchaseReportOverviewProps) => {
  const [selectedFilter, setSelectedFilter] = useState(options[2]);

  // Filter sales data by selected date range
  const filteredData = purchaseChartData.filter((item) => {
    if (!selectedRange || selectedRange.length !== 2) return true;

    const from = selectedRange[0].toDate();
    const to = selectedRange[1].toDate();
    const itemDate = new Date(item.time);

    return itemDate >= from && itemDate <= to;
  });

  // Calculate totals
  const totals = {
    quantity: filteredData.reduce((acc, item) => acc + item.totalPurchase, 0),
    amount: filteredData.reduce((acc, item) => acc + item.totalPurchaseAmount, 0),
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
        <PurchaseQuantityCard
          value={totals.quantity}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
        <PurchaseAmountCard
          value={totals.amount}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
      </div>

      <div className="2x:h-[400px] h-[360px] bg-white pt-[50px] pr-4 pb-[70px] 2xl:h-[500px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Purchase Statistics
        </h1>
        <div className="h-[360px] px-4 pb-8 md:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={purchaseChartData}
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
                stroke="var(--success)"
                tick={{
                  fill: "var(--success)",
                  fontFamily: "var(--font-primary), 'Source Sans Pro', sans-serif",
                  fontSize: 12,
                }}
                axisLine={{ stroke: "var(--success)" }}
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
                stroke="var(--success)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default PurchaseReportOverview;
