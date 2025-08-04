"use client";

import * as Yup from "yup";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { IPartner } from "@/types";

import { Input, SectionTitle, Button, PickDate } from "@/components";

const initialValues: Omit<IPartner, "_id" | "createdAt" | "updatedAt"> = {
  partnerName: "",
  partnerDesignation: "",
  joiningDate: new Date().toISOString(),
};

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  partnerDesignation: Yup.string().required("Designation is required"),
  joiningDate: Yup.string().required("Date is required"),
});

const PartnerForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Partner",
}: {
  isLoading: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (values: IPartner, { resetForm }: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values as IPartner, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({}) => (
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-white p-4">
            <SectionTitle>Partner Information</SectionTitle>

            {/* partner name and designation */}
            <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
              {/* partner name */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Partner Name</label>
                <Field as={Input} name="partnerName" placeholder="Partner name" />
                <ErrorMessage name="partnerName" component="div" className="text-sm text-danger" />
              </div>

              {/* designation */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Designation</label>
                <Field as={Input} name="partnerDesignation" placeholder="Designation" />
                <ErrorMessage
                  name="partnerDesignation"
                  component="div"
                  className="text-sm text-danger"
                />
              </div>

              {/* joining date */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Joining Date</label>
                <Field name="joiningDate">
                  {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                </Field>
                <ErrorMessage name="joiningDate" component="div" className="text-sm text-danger" />
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

export default PartnerForm;
