"use client";

import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { ICosting } from "@/types";

import { Button, Input, PickDate, SectionTitle, SelectionBox, TextArea } from "@/components";

const costingTypeOptions = [
  { label: "Credit", value: "credit" },
  { label: "Debit", value: "debit" },
];

const initialValues: Omit<ICosting, "_id" | "createdAt" | "updatedAt"> = {
  costingAmount: 0,
  costingDate: new Date().toISOString(),
  costingType: "",
  note: "",
};

const validationSchema = Yup.object().shape({
  costingAmount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be greater than 1"),
  costingDate: Yup.string().required("Date is required"),
  costingType: Yup.string().required("Type is required"),
  note: Yup.string().required("Note description is required"),
});

const CostingForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Costing",
}: {
  isLoading: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (values: ICosting, helpers: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, helpers) => {
        onSubmit(values as ICosting, helpers);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-white p-4">
            <SectionTitle>Costing Information</SectionTitle>
            {/* amount, date, type */}
            <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Costing Amount</label>
                <Field as={Input} type="number" name="costingAmount" placeholder="Amount" />
                <ErrorMessage
                  name="costingAmount"
                  component="div"
                  className="text-sm text-danger"
                />
              </div>

              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Costing Date</label>
                <Field name="costingDate">
                  {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                </Field>
                <ErrorMessage name="costingDate" component="div" className="text-sm text-danger" />
              </div>

              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Costing Type</label>
                <SelectionBox
                  data={costingTypeOptions}
                  onSelect={(option) => setFieldValue("costingType", option.value)}
                  defaultValue={costingTypeOptions.find((opt) => opt.value === values.costingType)}
                  displayValue={
                    costingTypeOptions.find((opt) => opt.value === values.costingType)?.label
                  }
                  showSearch={false}
                />
                <ErrorMessage name="costingType" component="div" className="text-sm text-danger" />
              </div>
            </div>

            {/* description */}
            <div className="flex w-full flex-col gap-[5px]">
              <label className="form-label">Description</label>
              <Field as={TextArea} name="note" placeholder="Eg. Need to pay some money" rows={4} />
              <ErrorMessage name="note" component="div" className="text-sm text-danger" />
            </div>
          </div>
          <Button type="submit" isLoading={isLoading} className="mt-2">
            {buttonLabel}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CostingForm;
