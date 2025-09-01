"use client";

import { useGetCapitalTimelineQuery } from "@/redux/features/statistics/statistics.api";
import { DateObject } from "react-multi-date-picker";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartDataNotFound from "../ui/ChartDataNotFound";
import ChartSkeleton from "../ui/ChartSkeleton";

const CapitalFlowChart = ({
  selectedFilter,
  selectedRange,
}: {
  selectedFilter: string;
  selectedRange: DateObject[] | undefined;
}) => {
  const { data, isLoading } = useGetCapitalTimelineQuery({
    startDate: selectedRange?.[0]?.format("YYYY-MM-DD"),
    endDate: selectedRange?.[1]?.format("YYYY-MM-DD"),
  });
  const colors = {
    grid: "#e5e7eb",
    credit: "#22c55e", // green
    debit: "#ef4444", // red
    balance: "#00adef", // line
  };
  return (
    <>
      {isLoading ? (
        <ChartSkeleton />
      ) : data?.data?.length ? (
        <div className="bg-white p-6">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-[1.15rem] font-bold tracking-tight text-[var(--primary,#101949)]">
              Capital Flow Overview
            </h2>
            <p className="text-[14px] font-semibold text-info capitalize">{selectedFilter}</p>
          </div>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <ComposedChart
                data={data?.data || []}
                margin={{ top: 20, right: 40, left: 0, bottom: 24 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
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
                  cursor={{ fill: "#e9ecef", opacity: 0.5 }}
                  formatter={(value) => "৳ " + value}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: 18 }}
                  formatter={(value) =>
                    value === "credit"
                      ? "Credit"
                      : value === "debit"
                        ? "Debit"
                        : value === "balance"
                          ? "Main Balance"
                          : value
                  }
                />

                {/* Up bar: credit */}
                <Bar
                  dataKey="credit"
                  name="Credit"
                  barSize={38}
                  radius={[8, 8, 0, 0]}
                  fill={colors.credit}
                />

                {/* Down bar: debit (negative values render below 0) */}
                <Bar
                  dataKey="debit"
                  name="Debit"
                  barSize={38}
                  radius={[8, 8, 0, 0]}
                  fill={colors.debit}
                />

                {/* Line: end-of-day balance */}
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke={colors.balance}
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#fff", stroke: colors.balance, strokeWidth: 2 }}
                  activeDot={{
                    r: 7,
                    fill: "var(--primary,#101949)",
                    stroke: "#fff",
                    strokeWidth: 3,
                  }}
                  name="Main Balance"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <ChartDataNotFound title="No Capital Flow to display" />
      )}
    </>
  );
};

export default CapitalFlowChart;
