"use client";

import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  AddPartnerOnForm,
  Button,
  Input,
  PickDate,
  SectionTitle,
  SelectionBox,
  TextArea,
} from "@/components";
import dateUtils from "@/utils/date";
import { useCreateInvestmentMutation } from "@/redux/features/investments/investments.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IQueryMutationErrorResponse } from "@/types";

const transactionMethodOptions = [
  { label: "Bkash", value: "Bkash" },
  { label: "Nagad", value: "Nagad" },
  { label: "Bank", value: "Bank" },
  { label: "Cash", value: "Cash" },
  { label: "Cheque", value: "Cheque" },
  { label: "Other", value: "Other" },
];

const initialValues = {
  investmentAmount: 0,
  investmentDate: new Date().toISOString(),
  transactionMethod: "",
  remarks: "",
  description: "",
  partner: {
    _id: "",
    partnerName: "",
    partnerDesignation: "",
    joiningDate: "",
  },
};

const validationSchema = Yup.object({
  investmentAmount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be greater than 1"),
  investmentDate: Yup.string().required("Date is required"),
  remarks: Yup.string().required("Remarks is required"),
  description: Yup.string().required("Description is required"),
  transactionMethod: Yup.string()
    .oneOf(transactionMethodOptions.map((o) => o.value))
    .notRequired(),
  partner: Yup.object({
    _id: Yup.string().required("Select a partner"),
  }).required(),
});

const InvestmentsForm = () => {
  const [createInvestment, { isLoading }] = useCreateInvestmentMutation();
  const router = useRouter();

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    console.log(values);
    const payload = {
      investmentAmount: values.investmentAmount,
      investmentDate: values.investmentDate,
      description: values.description,
      partner: values.partner._id,
      transactionMethod: values.transactionMethod || "",
      remarks: values.remarks || "",
    };

    const res = await createInvestment(payload);

    if (res.error) {
      const error = res.error as IQueryMutationErrorResponse;
      if (error) {
        if (error?.data?.message) {
          toast(error.data?.message);
        } else {
          toast("Something went wrong");
        }

        return;
      }
    } else {
      toast.success("Investment created successfully");
      resetForm();
      router.push("/investments");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, touched, submitCount }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid h-full grid-cols-1 items-stretch gap-4">
            <div className="flex h-full flex-col gap-6 bg-white p-4">
              {/* investment information */}
              <div className="flex flex-col gap-4">
                <SectionTitle>Investment Information</SectionTitle>

                {/* amount, date, transaction method */}
                <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                  {/* investment amount */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Investment Amount</label>
                    <Field as={Input} type="number" name="investmentAmount" placeholder="Amount" />
                    <ErrorMessage
                      name="investmentAmount"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* date picker */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Investment Date</label>
                    <Field name="investmentDate">
                      {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                    </Field>
                    <ErrorMessage
                      name="investmentDate"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>

                  {/* transaction method */}
                  <div className="flex w-full flex-col gap-[5px]">
                    <label className="form-label">Transaction Method</label>
                    <SelectionBox
                      data={transactionMethodOptions}
                      onSelect={(opt) => setFieldValue("transactionMethod", opt.value)}
                      defaultValue={transactionMethodOptions.find(
                        (opt) => opt.value === values.transactionMethod
                      )}
                      displayValue={
                        transactionMethodOptions.find(
                          (opt) => opt.value === values.transactionMethod
                        )?.label
                      }
                      showSearch={false}
                    />
                    <ErrorMessage
                      name="transactionMethod"
                      component="div"
                      className="text-sm text-danger"
                    />
                  </div>
                </div>

                {/* description */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Description</label>
                  <Field as={TextArea} name="description" placeholder="Description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>
                {/* remarks */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Remarks</label>
                  <Field as={TextArea} name="remarks" placeholder="Remarks" />
                  <ErrorMessage name="remarks" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* partner information */}
              <div className="flex flex-col gap-4">
                <SectionTitle>Partner Information</SectionTitle>

                {!values.partner.partnerName && (
                  <AddPartnerOnForm setFieldValue={setFieldValue} values={values} />
                )}

                {values.partner.partnerName && (
                  <div className="flex flex-col gap-2 p-3 text-sm">
                    <div>
                      <strong>Names:</strong> {values.partner.partnerName}
                    </div>
                    <div>
                      <strong>Designation:</strong> {values.partner.partnerDesignation}
                    </div>
                    <div>
                      <strong>Joining Date:</strong>{" "}
                      {dateUtils.formatDate(values.partner.joiningDate)}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFieldValue("partner", initialValues.partner)}
                      className="w-fit cursor-pointer bg-primary px-2 py-1 text-white"
                    >
                      Remove Partner
                    </button>
                  </div>
                )}

                {/* error if no partner added */}
                {(touched.partner || submitCount > 0) && !values.partner?.partnerName && (
                  <div className="text-sm text-danger">No partner selected</div>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} className="mt-2">
            Create Investment
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default InvestmentsForm;
