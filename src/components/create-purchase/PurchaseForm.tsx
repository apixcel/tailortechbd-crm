"use client";

import { IPurchase, ISupplier } from "@/types";
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import * as Yup from "yup";

import CategorySelector from "@/components/shared/CategorySelector";
import ImageUploader from "@/components/shared/ImageUploader";
import SectionTitle from "@/components/shared/SectionTitle";
import Button from "@/components/ui/Button";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Input from "@/components/ui/Input";
import AddSupplierOnPurchase from "../create-supplier/AddSupplierOnPurchase";

const initialValues: Omit<
  IPurchase,
  "_id" | "createdAt" | "updatedAt" | "supplier" | "invoiceNumber"
> & {
  supplier: Pick<ISupplier, "name" | "address" | "phoneNumber" | "email">;
} = {
  purchaseTitle: "",
  supplier: {
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  },
  products: [
    {
      productName: "",
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

const validationSchema = Yup.object().shape({
  purchaseTitle: Yup.string().required("Title is required"),
  products: Yup.array().of(
    Yup.object().shape({
      productName: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required").min(1, "Price must be greater than 1"),
      category: Yup.string().required("Category is required"),
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
                    .min(1, "Quantity must be at least 1"),
                })
              ),
          })
        ),
    })
  ),
});

const PurchaseForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Purchase",
}: {
  isLoading?: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (
    values: Omit<IPurchase, "_id" | "createdAt" | "updatedAt" | "invoiceNumber">,
    helpers: FormikHelpers<typeof initialValues>
  ) => void;
  buttonLabel?: string;
}) => {
  const initValue = defaultValue
    ? {
        ...defaultValue,
        products: defaultValue.products.map((p) => ({
          ...p,
          category: typeof p.category == "string" ? p.category : p.category?._id,
        })),
      }
    : undefined;

  return (
    <Formik
      initialValues={initValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, helpers) => {
        const { supplier, ...rest } = values;

        const supplierId = (supplier as ISupplier)._id;

        if (!supplierId) {
          helpers.setSubmitting(false);
          return;
        }

        const products = values.products.map((product) => ({
          ...product,
          category: typeof product.category === "string" ? product.category : product.category._id,
        }));

        const payload: Omit<
          IPurchase,
          "_id" | "createdAt" | "updatedAt" | "supplier" | "invoiceNumber"
        > & {
          supplier: string;
        } = {
          ...rest,
          supplier: supplierId,
          products,
        };

        onSubmit(
          payload as Omit<IPurchase, "_id" | "createdAt" | "updatedAt" | "invoiceNumber">,
          helpers
        );
      }}
    >
      {({ values, setFieldValue, touched, submitCount }) => (
        <Form className="flex flex-col gap-4">
          {/* Purchase & Supplier Information */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Purchase Information</SectionTitle>

              {/* purchase title */}
              <div className="flex flex-col gap-[5px]">
                <label className="form-label">Purchase Title</label>
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

              {values.supplier?.name && (
                <div className="flex flex-col gap-2 p-3 text-sm">
                  <span>
                    <strong>Name:</strong> {values.supplier.name}
                  </span>
                  <div>
                    <strong>Address:</strong> {values.supplier.address}
                  </div>
                  <Link href={`tel:${values.supplier.phoneNumber}`}>
                    <strong>Phone:</strong> {values.supplier.phoneNumber}
                  </Link>
                  <Link href={`mailto:${values.supplier.email}`}>
                    <strong>Email:</strong> {values.supplier.email}
                  </Link>
                </div>
              )}
              <AddSupplierOnPurchase setFieldValue={setFieldValue} values={values} />

              {/* Error if no supplier added */}
              {(touched.supplier || submitCount > 0) && !values.supplier?.name && (
                <div className="text-sm text-danger">No supplier selected</div>
              )}
            </div>
          </div>

          <HorizontalLine />

          {/* Products Information */}
          <FieldArray name="products">
            {({ push, remove }) => (
              <>
                {values.products.map((product, index) => {
                  const totalQty = product.colors.reduce(
                    (sum, c) => sum + c.sizes.reduce((s, sz) => s + Number(sz.quantity || 0), 0),
                    0
                  );

                  return (
                    <div key={index} className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      <div className="flex flex-col gap-4 bg-white p-4">
                        <SectionTitle>Product #{index + 1}</SectionTitle>

                        {/* product name */}
                        <div className="flex w-full flex-col gap-[5px]">
                          <label className="form-label">Product Name</label>
                          <Field
                            as={Input}
                            name={`products.${index}.productName`}
                            placeholder="Product name"
                          />
                          <ErrorMessage
                            name={`products.${index}.productName`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>

                        {/* product price and category */}
                        <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                          <div className="flex w-full flex-col gap-[5px]">
                            <label className="form-label">Price</label>
                            <Field
                              as={Input}
                              type="number"
                              name={`products.${index}.price`}
                              placeholder="Price"
                            />
                            <ErrorMessage
                              name={`products.${index}.price`}
                              component="div"
                              className="text-sm text-danger"
                            />
                          </div>
                          <div className="flex w-full flex-col gap-[5px]">
                            <label className="form-label">Category</label>
                            <CategorySelector
                              category={
                                typeof defaultValue?.products[index]?.category === "object"
                                  ? defaultValue?.products[index]?.category?.label
                                  : undefined
                              }
                              onSelect={({ label, value }) =>
                                setFieldValue(`products.${index}.category`, value)
                              }
                            />

                            <ErrorMessage
                              name={`products.${index}.category`}
                              component="div"
                              className="text-sm text-danger"
                            />
                          </div>
                        </div>

                        {/* Colors & Sizes */}
                        <FieldArray name={`products.${index}.colors`}>
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
                                    <label className="form-label">Color #{colorIndex + 1}</label>
                                    <div className="flex gap-4">
                                      <Field
                                        as={Input}
                                        name={`products.${index}.colors.${colorIndex}.color`}
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
                                      name={`products.${index}.colors.${colorIndex}.color`}
                                      component="div"
                                      className="text-sm text-danger"
                                    />
                                  </div>

                                  {/* sizes */}
                                  <FieldArray name={`products.${index}.colors.${colorIndex}.sizes`}>
                                    {({ push, remove }) => (
                                      <>
                                        {color.sizes.map((sz, szIndex) => (
                                          <div key={szIndex} className="mt-3">
                                            <div className="flex w-full gap-[16px]">
                                              <div className="flex flex-1 flex-col gap-[5px]">
                                                <label className="form-label">Size</label>
                                                <Field
                                                  as={Input}
                                                  name={`products.${index}.colors.${colorIndex}.sizes.${szIndex}.size`}
                                                  placeholder="Size"
                                                />
                                                <ErrorMessage
                                                  name={`products.${index}.colors.${colorIndex}.sizes.${szIndex}.size`}
                                                  component="div"
                                                  className="text-sm text-danger"
                                                />
                                              </div>
                                              <div className="flex flex-1 flex-col gap-[5px]">
                                                <label className="form-label">Quantity</label>
                                                <div className="flex gap-4">
                                                  <Field
                                                    as={Input}
                                                    type="number"
                                                    name={`products.${index}.colors.${colorIndex}.sizes.${szIndex}.quantity`}
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
                                                  name={`products.${index}.colors.${colorIndex}.sizes.${szIndex}.quantity`}
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
                            onChange={(urls) => setFieldValue(`products.${index}.images`, urls)}
                          />
                          <ErrorMessage
                            name={`products.${index}.images`}
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
