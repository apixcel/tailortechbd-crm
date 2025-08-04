"use client";

import * as Yup from "yup";
import { Input, Button, SectionTitle, PickDate, SelectionBox, TextArea } from "@/components";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useCreateCapitalMutation } from "@/redux/features/capital/capital.api";
import { ICapitalPayload, IQueryMutationErrorResponse } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const capitalsStatusOptions = [
  { label: "Credit", value: "credit" },
  { label: "Debit", value: "debit" },
];

const initialValues = {
  amount: 0,
  date: new Date().toISOString(),
  type: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required").min(1, "Amount must be >= 1"),
  date: Yup.string().required("Date is required"),
  type: Yup.string().required("Type is required"),
  description: Yup.string().required("Description is required"),
});

const CapitalsForm = () => {
  const [createCapitals, { isLoading }] = useCreateCapitalMutation();
  const router = useRouter();

  const handleSubmit = async (values: ICapitalPayload) => {
    const res = await createCapitals(values);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success("Capitals created successfully");
    router.push("/capitals");
  };

  return (
    <Formik
      initialValues={initialValues as ICapitalPayload}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex h-full flex-col gap-6 bg-white p-4">
            <div className="flex flex-col gap-4">
              <SectionTitle>Capital Information</SectionTitle>
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* amount */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Capital Amount</label>
                  <Field as={Input} type="number" name="amount" placeholder="Amount" />
                  <ErrorMessage name="amount" component="div" className="text-sm text-danger" />
                </div>

                {/* date */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Date</label>
                  <Field name="date">
                    {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                  </Field>
                  <ErrorMessage name="date" component="div" className="text-sm text-danger" />
                </div>

                {/* type */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className="form-label">Type</label>
                  <SelectionBox
                    data={capitalsStatusOptions}
                    onSelect={(option) => setFieldValue("type", option.value)}
                    defaultValue={capitalsStatusOptions.find((opt) => opt.value === values.type)}
                    displayValue={
                      capitalsStatusOptions.find((opt) => opt.value === values.type)?.label
                    }
                    showSearch={false}
                  />
                  <ErrorMessage name="type" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* description */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Description</label>
                <Field as={TextArea} name="description" placeholder="Description" />
                <ErrorMessage name="description" component="div" className="text-sm text-danger" />
              </div>
            </div>
          </div>
          <Button type="submit" isLoading={isLoading} className="mt-2">
            Create Capital
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CapitalsForm;
