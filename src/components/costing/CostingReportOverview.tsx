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

import { useGetCostingReportQuery } from "@/redux/features/costing/costing.api";
import { DateObject } from "react-multi-date-picker";
import CostingAmountCard from "./CostingAmountCard";
import CostingQuantityCard from "./CostingQuantityCard";

const increase = 10;

interface CostingReportOverviewProps {
  selectedRange: DateObject[] | undefined;
}

const CostingReportOverview = ({ selectedRange = [] }: CostingReportOverviewProps) => {
  const { data } = useGetCostingReportQuery({
    startDate: selectedRange[0]?.format("YYYY-MM-DD"),
    endDate: selectedRange[1]?.format("YYYY-MM-DD"),
  });

  // Calculate totals
  const totals = {
    quantity: data?.data?.totalCostingQuantity || 0,
    amount: data?.data?.totalCostingAmount || 0,
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

      <div className="min-h-[360px] bg-white pt-[50px] pr-4 pb-[70px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Costing Statistics
        </h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data?.data?.chartData || []}
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
              dataKey="totalCosting"
              name="Total Costing"
              stroke="var(--primary)"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              yAxisId="right"
              dataKey="totalCostingAmount"
              name="Cost Amount"
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
