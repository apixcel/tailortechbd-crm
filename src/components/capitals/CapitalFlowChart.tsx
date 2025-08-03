"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Line,
  Legend,
} from "recharts";
import { mockCapitalsData } from "@/constants/capitalsData";

const formattedData = mockCapitalsData.map((item) => ({
  date: item.capitalsDate.slice(5), // MM-DD
  amount: item.capitalsType.toLowerCase().includes("debit")
    ? -item.capitalsAmount
    : item.capitalsAmount,
  type: item.capitalsType,
  balance: item.capitalsBalance,
}));

const colors = {
  debit: "var(--secondary, #e93a3c)",
  credit: "var(--primary, #101949)",
  balance: "var(--success, #23c57a)",
  background: "var(--color-background, #f2f2f2)",
  grid: "var(--color-tertiary, #e9e9e9)",
};

const getBarColor = (type: string) =>
  type.toLowerCase().includes("debit") ? colors.debit : colors.credit;

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  payload: {
    type?: string;
    [key: string]: unknown;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;
  const change = payload.find((p) => p.dataKey === "amount");
  const balance = payload.find((p) => p.dataKey === "balance");
  const isDebit = change?.payload?.type?.toLowerCase().includes("debit");
  const labelType = isDebit ? "Debit" : "Credit";

  return (
    <div className="min-w-[150px] rounded-xl bg-[var(--primary,#101949)]/95 p-4 text-sm text-white shadow-lg">
      <p className="mb-1 font-semibold tracking-wide">Date: {label}</p>
      {change && (
        <p>
          <span className="font-medium">{labelType}:</span>{" "}
          <span className={isDebit ? "text-red-400" : "text-green-400"}>
            ৳{Math.abs(change.value).toLocaleString()}
          </span>
        </p>
      )}
      {balance && (
        <p className="pt-1">
          <span className="font-medium">Main Balance:</span>{" "}
          <span className="text-blue-300">৳{balance.value.toLocaleString()}</span>
        </p>
      )}
    </div>
  );
};

const CapitalFlowChart = () => {
  return (
    <div className="bg-white p-6">
      <h2 className="mb-6 text-[1.15rem] font-bold tracking-tight text-[var(--primary,#101949)]">
        Capital Flow Overview
      </h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={formattedData}
            margin={{ top: 20, right: 40, left: 0, bottom: 24 }}
            barSize={38}
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#e9ecef", opacity: 0.5 }} />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: 18 }}
              formatter={(value) =>
                value === "amount" ? "Capital Change" : value === "balance" ? "Main Balance" : value
              }
            />
            <Bar
              dataKey="amount"
              name="Capital Change"
              radius={[8, 8, 0, 0]}
              // Add animation & subtle hover effect
              isAnimationActive
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.type)}
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="balance"
              stroke={colors.balance}
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#fff",
                stroke: colors.balance,
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "var(--primary,#101949)",
                stroke: "#fff",
                strokeWidth: 3,
              }}
              name="Main Balance"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CapitalFlowChart;
