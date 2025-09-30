"use client";

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import SectionTitle from "../shared/SectionTitle";
import Input from "../ui/Input";
import Link from "next/link";
import AddSupplierOnPurchase from "../create-supplier/AddSupplierOnPurchase";
import HorizontalLine from "../ui/HorizontalLine";
import CategorySelector from "../shared/CategorySelector";
import { FaRegTrashAlt } from "react-icons/fa";
import ImageUploader from "../shared/ImageUploader";
import Button from "../ui/Button";
import {
  IProduct,
  IPurchase,
  ICategory,
  IColor,
  IQueryMutationErrorResponse,
  ISize,
  ISupplier,
} from "@/types";
import {
  useCreatePurchaseMutation,
  useGetPurchaseByIdQuery,
  useUpdatePurchaseByIdMutation,
} from "@/redux/features/purchase/purchase.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const emptyFormValues = {
  purchaseTitle: "",
  purchaseType: "APPAREL",
  supplier: {
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    _id: "" as unknown as string | undefined,
  },
  products: [
    {
      productName: "",
      price: 0,
      category: "",
      images: [] as string[],
      colors: [
        {
          color: "",
          sizes: [{ size: "", quantity: 0 }],
        },
      ],
    },
  ],
};

const apparelProductSchema = Yup.object().shape({
  productName: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(1, "Price must be greater than 1"),
  category: Yup.string().required("Category is required"),
  images: Yup.array()
    .of(Yup.string().url("Must be a valid URL"))
    .min(1, "At least one image is required"),
  colors: Yup.array()
    .min(1, "At least one color is required")
    .of(
      Yup.object({
        color: Yup.string().required("Color is required"),
        sizes: Yup.array()
          .min(1, "At least one size is required")
          .of(
            Yup.object({
              size: Yup.string().required("Size is required"),
              quantity: Yup.number()
                .typeError("Quantity must be a number")
                .required("Quantity is required")
                .min(1, "Quantity must be at least 1"),
            })
          ),
      })
    ),
});

