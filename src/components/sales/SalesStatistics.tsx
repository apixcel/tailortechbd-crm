"use client";

import { useGetSalesTimelineQuery } from "@/redux/features/statistics/statistics.api";
import { DateObject } from "react-multi-date-picker";
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
import ChartDataNotFound from "../ui/ChartDataNotFound";
import ChartSkeleton from "../ui/ChartSkeleton";

export default function SalesStatistics({
  selectedFilter,
  selectedRange,
}: {
  selectedFilter: string;
  selectedRange: DateObject[] | undefined;
}) {
  const { data, isLoading } = useGetSalesTimelineQuery({
    startDate: selectedRange?.[0]?.format("YYYY-MM-DD"),
    endDate: selectedRange?.[1]?.format("YYYY-MM-DD"),
  });

  const chartData = data?.data || [];
  return (
    <>
      {isLoading ? (
        <ChartSkeleton />
      ) : chartData.length ? (
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-[1.15rem] font-bold tracking-tight text-[var(--primary,#101949)]">
              Daily Sales Overview
            </h2>
            <p className="text-[14px] font-semibold text-info capitalize">{selectedFilter}</p>
          </div>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 20, right: 40, left: 0, bottom: 24 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--primary,#101949)", fontWeight: 600, fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: "var(--muted,#6f6f6f)", fontSize: 14 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => "৳" + v}
                />

                <Tooltip
                  formatter={(value, key) =>
                    key === "amount" ? ["৳" + value, "Sales Amount"] : [value, "Orders"]
                  }
                  labelFormatter={(label) => `Date: ${label}`}
                  cursor={{ stroke: "#101949", strokeDasharray: "3 3" }}
                />

                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: 18 }}
                  formatter={(value) =>
                    value === "amount" ? "Sales Amount" : value === "orders" ? "Orders" : value
                  }
                />

                {/* Sales Line */}
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#fff", stroke: "#2563eb", strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
                  name="Sales Amount"
                />

                {/* Orders Line */}
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#fff", stroke: "#10b981", strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <ChartDataNotFound title="No Sales Data To Display" />
      )}
    </>
  );
}
