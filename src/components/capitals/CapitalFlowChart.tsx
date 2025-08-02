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

const getColor = (type: string) => (type.toLowerCase().includes("debit") ? "#f87171" : "#4ade80");

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
    <div className="rounded bg-gray-900 p-2 text-sm text-white shadow-md">
      <p className="mb-1">Date: 07/{label}</p>
      {change && (
        <p>
          {labelType}: {Math.abs(change.value)}
        </p>
      )}
      {balance && <p>Main Balance: {balance.value}</p>}
    </div>
  );
};

const CapitalFlowChart = () => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Capital Flow Overview</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={formattedData} margin={{ top: 10, right: 40, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="amount" name="Capital Change">
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.type)} />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Main Balance"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CapitalFlowChart;
