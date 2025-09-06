"use client";
import { paymentMethodOptions } from "@/constant/paymentMethods";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import ImageUploader from "../shared/ImageUploader";
import SectionTitle from "../shared/SectionTitle";
import SupplierDropdown from "../supplier-list/SupplierDropdown";
import Button from "../ui/Button";
import Input from "../ui/Input";
import PickDate from "../ui/PickDate";
import SelectionBox from "../ui/SelectionBox";
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const initialValues = {
  date: new Date().toISOString(), // string (ISO) like your costingDate
  invoiceBillAmount: 0,
  advancedAmount: 0,
  paymentMethod: "",
  paymentAttachment: "",
  moneyReceipt: "",
  duesAmount: 0,
  supplier: "", // ObjectId string
};

const numberField = (label = "value") =>
  Yup.number()
    .typeError(`${label} must be a number`)
    .min(0, `${label} cannot be negative`)
    .required(`${label} is required`);

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  invoiceBillAmount: numberField("Invoice/Bill amount"),
  advancedAmount: Yup.number()
    .typeError("Advanced amount must be a number")
    .min(0, "Advanced amount cannot be negative")
    .max(Yup.ref("invoiceBillAmount"), "Advanced amount cannot be greater than invoice/bill amount")
    .default(0),
  paymentMethod: Yup.string().required("Payment method is required"),
  paymentAttachment: Yup.string().url("Must be a valid URL").nullable().notRequired().default(""),
  moneyReceipt: Yup.string().nullable().notRequired().default(""),
  duesAmount: numberField("Dues amount"),
  supplier: Yup.string()
    .matches(objectIdRegex, "Invalid supplier id")
    .required("Supplier is required"),
});

const SupplierPaymentForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Payment",
}: {
  isLoading: boolean;
  defaultValue?: Partial<typeof initialValues>;
  onSubmit: (values: typeof initialValues, helpers: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) => {
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
        const inv = Number(values.invoiceBillAmount) || 0;
        const adv = Number(values.advancedAmount) || 0;
        const computed = Math.max(inv - adv, 0);
        if (computed !== values.duesAmount) setFieldValue("duesAmount", computed, false);

        return (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Supplier Payment</SectionTitle>

              <div className="flex items-start gap-[20px]">
                {/* left column */}
                <div className="flex w-full flex-col items-start justify-start gap-[16px]">
                  {/* Supplier */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <SupplierDropdown
                      className="w-full max-w-[unset]"
                      selectionBoxClassName="w-full"
                      onSelect={(option) => setFieldValue("supplier", option.value)}
                    />
                    <ErrorMessage name="supplier" component="div" className="text-sm text-danger" />
                  </div>

                  {/* Date */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Payment Date</label>
                    <Field name="date">
                      {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                    </Field>
                    <ErrorMessage name="date" component="div" className="text-sm text-danger" />
                  </div>

                  {/* Payment Method */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Payment Method</label>
                    <SelectionBox
                      data={paymentMethodOptions}
                      onSelect={(option) => setFieldValue("paymentMethod", option.value)}
                      defaultValue={paymentMethodOptions.find(
                        (opt) => opt.value === values.paymentMethod
                      )}
                      displayValue={
                        paymentMethodOptions.find((opt) => opt.value === values.paymentMethod)
                          ?.label
                      }
                      showSearch={false}
                    />
                    <ErrorMessage
                      name="paymentMethod"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>
                </div>

                {/* right column */}
                <div className="flex w-full flex-col gap-[16px]">
                  {/* Invoice/Bill Amount */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Invoice/Bill Amount</label>
                    <Field
                      as={Input}
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      name="invoiceBillAmount"
                      placeholder="0.00"
                    />
                    <ErrorMessage
                      name="invoiceBillAmount"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* Advanced Amount */}
                  <div className="w/full flex flex-col gap-[5px]">
                    <label className="form-label">Advanced Amount</label>
                    <Field
                      as={Input}
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      name="advancedAmount"
                      placeholder="0.00"
                    />
                    <ErrorMessage
                      name="advancedAmount"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* Dues (read-only) */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Dues Amount</label>
                    <Field as={Input} type="number" name="duesAmount" step="0.01" disabled />
                    <ErrorMessage
                      name="duesAmount"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-[16px] xl:grid-cols-2">
                {/* Money Receipt (optional) */}
                <div>
                  <ImageUploader
                    inputId="money-receipt"
                    mode="single"
                    defaultImages={defaultValue?.moneyReceipt ? [defaultValue.moneyReceipt] : []}
                    onChange={(urls) => setFieldValue("moneyReceipt", urls?.[0] || "")}
                    title="Money Receipt (optional)"
                  />
                  <ErrorMessage
                    name="moneyReceipt"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                <div>k
                  {/* Payment Document (optional) */}
                  <ImageUploader
                    inputId="payment-attachment"
                    mode="single"
                    defaultImages={
                      defaultValue?.paymentAttachment ? [defaultValue.paymentAttachment] : []
                    }
                    onChange={(urls) => setFieldValue("paymentAttachment", urls?.[0] || "")}
                    title="Payment Document (optional)"
                  />
                  <ErrorMessage
                    name="paymentAttachment"
                    component="div"
                    className="text-sm text-danger"
                  />
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

export default SupplierPaymentForm;
