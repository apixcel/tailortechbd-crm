"use client";
import { useGetCostingStatisticsByCategoryQuery } from "@/redux/features/statistics/statistics.api";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function CostingCategoryPie() {
  const { data } = useGetCostingStatisticsByCategoryQuery({});

  const allData = data?.data || [];

  const chartData = [...allData].sort((a, b) => b.value - a.value).slice(0, 3);

  // Optional: pick a small palette or generate dynamically
  const palette = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b", "#06b6d4", "#a855f7", "#84cc16"];

  return (
    <div className="w-full shrink-0 bg-white p-6 xl:w-[400px]">
      <h2 className="mb-6 text-[1.15rem] font-bold tracking-tight text-[var(--primary,#101949)]">
        Top 3 Costing Categories
      </h2>

      <div
        style={{ width: "100%", height: 300 }}
        className="mx-auto flex items-center justify-center"
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90} // smaller circle (default was 120)
              innerRadius={40} // optional: make it a donut
              // label={(entry) => `${entry.name} (${Math.round(entry.percent || 0)}%)`}
              isAnimationActive
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={palette[i % palette.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v, n: string, item) => [
                "৳" + v,
                `${item?.payload?.name} (${(item?.payload?.percent ?? 0).toFixed(1)}%)`,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CostingCategoryPie;
