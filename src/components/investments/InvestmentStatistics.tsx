"use client";

import { useGetInvestmentTimelineQuery } from "@/redux/features/statistics/statistics.api";
import { DateObject } from "react-multi-date-picker";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartDataNotFound from "../ui/ChartDataNotFound";
import ChartSkeleton from "../ui/ChartSkeleton";

interface TooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number; payload?: { amount?: number } }>;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  const amount =
    (typeof payload?.[0]?.value === "number" ? payload?.[0]?.value : undefined) ??
    payload?.[0]?.payload?.amount;
  return (
    <>
      {active ? (
        <div className="min-w-[210px] rounded-xl border bg-[var(--primary,#101949)]/95 p-3 text-sm shadow-lg">
          <p className="mb-1 font-semibold text-white">Date: {label}</p>
          <p className="mb-2 text-white">
            <span className="font-medium">Total:</span>{" "}
            <span className="font-semibold text-[var(--success,#23c57a)]">৳{amount}</span>
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default function InvestmentStatistics({
  selectedFilter,
  selectedRange,
}: {
  selectedFilter: string;
  selectedRange: DateObject[] | undefined;
}) {
  const { data, isLoading } = useGetInvestmentTimelineQuery({
    startDate: selectedRange?.[0]?.format("YYYY-MM-DD"),
    endDate: selectedRange?.[1]?.format("YYYY-MM-DD"),
  });

  const chartData = data?.data || [];

  // Pick your preferred color (CSS variable recommended)
  const barColor = "var(--primary, #101949)";

  return (
    <>
      {isLoading ? (
        <ChartSkeleton />
      ) : chartData.length ? (
        <div className="h-[420px] bg-white px-8 pt-8 pb-6 2xl:h-[500px]">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-[1.15rem] font-bold tracking-tight text-[var(--primary,#101949)]">
              Overall Investment Statistics
            </h1>
            <p className="text-[14px] font-semibold text-info capitalize">{selectedFilter}</p>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              data={chartData}
              margin={{ top: 16, right: 24, left: 0, bottom: 24 }}
              barSize={38}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--color-tertiary,#e9e9e9)"
              />
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
                content={(props) => <CustomTooltip {...props} />}
                cursor={{ fill: "#e9ecef", opacity: 0.5 }}
              />
              <Bar
                dataKey="amount"
                fill={barColor}
                radius={[8, 8, 0, 0]}
                isAnimationActive
                name="Total Investment"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <ChartDataNotFound title="No Investment data to display" />
      )}
    </>
  );
}
