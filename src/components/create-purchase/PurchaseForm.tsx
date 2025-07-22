"use client";

import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import Input from "../ui/Input";
import HorizontalLine from "../ui/HorizontalLine";
import ImageUploader from "../shared/ImageUploader";
import CategorySelector from "../shared/CategorySelector";
import Button from "../ui/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import AddSupplierOnPurchase from "../create-supplier/AddSupplierOnPurchase";
import Link from "next/link";
import { CreatePurchasePayload, ISupplier } from "@/types";

// Initial Values
const initialValues = {
  purchaseTitle: "",
  supplier: {
    name: "",
    address: "",
    invoiceNumber: "",
    phoneNumber: "",
    email: "",
    logo: "",
  },
  purchasedProducts: [
    {
      name: "",
      price: 0,
      category: "",
      images: [],
      colors: [
        {
          color: "",
          sizes: [{ size: "", quantity: 0 }],
        },
      ],
    },
  ],
};

// Validation Schema
const validationSchema = Yup.object().shape({
  purchaseTitle: Yup.string().required("Purchase title is required"),
  purchasedProducts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Product name is required"),
      price: Yup.number()
        .required("Product price is required")
        .min(1, "Product price must be >= 1"),
      category: Yup.string().required("Product category is required"),
      images: Yup.array()
        .min(1, "At least one image is required")
        .of(Yup.string().url("Must be a valid URL")),
      colors: Yup.array()
        .min(1, "At least one color is required")
        .of(
          Yup.object().shape({
            color: Yup.string().required("Color is required"),
            sizes: Yup.array()
              .min(1, "At least one size is required")
              .of(
                Yup.object().shape({
                  size: Yup.string().required("Size is required"),
                  quantity: Yup.number()
                    .required("Quantity is required")
                    .min(1, "Quantity must be >= 1"),
                })
              ),
          })
        ),
    })
  ),
});

const labelClass = "text-[12px] font-semibold text-black";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-dashboard/10 px-4 py-2">
    <span className="text-lg font-bold text-dashboard">{children}</span>
  </div>
);

