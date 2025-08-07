"use client";

import { IPartner, IProfitWithdrawal } from "@/types";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  AddPartnerOnForm,
  Button,
  FormikDateRangePicker,
  ImageUploader,
  Input,
  PickDate,
  SectionTitle,
  SelectionBox,
  TextArea,
} from "@/components";
import dateUtils from "@/utils/date";

const withdrawalStatusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Not paid", value: "not_paid" },
];

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const initialValues: Omit<IProfitWithdrawal, "_id" | "createdAt" | "updatedAt" | "partner"> & {
  partner: Omit<IPartner, "createdAt" | "updatedAt">;
} = {
  totalProfitAmount: 0,
  percentage: 0,
  withdrawalDate: new Date().toISOString(),
  status: "",
  comment: "",
  attachment: "",
  profitPeriod: {
    endDate: today.toISOString(),
    startDate: tomorrow.toISOString(),
  },
  partner: {
    _id: "",
    partnerName: "",
    partnerDesignation: "",
    joiningDate: "",
  },
};

const validationSchema = Yup.object().shape({
  totalProfitAmount: Yup.number()
    .required("Profit amount is required")
    .min(1, "Profit amount must be at least 1"),
  percentage: Yup.number()
    .required("Percentage is required")
    .min(1, "Percentage must be at least 1")
    .max(100, "Percentage must be at most 100"),
  withdrawalDate: Yup.string().required("Date is required"),
  comment: Yup.string().required("Comment is required"),
  status: Yup.string().required("Status is required"),
  profitPeriod: Yup.object().shape({
    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),
  }),
  partner: Yup.object().shape({
    _id: Yup.string().required("Invalid partner"),
    partnerName: Yup.string().required("Partner name is required"),
    partnerDesignation: Yup.string().required("Designation is required"),
    joiningDate: Yup.string().required("Date is required"),
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
  onSubmit: (values: IProfitWithdrawal, { resetForm }: FormikHelpers<typeof initialValues>) => void;
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
      {({ setFieldValue, values, touched, submitCount }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Profit Withdrawal Information</SectionTitle>

              {/* total profit amount and percentage */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* profit period */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Profit Period (Date Range)</label>
                  <Field name="profitPeriod" component={FormikDateRangePicker} />
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

                {/* profit amount */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Total Profit Amount</label>
                  <Field as={Input} type="number" name="totalProfitAmount" placeholder="Amount" />
                  <ErrorMessage
                    name="totalProfitAmount"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* percentage and withdrawal date */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* percentage */}
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

              {/* status and withdrawal date */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* status */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Withdrawal Status</label>
                  <SelectionBox
                    data={withdrawalStatusOptions}
                    onSelect={(option) => setFieldValue("status", option.value)}
                    defaultValue={withdrawalStatusOptions.find(
                      (opt) => opt.value === values.status
                    )}
                    displayValue={
                      withdrawalStatusOptions.find((opt) => opt.value === values.status)?.label
                    }
                    showSearch={false}
                  />
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

            <div className="flex h-full flex-col gap-6 bg-white p-4">
              {/* partner information */}
              <div className="flex flex-col gap-4">
                <SectionTitle>Partner Information</SectionTitle>

                {!values.partner.partnerName && (
                  <AddPartnerOnForm setFieldValue={setFieldValue} values={values} />
                )}

                {values.partner.partnerName && (
                  <div className="flex flex-col gap-2 p-3 text-sm">
                    <div>
                      <strong>Name:</strong> {values.partner.partnerName}
                    </div>
                    <div>
                      <strong>Designation:</strong> {values.partner.partnerDesignation}
                    </div>
                    <div>
                      <strong>Joining Date:</strong>{" "}
                      {dateUtils.formatDate(values.partner.joiningDate)}
                    </div>
                  </div>
                )}

                {/* Error if no supplier added */}
                {(touched.partner || submitCount > 0) && !values.partner?.partnerName && (
                  <div className="text-sm text-danger">No partner selected</div>
                )}
              </div>

              {/* attachment information */}
              <div className="flex flex-col gap-4">
                <SectionTitle>Attachment</SectionTitle>

                <ImageUploader
                  onChange={(fileUrls) => setFieldValue("attachment", fileUrls || [])}
                  defaultImages={values.attachment ? [values.attachment] : []}
                  acceptPDF={true}
                  title="Upload Image or PDF (Optional)"
                />
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
