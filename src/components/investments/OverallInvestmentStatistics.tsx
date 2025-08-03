/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const combinedMockInvestmentData = [
  {
    partnerId: "p1",
    investmentAmount: 12000,
    investmentDate: "2025-07-23",
    investmentRemark: "advertisement budget",
  },
  {
    partnerId: "p1",
    investmentAmount: 5000,
    investmentDate: "2025-07-20",
    investmentRemark: "social media campaign",
  },
  {
    partnerId: "p2",
    investmentAmount: 3000,
    investmentDate: "2025-07-23",
    investmentRemark: "banner design",
  },
  {
    partnerId: "p2",
    investmentAmount: 4500,
    investmentDate: "2025-07-19",
    investmentRemark: "shooting gear rental",
  },
  {
    partnerId: "p3",
    investmentAmount: 2000,
    investmentDate: "2025-07-20",
    investmentRemark: "content writing",
  },
  {
    partnerId: "p3",
    investmentAmount: 7000,
    investmentDate: "2025-07-18",
    investmentRemark: "video editing team",
  },
  {
    partnerId: "p4",
    investmentAmount: 8000,
    investmentDate: "2025-07-22",
    investmentRemark: "photography equipment",
  },
  {
    partnerId: "p4",
    investmentAmount: 6000,
    investmentDate: "2025-07-21",
    investmentRemark: "studio rental",
  },
  {
    partnerId: "p5",
    investmentAmount: 4000,
    investmentDate: "2025-07-23",
    investmentRemark: "post-production",
  },
  {
    partnerId: "p5",
    investmentAmount: 3000,
    investmentDate: "2025-07-19",
    investmentRemark: "marketing materials",
  },
  {
    partnerId: "p6",
    investmentAmount: 2000,
    investmentDate: "2025-07-20",
    investmentRemark: "social media ads",
  },
  {
    partnerId: "p6",
    investmentAmount: 5000,
    investmentDate: "2025-07-18",
    investmentRemark: "SEO optimization",
  },
  {
    partnerId: "p7",
    investmentAmount: 6000,
    investmentDate: "2025-07-17",
    investmentRemark: "content marketing",
  },
  {
    partnerId: "p8",
    investmentAmount: 7000,
    investmentDate: "2025-07-16",
    investmentRemark: "email marketing",
  },
];

// Aggregation function (unchanged)
const aggregateInvestmentsByDate = (data: typeof combinedMockInvestmentData) => {
  const grouped: Record<
    string,
    {
      totalInvestment: number;
      investments: { partnerId: string; amount: number; remark: string }[];
    }
  > = {};

  data.forEach((entry) => {
    const date = entry.investmentDate;
    if (!grouped[date]) {
      grouped[date] = {
        totalInvestment: 0,
        investments: [],
      };
    }
    grouped[date].totalInvestment += entry.investmentAmount;
    grouped[date].investments.push({
      partnerId: entry.partnerId,
      amount: entry.investmentAmount,
      remark: entry.investmentRemark,
    });
  });

  return Object.entries(grouped)
    .map(([date, info]) => ({
      investmentDate: date,
      totalInvestment: info.totalInvestment,
      investments: info.investments,
    }))
    .sort((a, b) => new Date(a.investmentDate).getTime() - new Date(b.investmentDate).getTime());
};

// Custom Tooltip (same as before, just for clarity)
interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: {
      investmentDate: string;
      totalInvestment: number;
      investments: { partnerId: string; amount: number; remark: string }[];
    };
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="min-w-[210px] rounded-xl border bg-[var(--primary,#101949)]/95 p-3 text-sm shadow-lg">
        <p className="mb-1 font-semibold text-white">Date: {label}</p>
        <p className="mb-2 text-white">
          <span className="font-medium">Total:</span>{" "}
          <span className="font-semibold text-[var(--success,#23c57a)]">
            ৳{data.totalInvestment.toLocaleString()}
          </span>
        </p>
        <div className="space-y-1">
          {data.investments.map((inv, idx) => (
            <div key={idx} className="text-white">
              <span className="font-semibold">{inv.partnerId}</span>:{" "}
              <span>৳{inv.amount.toLocaleString()}</span>
              <span className="ml-2 text-xs text-gray-200 italic">({inv.remark})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function OverallInvestmentStatistics() {
  const chartData = aggregateInvestmentsByDate(combinedMockInvestmentData);

  // Pick your preferred color (CSS variable recommended)
  const barColor = "var(--primary, #101949)";

  return (
    <div className="h-[420px] bg-white px-8 pt-8 pb-6 2xl:h-[500px]">
      <h1 className="mb-6 text-[1.15rem] font-bold tracking-tight text-[var(--primary,#101949)]">
        Overall Investment Statistics
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
            dataKey="investmentDate"
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
          <Bar
            dataKey="totalInvestment"
            fill={barColor}
            radius={[8, 8, 0, 0]}
            isAnimationActive
            name="Total Investment"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