const PurchaseForm = ({
  isLoading = false,
  onSubmit,
  buttonLabel = "Create Purchase",
}: {
  isLoading: boolean;
  onSubmit: (data: CreatePurchasePayload, helper: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, helpers) => {
        const enrichedProducts = values.purchasedProducts.map((p) => {
          const totalQuantity = p.colors.reduce((sum, color) => {
            return sum + color.sizes.reduce((s, sz) => s + Number(sz.quantity || 0), 0);
          }, 0);
          return { ...p, totalQuantity };
        });

        onSubmit(
          {
            ...values,
            purchasedProducts: enrichedProducts,
            supplier: values.supplier as ISupplier & { invoiceNumber: string },
          },
          helpers
        );
      }}
    >
      {({ values, setFieldValue, touched, submitCount }) => (
        <Form className="flex flex-col gap-4">
          {/* Purchase & Supplier Information */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Purchase Information</SectionTitle>

              {/* purchase title */}
              <div className="flex flex-col gap-[5px]">
                <label className={labelClass}>Purchase Title</label>
                <Field as={Input} name="purchaseTitle" placeholder="Enter title" />
                <ErrorMessage
                  name="purchaseTitle"
                  component="div"
                  className="text-sm text-danger"
                />
              </div>
            </div>

            {/* Supplier Information */}
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Supplier Information</SectionTitle>

              {!values.supplier?.name && (
                <AddSupplierOnPurchase setFieldValue={setFieldValue} values={values} />
              )}

              {values.supplier?.name && (
                <div className="flex flex-col gap-2 p-3 text-sm">
                  <div>
                    <strong>Name:</strong> {values.supplier.name}
                  </div>
                  <div>
                    <strong>Address:</strong> {values.supplier.address}
                  </div>
                  <Link href={`tel:${values.supplier.phoneNumber}`}>
                    <strong>Phone:</strong> {values.supplier.phoneNumber}
                  </Link>
                  <Link href={`mailto:${values.supplier.email}`}>
                    <strong>Email:</strong> {values.supplier.email}
                  </Link>
                  <div>
                    <strong>Invoice Number:</strong> {values.supplier.invoiceNumber}
                  </div>
                </div>
              )}

              {/* Error if no supplier added */}
              {(touched.supplier || submitCount > 0) && !values.supplier?.name && (
                <div className="text-sm text-danger">No supplier selected</div>
              )}
            </div>
          </div>

          <HorizontalLine />

          {/* Products Information */}
          <FieldArray name="purchasedProducts">
            {({ push, remove }) => (
              <>
                {values.purchasedProducts.map((product, index) => {
                  const totalQty = product.colors.reduce(
                    (sum, c) => sum + c.sizes.reduce((s, sz) => s + Number(sz.quantity || 0), 0),
                    0
                  );

                  return (
                    <div key={index} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="flex flex-col gap-4 bg-white p-4">
                        <SectionTitle>Product #{index + 1}</SectionTitle>

                        {/* product name */}
                        <div className="flex w-full flex-col gap-[5px]">
                          <label className={labelClass}>Product Name</label>
                          <Field
                            as={Input}
                            name={`purchasedProducts.${index}.name`}
                            placeholder="Product name"
                          />
                          <ErrorMessage
                            name={`purchasedProducts.${index}.name`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>

                        {/* product price and category */}
                        <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                          <div className="flex w-full flex-col gap-[5px]">
                            <label className={labelClass}>Price</label>
                            <Field
                              as={Input}
                              type="number"
                              name={`purchasedProducts.${index}.price`}
                              placeholder="Price"
                            />
                            <ErrorMessage
                              name={`purchasedProducts.${index}.price`}
                              component="div"
                              className="text-sm text-danger"
                            />
                          </div>
                          <div className="flex w-full flex-col gap-[5px]">
                            <label className={labelClass}>Category</label>
                            <CategorySelector
                              onSelect={({ label }) =>
                                setFieldValue(`purchasedProducts.${index}.category`, label)
                              }
                            />
                            <ErrorMessage
                              name={`purchasedProducts.${index}.category`}
                              component="div"
                              className="text-sm text-danger"
                            />
                          </div>
                        </div>

                        {/* Colors & Sizes */}
                        <FieldArray name={`purchasedProducts.${index}.colors`}>
                          {({ push, remove }) => (
                            <div className="mt-4">
                              <SectionTitle>Colors & Sizes #{index + 1}</SectionTitle>
                              {/* colors */}
                              {product.colors.map((color, colorIndex) => (
                                <div
                                  key={colorIndex}
                                  className="mt-2 rounded border border-solid-slab p-4"
                                >
                                  <div className="flex flex-1 flex-col gap-[5px]">
                                    <label className={labelClass}>Color #{colorIndex + 1}</label>
                                    <div className="flex gap-4">
                                      <Field
                                        as={Input}
                                        name={`purchasedProducts.${index}.colors.${colorIndex}.color`}
                                        placeholder="Color"
                                      />
                                      {/* remove color button */}
                                      {colorIndex > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => remove(colorIndex)}
                                          className="cursor-pointer text-danger"
                                        >
                                          <FaRegTrashAlt />
                                        </button>
                                      )}
                                    </div>
                                    <ErrorMessage
                                      name={`purchasedProducts.${index}.colors.${colorIndex}.color`}
                                      component="div"
                                      className="text-sm text-danger"
                                    />
                                  </div>

                                  {/* sizes */}
                                  <FieldArray
                                    name={`purchasedProducts.${index}.colors.${colorIndex}.sizes`}
                                  >
                                    {({ push, remove }) => (
                                      <>
                                        {color.sizes.map((sz, szIndex) => (
                                          <div key={szIndex} className="mt-3">
                                            <div className="flex w-full gap-[16px]">
                                              <div className="flex flex-1 flex-col gap-[5px]">
                                                <label className={labelClass}>Size</label>
                                                <Field
                                                  as={Input}
                                                  name={`purchasedProducts.${index}.colors.${colorIndex}.sizes.${szIndex}.size`}
                                                  placeholder="Size"
                                                />
                                                <ErrorMessage
                                                  name={`purchasedProducts.${index}.colors.${colorIndex}.sizes.${szIndex}.size`}
                                                  component="div"
                                                  className="text-sm text-danger"
                                                />
                                              </div>
                                              <div className="flex flex-1 flex-col gap-[5px]">
                                                <label className={labelClass}>Quantity</label>
                                                <div className="flex gap-4">
                                                  <Field
                                                    as={Input}
                                                    type="number"
                                                    name={`purchasedProducts.${index}.colors.${colorIndex}.sizes.${szIndex}.quantity`}
                                                    placeholder="Quantity"
                                                  />
                                                  {/* remove size button */}
                                                  {szIndex > 0 && (
                                                    <button
                                                      type="button"
                                                      onClick={() => remove(szIndex)}
                                                      className="cursor-pointer text-danger"
                                                    >
                                                      <FaRegTrashAlt />
                                                    </button>
                                                  )}
                                                </div>
                                                <ErrorMessage
                                                  name={`purchasedProducts.${index}.colors.${colorIndex}.sizes.${szIndex}.quantity`}
                                                  component="div"
                                                  className="text-sm text-danger"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => push({ size: "", quantity: "" })}
                                          className="mt-2 cursor-pointer text-primary"
                                        >
                                          + Add Size
                                        </button>
                                      </>
                                    )}
                                  </FieldArray>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() =>
                                  push({ color: "", sizes: [{ size: "", quantity: "" }] })
                                }
                                className="mt-2 cursor-pointer text-primary"
                              >
                                + Add Color
                              </button>
                            </div>
                          )}
                        </FieldArray>

                        {/* Total Quantity */}
                        <div className="mt-2 text-sm font-semibold text-green-600">
                          Total Quantity: {totalQty}
                        </div>
                      </div>

                      {/* Images & Remove Product */}
                      <div className="flex flex-col gap-4 bg-white p-4">
                        <SectionTitle>Product Images #{index + 1}</SectionTitle>
                        <div>
                          <ImageUploader
                            inputId={`product-image-${index}`}
                            onChange={(urls) =>
                              setFieldValue(`purchasedProducts.${index}.images`, urls)
                            }
                          />
                          <ErrorMessage
                            name={`purchasedProducts.${index}.images`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="flex cursor-pointer items-center justify-end gap-2 text-red-500"
                          >
                            <FaRegTrashAlt /> Remove Product
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() =>
                      push({
                        name: "",
                        price: 0,
                        category: "",
                        images: [],
                        colors: [{ color: "", sizes: [{ size: "", quantity: "" }] }],
                      })
                    }
                  >
                    Add Another Product
                  </Button>
                </div>
              </>
            )}
          </FieldArray>

          <Button type="submit" isLoading={isLoading} className="mt-2">
            {buttonLabel}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PurchaseForm;
