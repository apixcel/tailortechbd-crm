"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// ✅ Mock withdrawal data
const mockProfitWithdrawals = [
  { partnerId: "p1", amount: 3000, date: "2025-07-23", remark: "monthly profit" },
  { partnerId: "p2", amount: 2500, date: "2025-07-23", remark: "partial withdrawal" },
  { partnerId: "p3", amount: 1500, date: "2025-07-22", remark: "bonus cut" },
  { partnerId: "p1", amount: 2000, date: "2025-07-20", remark: "equipment share" },
  { partnerId: "p2", amount: 1000, date: "2025-07-18", remark: "delivery share" },
];

// ✅ Group withdrawals by date
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

// ✅ Tooltip showing partner info per withdrawal date
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
          Total Withdrawn: <span className="font-medium">${data.totalWithdrawn}</span>
        </p>
        <div className="space-y-1">
          {data.withdrawals.map((w: any, idx: number) => (
            <div key={idx} className="text-gray-700">
              <span className="font-medium text-gray-900">{w.partnerId}</span>:
              <span className="ml-1">${w.amount}</span>
              <span className="ml-2 text-xs text-gray-500 italic">({w.remark})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// ✅ Final Withdrawal Chart Component
export default function OverallProfitWithdrawalsStatistics() {
  const chartData = aggregateWithdrawalsByDate(mockProfitWithdrawals);

  return (
    <div className="h-[360px] bg-white pt-[50px] pr-[16px] pb-[70px] 2xl:h-[500px]">
      <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
        Overall Profit Withdrawal Statistics
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="totalWithdrawn" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
