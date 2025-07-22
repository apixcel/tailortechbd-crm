"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/shared/ImageUploader";
import { CreateSupplierPayload } from "@/types";

const initialValues = {
  name: "",
  address: "",
  phoneNumber: "",
  email: "",
  logo: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  logo: Yup.string().required("Logo is required"),
});

const labelClass = "text-[12px] font-semibold text-black";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-dashboard/10 px-4 py-2">
    <span className="text-lg font-bold text-dashboard">{children}</span>
  </div>
);

const SupplierForm = ({
  isLoading = false,
  onSubmit,
  buttonLabel = "Create Supplier",
}: {
  isLoading: boolean;
  onSubmit: (
    values: CreateSupplierPayload,
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
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          {/* Supplier Information */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Supplier Information</SectionTitle>

              {/* address and invoice */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* name */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Name</label>
                  <Field as={Input} name="name" placeholder="Supplier name" />
                  <ErrorMessage name="name" component="div" className="text-sm text-danger" />
                </div>

                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Address</label>
                  <Field as={Input} name="address" placeholder="Supplier address" />
                  <ErrorMessage name="address" component="div" className="text-sm text-danger" />
                </div>

                {/* <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Invoice Number</label>
                  <Field as={Input} name="supplier.invoiceNumber" placeholder="Invoice number" />
                  <ErrorMessage
                    name="supplier.invoiceNumber"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div> */}
              </div>

              {/* phone number and email */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Phone Number</label>
                  <Field as={Input} name="phoneNumber" placeholder="Supplier Phone" />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Email</label>
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
                  onChange={(urls) => setFieldValue("logo", urls?.[0] || "")}
                  title="Upload Supplier Logo"
                />
                <ErrorMessage name="logo" component="div" className="text-sm text-danger" />
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
