"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { ISupplier } from "@/types";

import { Input, Button, ImageUploader, SectionTitle } from "@/components";

const initialValues: Omit<ISupplier, "_id" | "createdAt" | "updatedAt"> = {
  name: "",
  address: "",
  phoneNumber: "",
  email: "",
  logoUrl: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  logoUrl: Yup.string().required("Logo is required"),
});

const SupplierForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Supplier",
}: {
  isLoading: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (values: ISupplier, { resetForm }: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values as ISupplier, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          {/* Supplier Information */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Supplier Information</SectionTitle>

              {/* address and invoice */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* name */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Name</label>
                  <Field as={Input} name="name" placeholder="Supplier name" />
                  <ErrorMessage name="name" component="div" className="text-sm text-danger" />
                </div>

                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Address</label>
                  <Field as={Input} name="address" placeholder="Supplier address" />
                  <ErrorMessage name="address" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* phone number and email */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Phone Number</label>
                  <Field as={Input} name="phoneNumber" placeholder="Supplier Phone" />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Email</label>
                  <Field as={Input} name="email" placeholder="Supplier Email" />
                  <ErrorMessage name="email" component="div" className="text-sm text-danger" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Supplier Logo</SectionTitle>
              <div>
                <ImageUploader
                  inputId="supplier-logo"
                  mode="single"
                  onChange={(urls) => setFieldValue("logoUrl", urls?.[0] || "")}
                  title="Upload Supplier Logo"
                />
                <ErrorMessage name="logoUrl" component="div" className="text-sm text-danger" />
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

export default SupplierForm;
