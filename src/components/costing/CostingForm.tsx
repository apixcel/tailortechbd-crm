"use client";

import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  Button,
  ImageUploader,
  Input,
  PickDate,
  SectionTitle,
  SelectionBox,
  TextArea,
} from "@/components";

const costingCategoryOptions = [
  { label: "Transport / Travel", value: "Transport / Travel" },
  { label: "Utility Bills", value: "Utility Bills" },
  { label: "Office Rent", value: "Office Rent" },
  { label: "Salaries & Wages", value: "Salaries & Wages" },
  { label: "Raw Materials / Supplies", value: "Raw Materials / Supplies" },
  { label: "Maintenance & Repairs", value: "Maintenance & Repairs" },
  { label: "Marketing & Advertising", value: "Marketing & Advertising" },
  { label: "Training & Development", value: "Training & Development" },
  { label: "Insurance", value: "Insurance" },
  { label: "Taxes & Government Fees", value: "Taxes & Government Fees" },
  { label: "Professional Services", value: "Professional Services" },
  { label: "IT & Software Subscriptions", value: "IT & Software Subscriptions" },
  { label: "Entertainment / Client Hospitality", value: "Entertainment / Client Hospitality" },
  { label: "Miscellaneous / Others", value: "Miscellaneous / Others" },
];

const initialValues = {
  costingAmount: 0,
  costingDate: new Date().toISOString(),
  preparedByName: "",
  preparedByDesignation: "",
  costingCategory: "",
  note: "",
  costingRemark: "",
  fileUrl: "",
};

const validationSchema = Yup.object().shape({
  costingAmount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .min(1, "Amount must be greater than 1"),
  costingDate: Yup.string().required("Date is required"),
  preparedByName: Yup.string().required("Prepared by (name) is required"),
  preparedByDesignation: Yup.string().required("Prepared by (designation) is required"),
  costingCategory: Yup.string().required("Category is required"),
  note: Yup.string().required("Note description is required"),
  costingRemark: Yup.string().optional(),
  fileUrl: Yup.string().url("Must be a valid URL").nullable().notRequired(),
});

const CostingForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Costing",
}: {
  isLoading: boolean;
  defaultValue?: Partial<typeof initialValues>;
  onSubmit: (values: typeof initialValues, helpers: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={{ ...initialValues, ...defaultValue }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, helpers) => {
        onSubmit(values, helpers);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-white p-4">
            <SectionTitle>Costing Information</SectionTitle>

            {/* amount, date, category */}
            <div className="flex items-start gap-[20px]">
              <div className="flex w-full flex-col items-start justify-start gap-[16px]">
                {/* Amount */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Costing Amount</label>
                  <Field as={Input} type="number" name="costingAmount" placeholder="Amount" />
                  <ErrorMessage
                    name="costingAmount"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* Date */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Costing Date</label>
                  <Field name="costingDate">
                    {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                  </Field>
                  <ErrorMessage
                    name="costingDate"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* Category */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Costing Category</label>
                  <SelectionBox
                    data={costingCategoryOptions}
                    onSelect={(option) => setFieldValue("costingCategory", option.value)}
                    defaultValue={costingCategoryOptions.find(
                      (opt) => opt.value === values.costingCategory
                    )}
                    displayValue={
                      costingCategoryOptions.find((opt) => opt.value === values.costingCategory)
                        ?.label
                    }
                    showSearch={false}
                  />
                  <ErrorMessage
                    name="costingCategory"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* Remark */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Costing Remark (Optional)</label>
                  <Field
                    as={TextArea}
                    name="costingRemark"
                    placeholder="Any additional remarks..."
                    rows={2}
                    className={"min-h-[80px]"}
                  />
                  <ErrorMessage
                    name="costingRemark"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
              </div>

              {/* description & prepared by */}
              <div className="flex w-full flex-col gap-[16px]">
                {/* Prepared By - Name */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Prepared By (Name)</label>
                  <Field as={Input} type="text" name="preparedByName" placeholder="e.g. Jane Doe" />
                  <ErrorMessage
                    name="preparedByName"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* Prepared By - Designation */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Prepared By (Designation)</label>
                  <Field
                    as={Input}
                    type="text"
                    name="preparedByDesignation"
                    placeholder="e.g. Accounts Manager"
                  />
                  <ErrorMessage
                    name="preparedByDesignation"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* Description */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Description</label>
                  <Field
                    as={TextArea}
                    name="note"
                    placeholder="Eg. Need to pay some money"
                    rows={4}
                    className={"min-h-[120px]"}
                  />
                  <ErrorMessage name="note" component="div" className="text-sm text-danger" />
                </div>
              </div>
            </div>

            {/* Image */}
            <ImageUploader
              inputId="costing-attachment"
              mode="single"
              defaultImages={defaultValue?.fileUrl ? [defaultValue.fileUrl] : []}
              onChange={(urls) => setFieldValue("fileUrl", urls?.[0] || "")}
              title="Upload Image (optional)"
            />
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