const apparelSchema = Yup.object({
  purchaseTitle: Yup.string().required("Title is required"),
  supplier: Yup.object({
    name: Yup.string().when(["_id"], {
      is: (id: string | undefined) => !id,
      then: (schema) => schema.required("Supplier name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    address: Yup.string().when(["_id"], {
      is: (id: string | undefined) => !id,
      then: (schema) => schema.required("Address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    phoneNumber: Yup.string().when(["_id"], {
      is: (id: string | undefined) => !id,
      then: (schema) => schema.required("Phone number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    email: Yup.string()
      .email("Invalid email")
      .when(["_id"], {
        is: (id: string | undefined) => !id,
        then: (schema) => schema.required("Email is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    _id: Yup.string().notRequired(),
  }),
  products: Yup.array().min(1, "At least one product is required").of(apparelProductSchema),
});

const mapApiToForm = (api: IPurchase) => {
  const supplier = api?.supplier || {};
  return {
    purchaseTitle: api?.purchaseTitle ?? "",
    purchaseType: "APPAREL",
    supplier: {
      name: supplier?.name ?? "",
      address: supplier?.address ?? "",
      phoneNumber: supplier?.phoneNumber ?? "",
      email: supplier?.email ?? "",
      _id: supplier?._id,
    },
    products:
      api?.products?.map((p) => ({
        productName: p?.productName ?? "",
        price: Number(p?.price ?? 0),
        category: typeof p?.category === "object" ? (p?.category?._id ?? "") : (p?.category ?? ""),
        images: Array.isArray(p?.images) ? p.images : [],
        colors: p?.colors?.map((c: IColor) => ({
          color: c?.color ?? "",
          sizes: c?.sizes?.map((s: ISize) => ({
            size: s?.size ?? "",
            quantity: Number(s?.quantity ?? 0),
          })) ?? [{ size: "", quantity: 0 }],
        })) ?? [
          {
            color: "",
            sizes: [{ size: "", quantity: 0 }],
          },
        ],
      })) ?? emptyFormValues.products,
  };
};

const mapFormToPayload = (values: typeof emptyFormValues) => {
  return {
    purchaseTitle: values.purchaseTitle,
    purchaseType: "APPAREL",
    supplier: (values.supplier as unknown as ISupplier)._id ?? values.supplier,
    products: values.products.map((product) => ({
      productName: product.productName,
      price: Number(product.price),
      category:
        typeof product.category === "object"
          ? (product.category as unknown as ICategory)._id
          : (product.category as string),
      images: product.images,
      colors: product.colors.map((c) => ({
        color: c.color,
        sizes: c.sizes.map((s) => ({
          size: s.size,
          quantity: Number(s.quantity),
        })),
      })),
    })),
  };
};

const ApparelForm = ({ defaultValue }: { defaultValue?: string }) => {
  const purchaseId = defaultValue || "";
  const router = useRouter();

  const [createPurchase, { isLoading: isCreating }] = useCreatePurchaseMutation();
  const [updatePurchase, { isLoading: isUpdating }] = useUpdatePurchaseByIdMutation();

  const {
    data: purchaseRes,
    isLoading: isLoadingPurchase,
    isError: isErrorPurchase,
  } = useGetPurchaseByIdQuery({ purchaseId }, { skip: !purchaseId });

  const isEditing = Boolean(purchaseId);
  const initialValues =
    isEditing && purchaseRes?.data ? mapApiToForm(purchaseRes.data) : emptyFormValues;

  const handleSubmit = async (values: typeof emptyFormValues) => {
    const payload = mapFormToPayload(values);

    if (isEditing) {
      const res = await updatePurchase({ purchaseId, payload });
      const error = res.error as IQueryMutationErrorResponse;
      if (error?.data?.message) {
        toast.error(error.data.message || "Update failed");
        return;
      }
      toast.success("Purchase updated successfully");
    } else {
      const res = await createPurchase(payload);
      const error = res.error as IQueryMutationErrorResponse;
      if (error?.data?.message) {
        toast.error(error.data.message || "Creation failed");
        return;
      }
      toast.success("Purchase created successfully");
    }

    router.push("/purchase-list?type=apparel");
  };

  if (isEditing) {
    if (isLoadingPurchase) return <div className="p-4">Loading purchase...</div>;
    if (isErrorPurchase) return <div className="p-4 text-danger">Failed to load purchase.</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={apparelSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, touched, submitCount }) => (
        <Form className="flex flex-col gap-4">
          {/* Purchase & Supplier Information */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Purchase Information</SectionTitle>

              {/* title */}
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

            {/* Supplier */}
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Supplier Information</SectionTitle>

              {(values.supplier?.name || values.supplier?._id) && (
                <div className="flex flex-col gap-2 p-3 text-sm">
                  <span>
                    <strong>Name:</strong> {values.supplier.name}
                  </span>
                  <div>
                    <strong>Address:</strong> {values.supplier.address}
                  </div>
                  {values.supplier.phoneNumber && (
                    <Link href={`tel:${values.supplier.phoneNumber}`}>
                      <strong>Phone:</strong> {values.supplier.phoneNumber}
                    </Link>
                  )}
                  {values.supplier.email && (
                    <Link href={`mailto:${values.supplier.email}`}>
                      <strong>Email:</strong> {values.supplier.email}
                    </Link>
                  )}
                </div>
              )}

              {/* This component should call setFieldValue("supplier", supplierObjWith_Id) when a supplier is chosen */}
              <AddSupplierOnPurchase setFieldValue={setFieldValue} values={values} />

              {(touched.supplier || submitCount > 0) &&
                !values.supplier?.name &&
                !values.supplier?._id && (
                  <div className="text-sm text-danger">No supplier selected</div>
                )}
            </div>
          </div>

          <HorizontalLine />

          {/* Products */}
          <FieldArray name="products">
            {({ push, remove }) => (
              <>
                {values.products.map((product: IProduct, index: number) => {
                  const totalQty = product?.colors?.reduce(
                    (sum, c) =>
                      sum + (c.sizes?.reduce((s, sz) => s + Number(sz.quantity || 0), 0) || 0),
                    0
                  );

                  return (
                    <div key={index} className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      <div className="flex flex-col gap-4 bg-white p-4">
                        <SectionTitle>Product #{index + 1}</SectionTitle>

                        {/* name */}
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

                        {/* price & category */}
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
                                typeof values?.products[index]?.category === "object"
                                  ? (values?.products[index]?.category as ICategory)?.label
                                  : undefined
                              }
                              onSelect={({ value }) =>
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
                          {({ push: pushColor, remove: removeColor }) => (
                            <div className="mt-4">
                              <SectionTitle>Colors & Sizes #{index + 1}</SectionTitle>

                              {(product.colors ?? []).map((color, colorIndex) => (
                                <div key={colorIndex} className="mt-2 rounded p-4">
                                  {/* color */}
                                  <div className="flex flex-1 flex-col gap-[5px]">
                                    <label className="form-label">Color #{colorIndex + 1}</label>
                                    <div className="flex gap-4">
                                      <Field
                                        as={Input}
                                        name={`products.${index}.colors.${colorIndex}.color`}
                                        placeholder="Color"
                                      />
                                      {colorIndex > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => removeColor(colorIndex)}
                                          className="cursor-pointer text-danger"
                                          aria-label="Remove color"
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
                                    {({ push: pushSize, remove: removeSize }) => (
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
                                                  {szIndex > 0 && (
                                                    <button
                                                      type="button"
                                                      onClick={() => removeSize(szIndex)}
                                                      className="cursor-pointer text-danger"
                                                      aria-label="Remove size"
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
                                          onClick={() => pushSize({ size: "", quantity: 0 })}
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
                                  pushColor({ color: "", sizes: [{ size: "", quantity: 0 }] })
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
                            defaultImages={values.products[index].images}
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
                        productName: "",
                        price: 0,
                        category: "",
                        images: [],
                        colors: [{ color: "", sizes: [{ size: "", quantity: 0 }] }],
                      })
                    }
                  >
                    Add Another Product
                  </Button>
                </div>
              </>
            )}
          </FieldArray>

          <Button
            type="submit"
            isLoading={isCreating || isUpdating}
            className="mt-2"
            disabled={isCreating || isUpdating}
          >
            {isEditing ? "Save Changes" : "Create Purchase"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ApparelForm;
