"use client";

import { ISupplier } from "@/types";
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { Button, ImageUploader, Input, SectionTitle, TextArea } from "@/components";

const categoryOptions = [
  "Raw Materials",
  "Packaging",
  "Office Supplies",
  "Equipment",
  "Maintenance Services",
  "Logistics",
  "IT & Software",
  "Marketing Materials",
  "Cleaning Supplies",
  "Other",
];

const paymentMethods = ["Cash", "Bank Transfer", "Mobile Wallet", "Cheque", "Credit Terms"];

const initialValues = {
  name: "",
  phoneNumber: "",
  email: "",
  contactPerson: "",
  suppliedProductsCategories: [] as string[],
  address: "",
  preferredPaymentMethod: "",
  notes: "",
  // keep the exact key from your interface
  docuemnt: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[0-9\s\-]{6,20}$/, "Enter a valid phone number"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contactPerson: Yup.string().optional(),
  suppliedProductsCategories: Yup.array()
    .of(Yup.string().trim().required())
    .min(1, "Select at least one category from above")
    .test(
      "unique",
      "Duplicate categories are not allowed",
      (arr) => !arr || new Set(arr.map((s) => s.toLowerCase())).size === arr.length
    ),
  preferredPaymentMethod: Yup.string().required("Preferred payment method is required"),
  notes: Yup.string().optional(),
  docuemnt: Yup.string().url("Must be a valid URL").nullable().notRequired(),
});

const SupplierForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Supplier",
}: {
  isLoading: boolean;
  defaultValue?: Partial<ISupplier>;
  onSubmit: (values: typeof initialValues, helpers: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  const [customCat, setCustomCat] = useState("");
  const [customErr, setCustomErr] = useState("");
  return (
    <Formik
      initialValues={{ ...initialValues, ...defaultValue }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, helpers) => {
        onSubmit(values, helpers);
      }}
    >
      {({ setFieldValue, values }) => {
        const addCustomCategory = (push: (val: string) => void) => {
          const raw = customCat.trim();
          if (!raw) {
            setCustomErr("Enter a category name");
            return;
          }
          const exists = values.suppliedProductsCategories.some(
            (c) => c.toLowerCase() === raw.toLowerCase()
          );
          if (exists) {
            setCustomErr("This category is already added");
            return;
          }
          push(raw);
          setCustomCat("");
          setCustomErr("");
        };

        return (
          <Form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Left: Core info */}
              <div className="flex flex-col gap-4 bg-white p-4">
                <SectionTitle>Supplier Information</SectionTitle>

                {/* name + contactperson */}
                <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Name</label>
                    <Field as={Input} name="name" placeholder="Supplier name" />
                    <ErrorMessage name="name" component="div" className="text-sm text-danger" />
                  </div>

                  {/* contact person */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Contact Person (Optional)</label>
                    <Field as={Input} name="contactPerson" placeholder="e.g. Jane Doe" />
                    <ErrorMessage
                      name="contactPerson"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>
                </div>

                {/* address */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Address</label>
                  <Field as={Input} name="address" placeholder="Supplier address" />
                  <ErrorMessage name="address" component="div" className="text-sm text-danger" />
                </div>

                {/* phone + email */}
                <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Phone Number</label>
                    <Field as={Input} name="phoneNumber" placeholder="+880 1XXXXXXXXX" />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Email</label>
                    <Field as={Input} name="email" placeholder="supplier@email.com" />
                    <ErrorMessage name="email" component="div" className="text-sm text-danger" />
                  </div>
                </div>

                {/* document upload (url) */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Supporting Document (Optional)</label>
                  <ImageUploader
                    inputId="supplier-document"
                    mode="single"
                    onChange={(urls) => setFieldValue("docuemnt", urls?.[0] || "")}
                    title="Upload Document"
                  />
                  <ErrorMessage name="docuemnt" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* Right: Categories + Payment + Notes + Document */}
              <div className="flex flex-col gap-4 bg-white p-4">
                <SectionTitle>Business Details</SectionTitle>

                {/* categories (multi) + custom add */}
                <div className="flex w-full flex-col gap-[8px]">
                  <label className="form-label">Supplied Product Categories</label>

                  <FieldArray name="suppliedProductsCategories">
                    {({ push, remove }) => (
                      <>
                        {/* Fixed options as checkboxes */}
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {categoryOptions.map((opt) => {
                            const checked = values.suppliedProductsCategories.includes(opt);
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2"
                              >
                                <input
                                  type="checkbox"
                                  className="h-4 w-4"
                                  checked={checked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      if (
                                        !values.suppliedProductsCategories.some(
                                          (c) => c.toLowerCase() === opt.toLowerCase()
                                        )
                                      ) {
                                        push(opt);
                                      }
                                    } else {
                                      const idx = values.suppliedProductsCategories.findIndex(
                                        (c) => c.toLowerCase() === opt.toLowerCase()
                                      );
                                      if (idx > -1) remove(idx);
                                    }
                                  }}
                                />
                                <span className="text-sm">{opt}</span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Custom add row */}
                        <div className="mt-3 flex items-center gap-2">
                          <Input
                            value={customCat}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setCustomCat(e.target.value);
                              if (customErr) setCustomErr("");
                            }}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addCustomCategory(push);
                              }
                            }}
                            placeholder="Type a custom category (e.g., Spare Parts)"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            onClick={() => addCustomCategory(push)}
                            className="shrink-0"
                          >
                            Add
                          </Button>
                        </div>
                        {customErr ? <div className="text-xs text-danger">{customErr}</div> : null}

                        {/* Selected chips (removable) */}
                        {!!values.suppliedProductsCategories.length && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {values.suppliedProductsCategories.map((c, idx) => (
                              <span
                                key={`${c}-${idx}`}
                                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm"
                              >
                                {c}
                                <button
                                  type="button"
                                  className="cursor-pointer rounded-full bg-danger px-1 text-xs text-white hover:bg-danger/70"
                                  onClick={() => remove(idx)}
                                  aria-label={`Remove ${c}`}
                                  title={`Remove ${c}`}
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </FieldArray>

                  <ErrorMessage
                    name="suppliedProductsCategories"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* payment method */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Preferred Payment Method</label>
                  <Field
                    as="select"
                    name="preferredPaymentMethod"
                    className="rounded-lg border-[1px] !border-border-main bg-white/10 px-3 py-2 text-sm"
                  >
                    <option value="" disabled>
                      Select a method
                    </option>
                    {paymentMethods.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="preferredPaymentMethod"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                {/* notes */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Notes (Optional)</label>
                  <Field
                    as={TextArea}
                    name="notes"
                    placeholder="Any special terms, delivery windows, etc."
                    rows={3}
                    className="min-h-[90px]"
                  />
                  <ErrorMessage name="notes" component="div" className="text-sm text-danger" />
                </div>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="mt-2">
              {buttonLabel}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SupplierForm;
