"use client";

import { CreatePartnerDedicationPayload } from "@/types";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import ImageUploader from "../shared/ImageUploader";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import PickDate from "../ui/PickDate";

const initialValues = {
  partnerName: "",
  workType: "",
  time: 0,
  date: new Date().toISOString(),
  comment: "",
  attachment: "",
};

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  workType: Yup.string().required("Work type is required"),
  time: Yup.number().required("Time is required").min(0, "Time must be >= 0"),
  date: Yup.string().required("Date is required"),
  comment: Yup.string().required("Comment is required"),
  attachment: Yup.string().required("Attachment is required"),
});

const labelClass = "text-[12px] font-semibold text-black";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-dashboard/10 px-4 py-2">
    <span className="text-lg font-bold text-dashboard">{children}</span>
  </div>
);

const PartnerDedicationForm = ({
  isLoading = false,
  onSubmit,
  buttonLabel = "Create Partner Dedication",
  defaultValue,
}: {
  isLoading: boolean;
  onSubmit: (
    values: CreatePartnerDedicationPayload,
    formikHelpers: FormikHelpers<CreatePartnerDedicationPayload>
  ) => void;
  buttonLabel?: string;
  defaultValue?: CreatePartnerDedicationPayload;
}) => {
  const initialValues = defaultValue ?? {
    partnerName: "",
    workType: "",
    time: 0,
    date: new Date().toISOString(),
    comment: "",
    attachment: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values, {} as FormikHelpers<typeof initialValues>);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Partner Dedication Information</SectionTitle>

              {/* partner name and total Profit amount */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                {/* partner name */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Partner Name</label>
                  <Field as={Input} name="partnerName" placeholder="Partner name" />
                  <ErrorMessage
                    name="partnerName"
                    component="div"
                    className="text-sm text-danger"
                  />
                </div>

                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Work Type</label>
                  <Field as={Input} name="workType" placeholder="Work type" />
                  <ErrorMessage name="workType" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* Working time and date */}
              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Time (hours)</label>
                  <Field as={Input} type="number" name="time" placeholder="Time" />
                  <ErrorMessage name="time" component="div" className="text-sm text-danger" />
                </div>

                {/* date picker */}
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Date</label>
                  <Field name="date">
                    {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                  </Field>
                  <ErrorMessage name="date" component="div" className="text-sm text-danger" />
                </div>
              </div>

              {/* comment */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className={labelClass}>Comment</label>
                <Field as={TextArea} name="comment" placeholder="Comment" rows={4} />
                <ErrorMessage name="comment" component="div" className="text-sm text-danger" />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-white p-4">
              <SectionTitle>Attachment</SectionTitle>
              <div>
                <ImageUploader
                  inputId="investment-attachment"
                  mode="single"
                  onChange={(urls) => setFieldValue("attachment", urls?.[0] || "")}
                  title="Upload Attachment"
                  acceptPDF
                />
                <ErrorMessage name="attachment" component="div" className="text-sm text-danger" />
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

export default PartnerDedicationForm;
