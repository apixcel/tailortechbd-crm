"use client";

import { IInvestment } from "@/types";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  AddPartnerOnForm,
  Button,
  ImageUploader,
  Input,
  PickDate,
  SectionTitle,
  SelectionBox, // 👈 added
} from "@/components";
import dateUtils from "@/utils/date";

const transactionMethodOptions = [
  { label: "Bkash", value: "Bkash" },
  { label: "Nagad", value: "Nagad" },
  { label: "Bank", value: "Bank" },
  { label: "Cash", value: "Cash" },
  { label: "Cheque", value: "Cheque" },
  { label: "Other", value: "Other" },
];

const initialValues = {
  investmentAmount: 0,
  investmentDate: new Date().toISOString(),
  note: "",
  attachment: "",
  transactionMethod: "", // 👈 added

  partner: {
    _id: "",
    partnerName: "",
    partnerDesignation: "",
    joiningDate: "",
  },
};

const validationSchema = Yup.object().shape({
  investmentAmount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be greater than 1"),
  investmentDate: Yup.string().required("Date is required"),
  note: Yup.string().required("Note is required"),
  transactionMethod: Yup.string()
    .oneOf(transactionMethodOptions.map((o) => o.value))
    .optional(), // 👈 optional to match your DB schema
});

const InvestmentsForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Investment",
}: {
  isLoading: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (values: IInvestment, { resetForm }: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values as IInvestment, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({ setFieldValue, values, touched, submitCount }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid h-full grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
            <div className="flex h-full flex-col gap-6 bg-white p-4">
              {/* investment information */}
              <div className="flex flex-col gap-4">
                <SectionTitle>Investment Information</SectionTitle>

                {/* amount, date, transaction method */}
                <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                  {/* investment amount */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Investment Amount</label>
                    <Field as={Input} type="number" name="investmentAmount" placeholder="Amount" />
                    <ErrorMessage
                      name="investmentAmount"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* date picker */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Investment Date</label>
                    <Field name="investmentDate">
                      {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                    </Field>
                    <ErrorMessage
                      name="investmentDate"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* transaction method 👇 */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Transaction Method</label>
                    <SelectionBox
                      data={transactionMethodOptions}
                      onSelect={(opt) => setFieldValue("transactionMethod", opt.value)}
                      defaultValue={transactionMethodOptions.find(
                        (opt) => opt.value === values.transactionMethod
                      )}
                      displayValue={
                        transactionMethodOptions.find(
                          (opt) => opt.value === values.transactionMethod
                        )?.label
                      }
                      showSearch={false}
                    />
                    <ErrorMessage
                      name="transactionMethod"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>
                </div>

                {/* note */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Description</label>
                  <Field as={Input} name="note" placeholder="Note" />
                  <ErrorMessage name="note" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* partner information */}
              <div className="flex flex-col gap-4">
                <SectionTitle>Partner Information</SectionTitle>

                {!values.partner.partnerName && (
                  <AddPartnerOnForm setFieldValue={setFieldValue} values={values} />
                )}

                {values.partner.partnerName && (
                  <div className="flex flex-col gap-2 p-3 text-sm">
                    <div>
                      <strong>Names:</strong> {values.partner.partnerName}
                    </div>
                    <div>
                      <strong>Designation:</strong> {values.partner.partnerDesignation}
                    </div>
                    <div>
                      <strong>Joining Date:</strong>{" "}
                      {dateUtils.formatDate(values.partner.joiningDate)}
                    </div>
                    <button
                      onClick={() => setFieldValue("partner", initialValues.partner)}
                      className="w-fit cursor-pointer bg-primary px-2 py-1 text-white"
                    >
                      Remove Partner
                    </button>
                  </div>
                )}

                {/* error if no partner added */}
                {(touched.partner || submitCount > 0) && !values.partner?.partnerName && (
                  <div className="text-sm text-danger">No partner selected</div>
                )}
              </div>
            </div>

            {/* attachment */}
            <div className="flex h-full flex-col gap-4 bg-white p-4">
              <SectionTitle>Remark</SectionTitle>

              <ImageUploader
                onChange={(fileUrls) => setFieldValue("attachment", fileUrls || [])}
                defaultImages={values.attachment ? [values.attachment] : []}
                acceptPDF={true}
                title="Upload Image or PDF (Optional)"
              />
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

export default InvestmentsForm;
