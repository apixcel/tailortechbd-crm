import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { FieldInputProps, FormikProps, FieldMetaProps } from "formik";
import { ICosting } from "@/types";

interface PickDateProps {
  field: FieldInputProps<string>;
  form: FormikProps<ICosting>;
  meta: FieldMetaProps<string>;
}

const PickDate: React.FC<PickDateProps> = ({ field, form }) => {
  // value from Formik: string (ISO)
  const value = field.value ? new DateObject(field.value) : new DateObject();

  return (
    <DatePicker
      inputClass="w-full appearance-none border-[1px] border-border-main bg-white bg-clip-padding px-[12px] py-[6px] text-base text-[12px] font-normal text-strong outline-none"
      value={value}
      onChange={(dateObj: DateObject | null) => {
        form.setFieldValue(field.name, dateObj ? dateObj.toDate().toISOString() : "");
      }}
       maxDate={new Date()}
      format="YYYY-MM-DD"
    />
  );
};

export default PickDate;
