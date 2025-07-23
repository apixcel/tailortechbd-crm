"use client";

import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRange {
  startDate: string; // ISO string
  endDate: string; // ISO string
}

const DateRangePicker = ({ field, form }: FieldProps) => {
  const value: DateRange = field.value || { startDate: "", endDate: "" };

  const [startDate, setStartDate] = useState<Date | null>(
    value.startDate ? new Date(value.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    value.endDate ? new Date(value.endDate) : null
  );

  useEffect(() => {
    form.setFieldValue(field.name, {
      startDate: startDate?.toISOString() || "",
      endDate: endDate?.toISOString() || "",
    });
  }, [startDate, endDate]);

  return (
    <div className="flex w-full gap-2">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy-MM-dd"
        placeholderText="Start Date"
        className="w-full cursor-pointer appearance-none border border-border-main bg-white px-[12px] py-[6px] text-sm text-strong outline-none"
        maxDate={new Date()}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        dateFormat="yyyy-MM-dd"
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || undefined}
        placeholderText="End Date"
        className="w-full cursor-pointer appearance-none border border-border-main bg-white px-[12px] py-[6px] text-sm text-strong outline-none"
        maxDate={new Date()}
      />
    </div>
  );
};

export default DateRangePicker;
