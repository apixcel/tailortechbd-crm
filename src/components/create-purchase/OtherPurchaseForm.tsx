"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import HorizontalLine from "../ui/HorizontalLine";
import AddSupplierOnPurchase from "../create-supplier/AddSupplierOnPurchase";
import SectionTitle from "../shared/SectionTitle";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  useCreatePurchaseMutation,
  useGetPurchaseByIdQuery,
  useUpdatePurchaseByIdMutation,
} from "@/redux/features/purchase/purchase.api";
import { IPurchase, IQueryMutationErrorResponse, ISupplier } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const otherProductSchema = Yup.object({
  productName: Yup.string().required("Product name is required"),
  brand: Yup.string().required("Brand is required"),
  model: Yup.string().required("Model is required"),
  sn: Yup.string().required("SN is required"),
  quantity: Yup.number().required("Quantity is required").min(1, "Quantity must be at least 1"),
  price: Yup.number().required("Price is required").min(1, "Price must be at least 1"),
});

const formSchema = Yup.object({
  purchaseTitle: Yup.string().required("Title is required"),
  supplier: Yup.object({
    _id: Yup.string().notRequired(),
    name: Yup.string().when("_id", {
      is: (id: string | undefined) => !id,
      then: (s) => s.required("Supplier name is required"),
      otherwise: (s) => s.notRequired(),
    }),
    address: Yup.string().when("_id", {
      is: (id: string | undefined) => !id,
      then: (s) => s.required("Supplier address is required"),
      otherwise: (s) => s.notRequired(),
    }),
    phoneNumber: Yup.string().when("_id", {
      is: (id: string | undefined) => !id,
      then: (s) => s.required("Supplier phone is required"),
      otherwise: (s) => s.notRequired(),
    }),
    email: Yup.string()
      .email("Invalid email")
      .when("_id", {
        is: (id: string | undefined) => !id,
        then: (s) => s.required("Supplier email is required"),
        otherwise: (s) => s.notRequired(),
      }),
  }),
  products: Yup.array().min(1, "At least one product is required").of(otherProductSchema),
});

type OtherPurchaseFormProps = {
  defaultValue?: string;
  type: "IT" | "ELECTRONIC" | "CIVIL" | "ELECTRICAL";
};

const OtherPurchaseForm = ({ defaultValue, type }: OtherPurchaseFormProps) => {
  const emptyFormValues = {
    purchaseTitle: "",
    purchaseType: type as OtherPurchaseFormProps["type"],
    supplier: {
      _id: undefined as string | undefined,
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
    },
    products: [
      {
        productName: "",
        brand: "",
        model: "",
        sn: "",
        quantity: 0,
        price: 0,
      },
    ],
  };
  type FormValues = typeof emptyFormValues;

  const mapApiToForm = (api: IPurchase): FormValues => {
    const supplier = api?.supplier;
    return {
      purchaseTitle: api?.purchaseTitle ?? "",
      purchaseType: type,
      supplier: {
        _id: supplier._id,
        name: supplier?.name ?? "",
        address: supplier?.address ?? "",
        phoneNumber: supplier?.phoneNumber ?? "",
        email: supplier?.email ?? "",
      },
      products:
        api?.products?.map((p) => ({
          productName: p?.productName ?? "",
          brand: p.brand ?? "",
          model: p.model ?? "",
          sn: p.sn ?? "",
          quantity: Number(p.quantity ?? 0),
          price: Number(p.price ?? 0),
        })) ?? emptyFormValues.products,
    };
  };

  const mapFormToPayload = (values: FormValues) => {
    return {
      purchaseTitle: values.purchaseTitle,
      purchaseType: values.purchaseType,
      supplier: (values.supplier as unknown as ISupplier)._id ?? values.supplier,
      products: values.products.map((product) => ({
        productName: product.productName,
        brand: product.brand,
        model: product.model,
        sn: product.sn,
        quantity: Number(product.quantity),
        price: Number(product.price),
      })),
    };
  };

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

  const initialValues = useMemo<FormValues>(() => {
    if (isEditing && purchaseRes?.data) return mapApiToForm(purchaseRes.data);
    return emptyFormValues;
  }, [isEditing, purchaseRes?.data, type]);

  const handleSubmit = async (values: FormValues) => {
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

    const listType = values.purchaseType?.toLowerCase?.() || "it";
    router.push(`/purchase-list?type=${listType}`);
  };

  if (isEditing && isErrorPurchase) {
    return (
      <div className="p-4 text-danger">
        Failed to load purchase data. Please refresh or try again.
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, touched, submitCount, isSubmitting }) => {
        const submitting = isSubmitting || isCreating || isUpdating;
        return (
          <Form className="flex flex-col gap-4">
            {/* Purchase & Supplier Information */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="flex flex-col gap-4 bg-white p-4">
                <SectionTitle>Purchase Information</SectionTitle>

                {/* purchase title */}
                <div className="flex flex-col gap-[5px]">
                  <label className="form-label">Purchase Title</label>
                  <Field
                    as={Input}
                    name="purchaseTitle"
                    placeholder="Enter title"
                    disabled={isLoadingPurchase || submitting}
                  />
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

                {(values.supplier?._id || values.supplier?.name) && (
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

                <AddSupplierOnPurchase setFieldValue={setFieldValue} values={values} />

                {(touched.supplier || submitCount > 0) &&
                  !values.supplier?._id &&
                  !values.supplier?.name && (
                    <div className="text-sm text-danger">No supplier selected</div>
                  )}
              </div>
            </div>

            <HorizontalLine />

            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>{type} Product Information</SectionTitle>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div className="flex flex-col gap-4">
                  {/* product name */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="form-label">Product Name</label>
                    <Field
                      as={Input}
                      name="products[0].productName"
                      placeholder="Enter product name"
                      disabled={isLoadingPurchase || submitting}
                    />
                    <ErrorMessage
                      name="products[0].productName"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* model */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="form-label">Model</label>
                    <Field
                      as={Input}
                      name="products[0].model"
                      placeholder="Enter model"
                      disabled={isLoadingPurchase || submitting}
                    />
                    <ErrorMessage
                      name="products[0].model"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* quantity */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="form-label">Quantity</label>
                    <Field
                      as={Input}
                      type="number"
                      name="products[0].quantity"
                      placeholder="Enter quantity"
                      disabled={isLoadingPurchase || submitting}
                    />
                    <ErrorMessage
                      name="products[0].quantity"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* brand */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="form-label">Brand</label>
                    <Field
                      as={Input}
                      name="products[0].brand"
                      placeholder="Enter brand"
                      disabled={isLoadingPurchase || submitting}
                    />
                    <ErrorMessage
                      name="products[0].brand"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* sn */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="form-label">SN</label>
                    <Field
                      as={Input}
                      name="products[0].sn"
                      placeholder="Enter sn"
                      disabled={isLoadingPurchase || submitting}
                    />
                    <ErrorMessage
                      name="products[0].sn"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* price */}
                  <div className="flex flex-col gap-[5px]">
                    <label className="form-label">Price</label>
                    <Field
                      as={Input}
                      type="number"
                      name="products[0].price"
                      placeholder="Enter price"
                      disabled={isLoadingPurchase || submitting}
                    />
                    <ErrorMessage
                      name="products[0].price"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                isLoading={submitting}
                className="mt-2 w-full"
                disabled={submitting}
              >
                {isEditing ? "Update Purchase" : "Create Purchase"}
              </Button>
              {isLoadingPurchase && (
                <span className="text-muted-foreground text-sm">Loading purchase…</span>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OtherPurchaseForm;
