"use client";

import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { IProfitWithdrawal } from "@/types";

import {
  Input,
  ImageUploader,
  Button,
  SectionTitle,
  TextArea,
  PickDate,
  DateRangePicker,
} from "@/components";

const initialValues: Omit<IProfitWithdrawal, "_id" | "createdAt" | "updatedAt"> = {
  partnerName: "",
  totalProfitAmount: 0,
  percentage: 0,
  withdrawalDate: new Date().toISOString(),
  status: "",
  comment: "",
  attachment: "",
  profitPeriod: {
    startDate: "",
    endDate: "",
  },
};

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  totalProfitAmount: Yup.number()
    .required("Total profit is required")
    .min(1, "Total profit must be >= 1"),
  percentage: Yup.number().required("Percentage is required").min(1, "Percentage must be >= 1"),
  withdrawalDate: Yup.string().required("Date is required"),
  status: Yup.string().required("Status is required"),
  comment: Yup.string().required("Comment is required"),
  attachment: Yup.string().required("Attachment is required"),
  profitPeriod: Yup.object({
    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),
  }),
});

const ProfitWithdrawalForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Profit Withdrawal",
}: {
  isLoading: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (
    values: IProfitWithdrawal,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values as IProfitWithdrawal, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Profit Withdrawal Information</SectionTitle>

              {/* partner name and total Profit amount */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* partner name */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Partner Name</label>
                  <Field as={Input} name="partnerName" placeholder="Partner name" />
                  <ErrorMessage
                    name="partnerName"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* total profit amount */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Total Profit Amount</label>
                  <Field
                    as={Input}
                    type="number"
                    name="totalProfitAmount"
                    placeholder="Total Profit Amount"
                  />
                  <ErrorMessage
                    name="totalProfitAmount"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* type and date picker */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Percentage</label>
                  <Field as={Input} type="number" name="percentage" placeholder="Percentage" />
                  <ErrorMessage name="percentage" component="div" className="text-sm text-danger" />
                </div>

                {/* date picker */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Withdrawal Date</label>
                  <Field name="withdrawalDate">
                    {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                  </Field>
                  <ErrorMessage
                    name="withdrawalDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* period and status */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* period */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Profit Period</label>
                  <Field name="profitPeriod" component={DateRangePicker} />
                  <ErrorMessage
                    name="profitPeriod.startDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                  <ErrorMessage
                    name="profitPeriod.endDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* status */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Status</label>
                  <Field
                    name="status"
                    as="select"
                    className="w-full cursor-pointer appearance-none border border-border-main bg-white px-[12px] py-[6px] text-sm text-strong outline-none"
                  >
                    <option value="">Select status</option>
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* comment */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Comment</label>
                <Field as={TextArea} name="comment" placeholder="Comment" rows={4} />
                <ErrorMessage name="comment" component="div" className="text-sm text-danger" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Attachment</SectionTitle>
              <div>
                <ImageUploader
                  inputId="investment-attachment"
                  mode="single"
                  onChange={(urls) => setFieldValue("attachment", urls?.[0] || "")}
                  title="Upload Attachment"
                  acceptPDF
                />
                <ErrorMessage name="attachment" component="div" className="text-sm text-danger" />
              </div>
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

export default ProfitWithdrawalForm;
