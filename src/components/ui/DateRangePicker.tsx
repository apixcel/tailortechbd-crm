"use client";

import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const DateRangePicker = () => {
  const [values, setValues] = useState([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);

  return (
    <div>
      <DatePicker value={values} onChange={setValues} range />
    </div>
  );
};

export default DateRangePicker;
