/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock withdrawal data
const mockProfitWithdrawals = [
  { partnerId: "p1", amount: 3000, date: "2025-07-23", remark: "monthly profit" },
  { partnerId: "p2", amount: 2500, date: "2025-07-23", remark: "partial withdrawal" },
  { partnerId: "p3", amount: 1500, date: "2025-07-22", remark: "bonus cut" },
  { partnerId: "p1", amount: 2000, date: "2025-07-20", remark: "equipment share" },
  { partnerId: "p2", amount: 1000, date: "2025-07-18", remark: "delivery share" },
  { partnerId: "p3", amount: 500, date: "2025-07-17", remark: "marketing share" },
  { partnerId: "p4", amount: 4000, date: "2025-07-16", remark: "advertisement share" },
  { partnerId: "p4", amount: 3500, date: "2025-07-15", remark: "sponsorship share" },
  { partnerId: "p1", amount: 4500, date: "2025-07-14", remark: "profit share" },
  { partnerId: "p2", amount: 3000, date: "2025-07-13", remark: "monthly profit" },
  { partnerId: "p3", amount: 2000, date: "2025-07-12", remark: "partial withdrawal" },
  { partnerId: "p4", amount: 2500, date: "2025-07-11", remark: "bonus cut" },
  { partnerId: "p1", amount: 1500, date: "2025-07-10", remark: "equipment share" },
  { partnerId: "p2", amount: 1000, date: "2025-07-09", remark: "delivery share" },
  { partnerId: "p3", amount: 500, date: "2025-07-08", remark: "marketing share" },
];

// Group by date
const aggregateWithdrawalsByDate = (data: typeof mockProfitWithdrawals) => {
  const grouped: Record<
    string,
    {
      totalWithdrawn: number;
      withdrawals: { partnerId: string; amount: number; remark: string }[];
    }
  > = {};

  data.forEach((entry) => {
    const date = entry.date;
    if (!grouped[date]) {
      grouped[date] = {
        totalWithdrawn: 0,
        withdrawals: [],
      };
    }
    grouped[date].totalWithdrawn += entry.amount;
    grouped[date].withdrawals.push({
      partnerId: entry.partnerId,
      amount: entry.amount,
      remark: entry.remark,
    });
  });

  return Object.entries(grouped)
    .map(([date, info]) => ({
      date,
      totalWithdrawn: info.totalWithdrawn,
      withdrawals: info.withdrawals,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Tooltip with BDT currency and dashboard theme
interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: {
      date: string;
      totalWithdrawn: number;
      withdrawals: { partnerId: string; amount: number; remark: string }[];
    };
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="min-w-[210px] rounded-xl bg-[var(--primary,#101949)]/95 p-3 text-sm shadow-lg">
        <p className="mb-1 font-semibold text-white">Date: {label}</p>
        <p className="mb-2 text-white">
          <span className="font-medium">Total Withdrawn:</span>{" "}
          <span className="font-semibold text-[var(--secondary,#e93a3c)]">
            ৳{data.totalWithdrawn.toLocaleString()}
          </span>
        </p>
        <div className="space-y-1">
          {data.withdrawals.map((w, idx) => (
            <div key={idx} className="text-white">
              <span className="font-semibold text-white">{w.partnerId}</span>:{" "}
              <span>৳{w.amount.toLocaleString()}</span>
              <span className="ml-2 text-xs text-gray-200 italic">({w.remark})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function OverallProfitWithdrawalsStatistics() {
  const chartData = aggregateWithdrawalsByDate(mockProfitWithdrawals);

  // Use your theme color or set another (e.g., "var(--danger,#dc3545)")
  const barColor = "var(--secondary,#e93a3c)";

  return (
    <div className="h-[420px] bg-white px-8 pt-8 pb-6 2xl:h-[500px]">
      <h1 className="mb-6 text-[1.15rem] font-bold tracking-tight text-[var(--primary,#101949)]">
        Overall Profit Withdrawal Statistics
      </h1>
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
            tick={{ fill: "var(--secondary,#e93a3c)", fontWeight: 600, fontSize: 14 }}
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
          <Bar
            dataKey="totalWithdrawn"
            fill={barColor}
            radius={[8, 8, 0, 0]}
            isAnimationActive
            name="Total Withdrawn"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
