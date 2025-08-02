"use client";

import { ICosting } from "@/types";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Button, ImageUploader, Input, PickDate, SectionTitle, TextArea } from "@/components";

const initialValues: Omit<ICosting, "_id" | "createdAt" | "updatedAt"> = {
  partnerName: "",
  costingAmount: 0,
  costingDate: new Date().toISOString(),
  costingType: "",
  note: "",
  fileUrl: "",
};

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  costingAmount: Yup.number().required("Amount is required").min(1, "Amount must be >= 1"),
  costingDate: Yup.string().required("Date is required"),
  costingType: Yup.string().required("Type is required"),
  note: Yup.string().required("Note is required"),
  fileUrl: Yup.string().required("Attachment is required"),
});

const CostingForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Costing",
}: {
  isLoading: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (values: ICosting, { resetForm }: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values as ICosting, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Costing Information</SectionTitle>

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
                  <label className="form-label">Costing Amount</label>
                  <Field as={Input} type="number" name="costingAmount" placeholder="Amount" />
                  <ErrorMessage
                    name="costingAmount"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* type and date picker */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Costing Type</label>
                  <Field as={Input} name="costingType" placeholder="Costing Type" />
                  <ErrorMessage
                    name="costingType"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* date picker */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Costing Date</label>
                  <Field name="costingDate">{(fieldProps: FieldProps) => <PickDate />}</Field>
                  <ErrorMessage
                    name="costingDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
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
                  inputId="investment-attachment"
                  mode="single"
                  onChange={(urls) => setFieldValue("fileUrl", urls?.[0] || "")}
                  title="Upload Attachment"
                  acceptPDF
                />
                <ErrorMessage name="fileUrl" component="div" className="text-sm text-danger" />
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

export default CostingForm;
