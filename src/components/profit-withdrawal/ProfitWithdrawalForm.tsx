"use client";

import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { IProfitWithdrawal, IPartner } from "@/types";

import {
  Input,
  ImageUploader,
  Button,
  SectionTitle,
  TextArea,
  PickDate,
  DateRangePicker,
  AddPartnerOnForm,
} from "@/components";

const initialValues: Omit<IProfitWithdrawal, "_id" | "createdAt" | "updatedAt" | "partner"> & {
  partner: Omit<IPartner, "createdAt" | "updatedAt">;
} = {
  withdrawalAmount: 0,
  withdrawalDate: new Date().toISOString(),
  withdrawalDescription: "",
  partner: {
    _id: "",
    partnerName: "",
    partnerDesignation: "",
    partnerJoiningDate: "",
  },
};

const validationSchema = Yup.object().shape({
  withdrawalAmount: Yup.number()
    .required("Withdrawal amount is required")
    .min(1, "Withdrawal amount must be >= 1"),
  withdrawalDate: Yup.string().required("Date is required"),
  withdrawalDescription: Yup.string().required("Description is required"),
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

              {/* partner name and total Profit amount */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* withdrawal amount */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Withdrawal Amount</label>
                  <Field as={Input} type="number" name="withdrawalAmount" placeholder="Amount" />
                  <ErrorMessage
                    name="withdrawalAmount"
                    component="div"
                    className="text-sm text-danger"
                  />
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

              {/* description */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Description</label>
                <Field
                  as={TextArea}
                  name="withdrawalDescription"
                  placeholder="Description"
                  rows={4}
                />
                <ErrorMessage
                  name="withdrawalDescription"
                  component="div"
                  className="text-sm text-danger"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Attachment</SectionTitle>

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
                    <strong>Joining Date:</strong> {values.partner.partnerJoiningDate.split("T")[0]}
                  </div>
                </div>
              )}

              {/* Error if no supplier added */}
              {(touched.partner || submitCount > 0) && !values.partner?.partnerName && (
                <div className="text-sm text-danger">No partner selected</div>
              )}
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
