"use client";

import { ErrorMessage, Field, FieldArray, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  Button,
  ImageUploader,
  Input,
  PickDate,
  SectionTitle,
  SelectionBox,
  TextArea,
} from "@/components";
import { relationOptions } from "@/constant/relationship";
import { IPartnerNominee } from "@/types";

const initialValues = {
  partnerName: "",
  partnerDesignation: "",
  joiningDate: new Date().toISOString(),
  nominees: [] as IPartnerNominee[],
};

export type PartnerFormValues = typeof initialValues;

const validationSchema = Yup.object().shape({
  partnerName: Yup.string().required("Partner name is required"),
  partnerDesignation: Yup.string().required("Designation is required"),
  joiningDate: Yup.string().required("Date is required"),
  nominees: Yup.array()
    .of(
      Yup.object().shape({
        fullName: Yup.string().required("Full name is required"),
        relationWithPartner: Yup.string().required("Relation with partner is required"),
        phoneNumber: Yup.string().required("Phone number is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        address: Yup.string().required("Address is required"),
        sharePercentage: Yup.number()
          .required("Share percentage is required")
          .min(0, "Share percentage must be between 0 and 100")
          .max(100, "Share percentage must be between 0 and 100"),
        attachment: Yup.string().required("Attachment is required"),
      })
    )
    .max(3, "You can add a maximum of 3 nominees"),
});

const PartnerForm = ({
  isLoading = false,
  defaultValue,
  onSubmit,
  buttonLabel = "Create Partner",
}: {
  isLoading: boolean;
  defaultValue?: PartnerFormValues;
  onSubmit: (values: PartnerFormValues, { resetForm }: FormikHelpers<PartnerFormValues>) => void;
  buttonLabel?: string;
}) => {
  return (
    <Formik
      initialValues={defaultValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values, {} as FormikHelpers<PartnerFormValues>);
      }}
    >
      {({ setFieldValue, values, touched, submitCount }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-white p-4">
            <SectionTitle>Partner Information</SectionTitle>

            {/* partner name and designation */}
            <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
              {/* partner name */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Partner Name</label>
                <Field as={Input} name="partnerName" placeholder="Partner name" />
                <ErrorMessage name="partnerName" component="div" className="text-sm text-danger" />
              </div>

              {/* designation */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Designation</label>
                <Field as={Input} name="partnerDesignation" placeholder="Designation" />
                <ErrorMessage
                  name="partnerDesignation"
                  component="div"
                  className="text-sm text-danger"
                />
              </div>

              {/* joining date */}
              <div className="flex w-full flex-col gap-[5px]">
                <label className="form-label">Joining Date</label>
                <Field name="joiningDate">
                  {(fieldProps: FieldProps) => <PickDate {...fieldProps} />}
                </Field>
                <ErrorMessage name="joiningDate" component="div" className="text-sm text-danger" />
              </div>
            </div>

            {/* Nominee Information */}
            <SectionTitle>Nominee Information</SectionTitle>
            <FieldArray
              name="nominees"
              render={(arrayHelpers) => (
                <div>
                  {values.nominees.map((nominee, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="text-lg font-bold">Nominee {index + 1}</h4>

                      {/* Nominee details in two columns */}
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="flex flex-col gap-[5px]">
                          <label className="form-label">Full Name</label>
                          <Field
                            as={Input}
                            name={`nominees[${index}].fullName`}
                            placeholder="Full Name"
                          />
                          <ErrorMessage
                            name={`nominees[${index}].fullName`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <label className="form-label">Relation with Partner</label>
                          <SelectionBox
                            data={relationOptions}
                            onSelect={(opt) =>
                              setFieldValue(`nominees[${index}].relationWithPartner`, opt.value)
                            }
                            defaultValue={relationOptions.find(
                              (opt) => opt.value === values.nominees[index].relationWithPartner
                            )}
                            displayValue={
                              relationOptions.find(
                                (opt) => opt.value === values.nominees[index].relationWithPartner
                              )?.label
                            }
                            showSearch={false}
                          />
                          <ErrorMessage
                            name={`nominees[${index}].relationWithPartner`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <label className="form-label">Phone Number</label>
                          <Field
                            as={Input}
                            name={`nominees[${index}].phoneNumber`}
                            placeholder="Phone Number"
                          />
                          <ErrorMessage
                            name={`nominees[${index}].phoneNumber`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <label className="form-label">Email</label>
                          <Field as={Input} name={`nominees[${index}].email`} placeholder="Email" />
                          <ErrorMessage
                            name={`nominees[${index}].email`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>

                        <div className="flex flex-col gap-[5px]">
                          <label className="form-label">Share Percentage</label>
                          <Field
                            as={Input}
                            name={`nominees[${index}].sharePercentage`}
                            placeholder="Share Percentage"
                            type="number"
                          />
                          <ErrorMessage
                            name={`nominees[${index}].sharePercentage`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>

                        <div className="flex flex-col gap-[5px] lg:col-span-2">
                          <label className="form-label">Address</label>
                          <Field
                            as={TextArea}
                            name={`nominees[${index}].address`}
                            placeholder="Address"
                            className="min-h-[150px]"
                          />
                          <ErrorMessage
                            name={`nominees[${index}].address`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>

                        <div className="flex flex-col gap-[5px] lg:col-span-2">
                          <label className="form-label">Attachment (Document)</label>
                          <p className="text-[12px] text-muted">
                            Govment ID/Passport/Birt Certificate/Othe verificaton documents.
                          </p>
                          <ImageUploader
                            defaultImages={
                              values.nominees[index].attachment
                                ? [values.nominees[index].attachment]
                                : []
                            }
                            mode="single"
                            title=""
                            acceptPDF
                            onChange={(url) => {
                              setFieldValue(
                                `nominees[${index}].attachment`,
                                url ? url[0] || "" : ""
                              );
                            }}
                          />
                          <ErrorMessage
                            name={`nominees[${index}].attachment`}
                            component="div"
                            className="text-sm text-danger"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button
                          className="bg-danger"
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove Nominee {index + 1}
                        </Button>
                      </div>
                    </div>
                  ))}
                  {/* Add new nominee button */}
                  {values.nominees.length < 3 && (
                    <Button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          nomineeId: "",
                          fullName: "",
                          relationWithPartner: "",
                          phoneNumber: "",
                          email: "",
                          address: "",
                          sharePercentage: 0,
                          attachment: "",
                        })
                      }
                    >
                      Add Nominee
                    </Button>
                  )}
                </div>
              )}
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="mt-2">
            {buttonLabel}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PartnerForm;
