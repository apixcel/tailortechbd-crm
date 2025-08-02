"use client";

import { useRef, useState, useEffect } from "react";
import DatePicker, { DateObject, DatePickerRef } from "react-multi-date-picker";

interface AnalyticsOverviewFilterProps {
  value: DateObject[] | null;
  onChange: (dates: DateObject[] | null) => void;
}

const quickOptions = [
  { label: "Last 7 Days", days: 6 },
  { label: "This Week", days: "thisWeek" },
  { label: "Last Week", days: "lastWeek" },
  { label: "This Month", days: "thisMonth" },
  { label: "Last Month", days: "lastMonth" },
  { label: "Last 14 Days", days: 13 },
  { label: "Last 30 Days", days: 29 },
  { label: "Last 90 Days", days: 89 },
  { label: "Custom", days: null },
];

const AnalyticsOverviewFilter = ({ value, onChange }: AnalyticsOverviewFilterProps) => {
  const datePickerRef = useRef<DatePickerRef | null>(null);
  const [activeLabel, setActiveLabel] = useState("Custom");

  const handleQuickSelect = (label: string, days: number | string | null) => {
    setActiveLabel(label);

    if (days === null) {
      const today = new DateObject();
      onChange([today]);
      return;
    }

    const today = new DateObject();

    if (days === "lastWeek") {
      const dayOfWeek = today.weekDay.index; // Sunday = 0, Monday = 1, ..., Saturday = 6
      const end = new DateObject(today).subtract(dayOfWeek + 1, "days"); // last week's Sunday
      const start = new DateObject(end).subtract(6, "days"); // last week's Monday
      onChange([start, end]);
      return;
    }

    if (days === "lastMonth") {
      const jsDate = new Date();
      const year = jsDate.getFullYear();
      const month = jsDate.getMonth();

      const lastDay = new Date(year, month, 0);

      const end = new DateObject(lastDay);
      const start = new DateObject(lastDay).set("day", 1);

      onChange([start, end]);
      return;
    }

    if (days === "thisWeek") {
      const today = new DateObject();
      const start = new DateObject(today).subtract(today.weekDay.index, "days");
      const end = today;
      onChange([start, end]);
      return;
    }
    if (days === "thisMonth") {
      const today = new DateObject();
      const start = new DateObject(today).set("day", 1);
      const end = today;
      onChange([start, end]);
      return;
    }

    const end = new DateObject();
    const start = new DateObject().subtract(days as number, "days");
    onChange([start, end]);
  };

  useEffect(() => {
    if (!value || value.length !== 2) {
      setActiveLabel("Custom");
      return;
    }

    const today = new DateObject();
    const [from, to] = value;

    const fromStr = from.format("YYYY-MM-DD");
    const toStr = to.format("YYYY-MM-DD");

    const lastWeekStart = new DateObject(today).subtract(today.weekDay.index + 7, "days");
    const lastWeekEnd = new DateObject(today).subtract(today.weekDay.index + 1, "days");

    const jsDate = new Date();
    const year = jsDate.getFullYear();
    const month = jsDate.getMonth();
    const lastDayOfLastMonth = new Date(year, month, 0);
    const lastMonthEnd = new DateObject(lastDayOfLastMonth);
    const lastMonthStart = new DateObject(lastDayOfLastMonth).set("day", 1);
    const thisWeekStart = new DateObject(today).subtract(today.weekDay.index, "days");
const thisMonthStart = new DateObject(today).set("day", 1);

    const presets = [
      { label: "This Week", start: thisWeekStart, end: today },
      { label: "This Month", start: thisMonthStart, end: today },
      { label: "Last 7 Days", start: new DateObject(today).subtract(6, "days"), end: today },
      { label: "Last 14 Days", start: new DateObject(today).subtract(13, "days"), end: today },
      { label: "Last 30 Days", start: new DateObject(today).subtract(29, "days"), end: today },
      { label: "Last 90 Days", start: new DateObject(today).subtract(89, "days"), end: today },
      { label: "Last Week", start: lastWeekStart, end: lastWeekEnd },
      { label: "Last Month", start: lastMonthStart, end: lastMonthEnd },
    ];

    const matched = presets.find(
      (preset) =>
        preset.start.format("YYYY-MM-DD") === fromStr && preset.end.format("YYYY-MM-DD") === toStr
    );

    if (matched) {
      setActiveLabel(matched.label);
    } else {
      setActiveLabel("Custom");
    }
  }, [value]);

  return (
    <div className="flex items-center gap-4">
      {/* Right side: calendar input */}
      <DatePicker
        ref={datePickerRef}
        value={value || undefined}
        onChange={onChange}
        range
        rangeHover
        dateSeparator=" - "
        className="date-range-calendar flex flex-row-reverse gap-4"
        inputClass="date-range-input"
        maxDate={new Date()}
        format="DD-MM-YYYY"
        calendarPosition="bottom-right"
        offsetY={0}
        offsetX={0}
      >
        {/* Left side: quick filters */}
        <div className="flex flex-col gap-2 p-4">
          {quickOptions.map(({ label, days }) => (
            <button
              key={label}
              className={`cursor-pointer rounded-md border px-3 py-1 text-sm whitespace-nowrap transition ${
                activeLabel === label
                  ? "bg-primary text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleQuickSelect(label, days)}
            >
              {label}
            </button>
          ))}
        </div>
      </DatePicker>
    </div>
  );
};

export default AnalyticsOverviewFilter;
