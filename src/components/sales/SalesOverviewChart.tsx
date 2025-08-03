"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { TbTrendingUp, TbTrendingDown } from "react-icons/tb";

type PieLabelPropsSafe = {
  x?: number;
  y?: number;
  percent?: number;
};

interface SalesOverviewChartProps {
  sales: number;
  expense: number;
  selectedFilterLabel: string;
}

const COLORS = ["#6366f1", "#38bdf8"];

const SalesOverviewChart: React.FC<SalesOverviewChartProps> = ({
  sales,
  expense,
  selectedFilterLabel,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const profit = sales - expense;

  const data = [
    { name: "Sales", value: sales },
    { name: "Expense", value: expense },
  ];

  const handleMouseEnter = (_: unknown, index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const centerLabel = () => {
    if (hoveredIndex === 0) {
      return (
        <>
          <p className="text-sm text-gray-500">Sales</p>
          <p className="text-xl font-bold text-indigo-500">৳{sales.toLocaleString()}</p>
        </>
      );
    }
    if (hoveredIndex === 1) {
      return (
        <>
          <p className="text-sm text-gray-500">Expense</p>
          <p className="text-xl font-bold text-sky-500">৳{expense.toLocaleString()}</p>
        </>
      );
    }

    const isLoss = profit < 0;
    const amount = Math.abs(profit);

    return (
      <>
        <p
          className={`flex items-center justify-center gap-1 text-sm ${
            isLoss ? "text-red-500" : "text-success"
          }`}
        >
          {isLoss ? (
            <TbTrendingDown className="size-[20px]" />
          ) : (
            <TbTrendingUp className="size-[20px]" />
          )}
          {isLoss ? "Loss" : "Profit"}
        </p>
        <p className={`text-xl font-bold ${isLoss ? "text-red-600" : "text-gray-800"}`}>
          ৳{amount.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">Sales: ৳{sales.toLocaleString()}</p>
        <p className="text-xs text-gray-400">Expense: ৳{expense.toLocaleString()}</p>
      </>
    );
  };

  // Safe label renderer (avoids type errors)
  const renderLabel = (props: PieLabelPropsSafe) => {
    const percent = props?.percent;
    if (typeof percent !== "number") return null;

    return (
      <text
        x={props?.x}
        y={props?.y}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#374151"
        fontSize={12}
      >
        {(percent * 100).toFixed(1)}%
      </text>
    );
  };

  return (
    <div className="w-[350px] bg-white p-4">
      <h2 className="mb-1 text-center text-lg font-semibold text-primary">Sales Overview</h2>
      <p className="mb-4 text-center text-[14px] font-semibold text-info capitalize">
        {selectedFilterLabel}
      </p>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={renderLabel}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cursor="pointer" />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform text-center leading-tight">
          {centerLabel()}
        </div>
      </div>
    </div>
  );
};

export default SalesOverviewChart;
