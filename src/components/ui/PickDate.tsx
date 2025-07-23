"use client";

import { FieldProps } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PickDate = ({ field, form, ...props }: FieldProps) => {
  // Convert stored ISO string to Date object for display
  const selectedDate = field.value ? new Date(field.value) : null;

  const handleChange = (date: Date | null) => {
    if (date) {
      form.setFieldValue(field.name, date.toISOString());
    }
  };

  return (
    <DatePicker
      {...props}
      selected={selectedDate}
      onChange={handleChange}
      maxDate={new Date()}
      showTimeSelect={false}
      dateFormat="yyyy-MM-dd"
      className="w-full cursor-pointer appearance-none border-[1px] border-border-main bg-white bg-clip-padding px-[12px] py-[6px] text-base text-[12px] font-normal text-strong outline-none"
      placeholderText="Select date"
    />
  );
};

export default PickDate;
