// components/AnalyticsAdvancedFilter.tsx
"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FilterState {
  type: "overall" | "today" | "this-month" | "this-year" | "custom";
  dateRange?: { startDate: Date; endDate: Date };
  metrics: {
    totalSales?: { min?: number; max?: number };
    totalSalesAmount?: { min?: number; max?: number };
    totalSalesProfit?: { min?: number; max?: number };
    // Add relevant fields for purchase and costing too
  };
}

interface Props {
  filter: FilterState;
  onChange: (newFilter: FilterState) => void;
}

export default function AnalyticsAdvancedFilter({ filter, onChange }: Props) {
  const [localFilter, setLocalFilter] = useState(filter);

  const updateMetric = (field: string, key: "min" | "max", value: string) => {
    setLocalFilter((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [field]: {
          ...prev.metrics?.[field],
          [key]: value ? parseFloat(value) : undefined,
        },
      },
    }));
  };

  return (
    <div className="grid gap-4 rounded border bg-white p-4">
      <div className="flex items-center gap-2">
        <label>Date Range:</label>
        <DatePicker
          selected={localFilter.dateRange?.startDate}
          onChange={(date) => {
            setLocalFilter({
              ...localFilter,
              type: "custom",
              dateRange: {
                ...localFilter.dateRange,
                startDate: date as Date,
                endDate: localFilter.dateRange?.endDate,
              },
            });
          }}
          selectsStart
          placeholderText="Start Date"
        />
        <DatePicker
          selected={localFilter.dateRange?.endDate}
          onChange={(date) => {
            setLocalFilter({
              ...localFilter,
              type: "custom",
              dateRange: {
                ...localFilter.dateRange,
                startDate: localFilter.dateRange?.startDate,
                endDate: date as Date,
              },
            });
          }}
          selectsEnd
          placeholderText="End Date"
        />
      </div>

      {/* Example metric filter for Sales */}
      <div className="flex flex-col gap-2">
        <label>Total Sales Range</label>
        <div className="flex gap-2">
          <input
            placeholder="Min"
            type="number"
            onChange={(e) => updateMetric("totalSales", "min", e.target.value)}
            className="rounded border px-2 py-1"
          />
          <input
            placeholder="Max"
            type="number"
            onChange={(e) => updateMetric("totalSales", "max", e.target.value)}
            className="rounded border px-2 py-1"
          />
        </div>
      </div>

      {/* Add other metrics as needed */}

      <button
        onClick={() => onChange(localFilter)}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Apply Filters
      </button>
    </div>
  );
}
