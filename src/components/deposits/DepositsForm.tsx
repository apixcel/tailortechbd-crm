"use client";

import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { IDeposit } from "@/types";

import { Input, ImageUploader, Button, SectionTitle, TextArea, PickDate } from "@/components";

const initialValues: Omit<IDeposit, "_id" | "createdAt" | "updatedAt"> = {
  partnerName: "",
  depositAmount: 0,
  source: "",
  depositDate: new Date().toISOString(),
  type: "",
  note: "",
  attachment: "",
};

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  depositAmount: Yup.number().required("Amount is required").min(1, "Amount must be >= 1"),
  source: Yup.string().required("Source is required"),
  depositDate: Yup.string().required("Date is required"),
  type: Yup.string().required("Type is required"),
  note: Yup.string().required("Note is required"),
  attachment: Yup.string().required("Attachment is required"),
});

const DepositsForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Deposit",
}: {
  isLoading: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (values: IDeposit, { resetForm }: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values as IDeposit, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Deposit Information</SectionTitle>

              {/* partner name and amount */}
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

                {/* amount */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Deposit Amount</label>
                  <Field as={Input} type="number" name="depositAmount" placeholder="Amount" />
                  <ErrorMessage
                    name="depositAmount"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* type and date picker */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Type</label>
                  <Field as={Input} name="type" placeholder="Type" />
                  <ErrorMessage name="type" component="div" className="text-sm text-danger" />
                </div>

                {/* date picker */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Deposit Date</label>
                  <Field name="depositDate">
                    {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                  </Field>
                  <ErrorMessage
                    name="depositDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* source */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Source</label>
                <Field
                  as={Input}
                  name="source"
                  placeholder="Source (Cash,Bank, Bkash, Rocket, etc.)"
                />
                <ErrorMessage name="source" component="div" className="text-sm text-danger" />
              </div>

              {/* note */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Note</label>
                <Field as={TextArea} name="note" placeholder="Note" rows={4} />
                <ErrorMessage name="note" component="div" className="text-sm text-danger" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Attachment</SectionTitle>
              <div>
                <ImageUploader
                  inputId="deposit-attachment"
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

export default DepositsForm;
