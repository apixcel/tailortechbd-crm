"use client";

import { CreateCostingPayload } from "@/types";
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
  costingDate: new Date().toISOString(),
  costingCategory: "",
  costingType: "",
  note: "",
};

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  amount: Yup.number().required("Amount is required").min(1, "Amount must be >= 1"),
  costingDate: Yup.string().required("Date is required"),
  costingCategory: Yup.string().required("Category is required"),
  costingType: Yup.string().required("Type is required"),
  note: Yup.string().required("Note is required"),
  attachment: Yup.string().optional(),
});

const labelClass = "text-[12px] font-semibold text-black";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-dashboard/10 px-4 py-2">
    <span className="text-lg font-bold text-dashboard">{children}</span>
  </div>
);

const CostingForm = ({
  isLoading = false,
  onSubmit,
  buttonLabel = "Create Costing",
}: {
  isLoading: boolean;
  onSubmit: (
    values: CreateCostingPayload,
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
              <SectionTitle>Costing Information</SectionTitle>

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
                  <label className={labelClass}>Costing Amount</label>
                  <Field as={Input} type="number" name="amount" placeholder="Amount" />
                  <ErrorMessage name="amount" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* type and date picker */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Costing Category</label>
                  <Field as={Input} name="costingCategory" placeholder="Costing Category" />
                  <ErrorMessage
                    name="costingCategory"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* date picker */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Costing Date</label>
                  <Field name="costingDate">
                    {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                  </Field>
                  <ErrorMessage
                    name="costingDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-[5px]">
                <label className={labelClass}>Costing Type</label>
                <Field as={Input} name="costingType" placeholder="Costing Type" />
                <ErrorMessage name="costingType" component="div" className="text-sm text-danger" />
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

export default CostingForm;
