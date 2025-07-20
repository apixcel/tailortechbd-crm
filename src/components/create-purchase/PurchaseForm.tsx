"use client";

import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { twMerge } from "tailwind-merge";
import Input from "../ui/Input";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Purchase title is required"),
});

const labelClass = "text-[10px] md:text-[14px] font-[600] text-black";

const SectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("w-full bg-dashboard/10 px-[16px] py-[8px]", className)}>
      <span className="text-[16px] font-[700] text-dashboard">{children}</span>
    </div>
  );
};

interface PurchaseFormValues {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const PurchaseForm = () => {
  const onSubmit = (values: PurchaseFormValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: 0,
        quantity: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched }) => (
        <Form>
          <SectionTitle>Purchase Information</SectionTitle>
          <div className="w-full">
            <label className={labelClass}>Purchase Title</label>
            <Field as={Input} name="name" placeholder="Purchase title" />
            {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PurchaseForm;
