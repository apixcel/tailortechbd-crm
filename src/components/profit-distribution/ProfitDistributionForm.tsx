"use client";

import { CreateProfitDistributionPayload } from "@/types";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import ImageUploader from "../shared/ImageUploader";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import PickDate from "../ui/PickDate";
import DateRangePicker from "../ui/DateRangePicker";

const initialValues = {
  partnerName: "",
  totalProfit: 0,
  percentage: 0,
  distributionDate: new Date().toISOString(),
  status: "",
  comment: "",
  attachment: "",
  period: {
    startDate: "",
    endDate: "",
  },
};

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  totalProfit: Yup.number()
    .required("Total profit is required")
    .min(1, "Total profit must be >= 1"),
  percentage: Yup.number().required("Percentage is required").min(1, "Percentage must be >= 1"),
  distributionDate: Yup.string().required("Date is required"),
  status: Yup.string().required("Status is required"),
  comment: Yup.string().required("Comment is required"),
  attachment: Yup.string().required("Attachment is required"),
  period: Yup.object({
    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),
  }),
});

const labelClass = "text-[12px] font-semibold text-black";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-dashboard/10 px-4 py-2">
    <span className="text-lg font-bold text-dashboard">{children}</span>
  </div>
);

const ProfitDistributionForm = ({
  isLoading = false,
  onSubmit,
  buttonLabel = "Create Profit Distribution",
  defaultValue,
}: {
  isLoading: boolean;
  onSubmit: (
    values: CreateProfitDistributionPayload,
    formikHelpers: FormikHelpers<CreateProfitDistributionPayload>
  ) => void;
  buttonLabel?: string;
  defaultValue?: CreateProfitDistributionPayload;
}) => {
  const initialValues = defaultValue ?? {
    partnerName: "",
    totalProfit: 0,
    percentage: 0,
    distributionDate: new Date().toISOString(),
    status: "",
    comment: "",
    attachment: "",
    period: {
      startDate: "",
      endDate: "",
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Profit Distribution Information</SectionTitle>

              {/* partner name and total Profit amount */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* partner name */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Partner Name</label>
                  <Field as={Input} name="partnerName" placeholder="Partner name" />
                  <ErrorMessage
                    name="partnerName"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Total Profit Amount</label>
                  <Field
                    as={Input}
                    type="number"
                    name="totalProfit"
                    placeholder="Total Profit Amount"
                  />
                  <ErrorMessage
                    name="totalProfit"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* type and date picker */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Percentage</label>
                  <Field as={Input} type="number" name="percentage" placeholder="Percentage" />
                  <ErrorMessage name="percentage" component="div" className="text-sm text-danger" />
                </div>

                {/* date picker */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Distribution Date</label>
                  <Field name="distributionDate">
                    {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                  </Field>
                  <ErrorMessage
                    name="distributionDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* period and status */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* period */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Profit Period</label>
                  <Field name="period" component={DateRangePicker} />
                  <ErrorMessage
                    name="period.startDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                  <ErrorMessage
                    name="period.endDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* status */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Status</label>
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
                <label className={labelClass}>Comment</label>
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

export default ProfitDistributionForm;
