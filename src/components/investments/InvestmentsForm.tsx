"use client";

import { CreateInvestmentPayload } from "@/types";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import ImageUploader from "../shared/ImageUploader";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import PickDate from "../ui/PickDate";

const initialValues = {
  partnerName: "",
  amount: 0,
  investmentDate: new Date().toISOString(),
  type: "",
  note: "",
  attachment: "",
};

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  amount: Yup.number().required("Amount is required").min(1, "Amount must be >= 1"),
  investmentDate: Yup.string().required("Date is required"),
  type: Yup.string().required("Type is required"),
  note: Yup.string().required("Note is required"),
  attachment: Yup.string().required("Attachment is required"),
});

const labelClass = "text-[12px] font-semibold text-black";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-dashboard/10 px-4 py-2">
    <span className="text-lg font-bold text-dashboard">{children}</span>
  </div>
);

const InvestmentsForm = ({
  isLoading = false,
  onSubmit,
  buttonLabel = "Create Investment",
}: {
  isLoading: boolean;
  onSubmit: (
    values: CreateInvestmentPayload,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => void;
  buttonLabel?: string;
}) => {
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
              <SectionTitle>Investment Information</SectionTitle>

              {/* partner name and amount */}
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
                  <label className={labelClass}>Investment Amount</label>
                  <Field as={Input} type="number" name="amount" placeholder="Amount" />
                  <ErrorMessage name="amount" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* type and date picker */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Type</label>
                  <Field as={Input} name="type" placeholder="Type" />
                  <ErrorMessage name="type" component="div" className="text-sm text-danger" />
                </div>

                {/* date picker */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Investment Date</label>
                  <Field name="investmentDate">
                    {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                  </Field>
                  <ErrorMessage
                    name="investmentDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* note */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className={labelClass}>Note</label>
                <Field as={TextArea} name="note" placeholder="Note" rows={4} />
                <ErrorMessage name="note" component="div" className="text-sm text-danger" />
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

export default InvestmentsForm;
