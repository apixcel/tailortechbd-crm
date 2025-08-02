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
];

// ✅ Aggregate by date and keep all investments for that day
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

// ✅ Custom Tooltip Component
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="rounded-md border bg-white p-3 text-sm shadow-md">
        <p className="mb-1 font-semibold text-black">Date: {label}</p>
        <p className="mb-2 text-black">
          Total Investment: <span className="font-medium">৳{data.totalInvestment}</span>
        </p>
        <div className="space-y-1">
          {data.investments.map((inv: any, idx: number) => (
            <div key={idx} className="text-gray-700">
              <span className="font-medium text-gray-900">{inv.partnerId}</span>:
              <span className="ml-1">৳{inv.amount}</span>
              <span className="ml-2 text-xs text-gray-500 italic">({inv.remark})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// ✅ Final Component
export default function OverallInvestmentStatistics() {
  const chartData = aggregateInvestmentsByDate(combinedMockInvestmentData);

  return (
    <div className="h-[360px] bg-white pt-[50px] pr-[16px] pb-[70px] 2xl:h-[500px]">
      <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
        Overall Investment Statistics
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="investmentDate" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="totalInvestment" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
