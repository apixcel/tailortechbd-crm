"use client";

import { useGetPurchaseStatisticsQuery } from "@/redux/features/purchase/purchase.api";
import { useMemo } from "react";
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
import PurchaseAmountCard from "./PurchaseAmountCard";
import PurchaseQuantityCard from "./PurchaseQuantityCard";

interface PurchaseReportOverviewProps {
  selectedRange: DateObject[] | null | undefined;
}

// Helper to create correct query params, never including undefined
function getParamsFromSelectedRange(
  selectedRange?: DateObject[] | null
): Record<string, string | number> {
  if (selectedRange && selectedRange.length === 2) {
    return {
      startDate: selectedRange[0].format("YYYY-MM-DD"),
      endDate: selectedRange[1].format("YYYY-MM-DD"),
    };
  }
  return {};
}

const PurchaseReportOverview = ({ selectedRange }: PurchaseReportOverviewProps) => {
  // Memoize params so the API isn't called needlessly
  const params = useMemo(() => getParamsFromSelectedRange(selectedRange), [selectedRange]);

  // Fetch data
  const { data, isLoading, error } = useGetPurchaseStatisticsQuery(params);

  // Get start and end dates as strings (for display, logging, etc.)
  let startDate: string | undefined = undefined;
  let endDate: string | undefined = undefined;
  if (selectedRange && selectedRange.length === 2) {
    startDate = selectedRange[0].format("YYYY-MM-DD");
    endDate = selectedRange[1].format("YYYY-MM-DD");
  }

  const chartData =
    data?.data?.chartData?.map((item) => ({
      time: item.time,
      totalPurchase: item["Total Purchase"],
      totalPurchaseAmount: item["Purchase Amount"],
    })) || [];

  const totalPurchaseQuantity = data?.data?.totalPurchaseQuantity ?? 0;
  const totalPurchaseAmount = data?.data?.totalPurchaseAmount ?? 0;

  const getSelectedFilterLabel = () => {
    if ("startDate" in params && "endDate" in params && params.startDate && params.endDate) {
      return `${params.startDate} to ${params.endDate}`;
    }
    return "Custom";
  };

  if (isLoading)
    return <div className="flex min-h-[300px] items-center justify-center">Loading...</div>;
  if (error)
    return (
      <div className="text-error flex min-h-[300px] items-center justify-center">
        Failed to load data.
      </div>
    );

  return (
    <section>
      {/* Optional: Displaying extracted startDate and endDate */}
      {/* <div>
        <span>Start Date: {startDate || "N/A"}</span>
        <span>End Date: {endDate || "N/A"}</span>
      </div> */}

      {/* Cards */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <PurchaseQuantityCard
          value={totalPurchaseQuantity}
          selectedFilter={getSelectedFilterLabel()}
          increase={0}
        />
        <PurchaseAmountCard
          value={totalPurchaseAmount}
          selectedFilter={getSelectedFilterLabel()}
          increase={0}
        />
      </div>

      {/* Chart */}
      <div className="h-full bg-white pt-[50px] pr-4 pb-[20px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Purchase Statistics
        </h1>
        <div className="h-[360px] px-4 pb-8 md:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
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
