"use client";

import { IProfitWithdrawal, TProfitWithdrawalStatus } from "@/types";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  AddPartnerOnForm,
  Button,
  ImageUploader,
  Input,
  SectionTitle,
  SelectionBox,
  TextArea,
} from "@/components";
import { paymentMethodOptions } from "@/constant/paymentMethods";
import dateUtils from "@/utils/date";

const withdrawalStatusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Not paid", value: "not_paid" },
];

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const initialValues = {
  status: "not_paid" as TProfitWithdrawalStatus,
  comment: "",
  attachment: "",
  paymentMethod: "",
  withdrawalAmount: 0,
  partner: {
    _id: "",
    sharePercentage: 0,
    partnerName: "",
    partnerDesignation: "",
    joiningDate: "",
  },
};

const validationSchema = Yup.object().shape({
  withdrawalAmount: Yup.number()
    .max(10000000, "Amount must be less than 10000000")
    .required("Amount is required"),
  comment: Yup.string().required("Comment is required"),
  attachment: Yup.string().optional(),
  paymentMethod: Yup.string().required("Payment Method is required"),
  status: Yup.string().required("Status is required"),
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
  onSubmit: (
    values: Partial<IProfitWithdrawal>,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({ setFieldValue, values, touched, submitCount }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Profit Withdrawal Information</SectionTitle>

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
                {/* paymentMethod */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Payment Method</label>
                  <SelectionBox
                    data={paymentMethodOptions}
                    onSelect={(option) => setFieldValue("paymentMethod", option.value)}
                    defaultValue={paymentMethodOptions.find(
                      (opt) => opt.value === values.paymentMethod
                    )}
                    displayValue={
                      paymentMethodOptions.find((opt) => opt.value === values.paymentMethod)?.label
                    }
                    showSearch={false}
                  />
                  <ErrorMessage name="status" component="div" className="text-sm text-danger" />
                </div>
              </div>

              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Withdrawal Amount</label>
                <Field
                  as={Input}
                  name="withdrawalAmount"
                  placeholder="Withdrawal Amount"
                  rows={4}
                />
                <ErrorMessage
                  name="withdrawalAmount"
                  component="spam"
                  className="text-sm text-danger"
                />
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
                    </div>{" "}
                    <button
                      onClick={() => setFieldValue("partner", initialValues.partner)}
                      className="w-fit cursor-pointer bg-primary px-2 py-1 text-white"
                    >
                      Remove Partner
                    </button>
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
                  onChange={(fileUrls) => setFieldValue("attachment", fileUrls?.[0] || "")}
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
