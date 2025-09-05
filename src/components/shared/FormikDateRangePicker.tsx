import { FieldProps } from "formik";
import DatePicker, { DateObject } from "react-multi-date-picker";
import React from "react";

const FormikDateRangePicker: React.FC<FieldProps> = ({ field, form }) => {
  const { startDate, endDate } = field.value || {};

  const value = [];

  if (startDate) {
    value.push(new DateObject(startDate));
  }

  if (endDate) {
    value.push(new DateObject(endDate));
  }

  const handleChange = (dates: DateObject[] | DateObject | null) => {
    if (Array.isArray(dates)) {
      form.setFieldValue(field.name, {
        startDate: dates[0] ? dates[0].toDate().toISOString() : "",
        endDate: dates[1] ? dates[1].toDate().toISOString() : "",
      });
    } else {
      form.setFieldValue(field.name, { startDate: "", endDate: "" });
    }

    form.setFieldTouched(field.name, true, true);
  };

  return (
    <DatePicker
      value={value}
      onChange={handleChange}
      range
      rangeHover
      dateSeparator=" - "
      className="date-range-calendar w-full"
      inputClass="date-range-input w-full border border-gray-300 p-2"
      maxDate={new Date()}
      format="DD-MM-YYYY"
      calendarPosition="bottom-right"
      placeholder="Select date range"
      name={field.name}
    />
  );
};

export default FormikDateRangePicker;
