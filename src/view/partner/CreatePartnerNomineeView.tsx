"use client";
import {
  Button,
  ImageUploader,
  Input,
  PageHeadingTitle,
  SectionTitle,
  SelectionBox,
  TextArea,
} from "@/components";
import { relationOptions } from "@/constant/relationship";
import { useCratePartnerNomineeMutation } from "@/redux/features/partners/partner.api";
import { IQueryMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
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
});

const initialValues = {
  fullName: "",
  relationWithPartner: "",
  phoneNumber: "",
  email: "",
  address: "",
  sharePercentage: 0,
  attachment: "",
};
const CreatePartnerNomineeView = () => {
  const [createNominee, { isLoading }] = useCratePartnerNomineeMutation();

  const params = useParams();

  const router = useRouter();

  const handleCreateNominee = async (payload: typeof initialValues) => {
    const res = await createNominee({ ...payload, partner: params.id as string });
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error.data?.message || "Something went wrong");
      return;
    }
    toast.success("Nominee created successfully");
    router.push(`/partner-list/nominee/${params.id}`);
  };

  return (
    <div>
      <PageHeadingTitle title="Create Nominee" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateNominee}
      >
        {({ setFieldValue }) => (
          <Form className="mt-[20px] flex flex-col gap-4 bg-white p-4">
            <SectionTitle>Nominee Information</SectionTitle>

            {/* Nominee details in two columns */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-[5px]">
                <label className="form-label">Full Name</label>
                <Field as={Input} name={`fullName`} placeholder="Full Name" />
                <ErrorMessage name={`fullName`} component="div" className="text-sm text-danger" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="form-label">Relation with Partner</label>
                <SelectionBox
                  data={relationOptions}
                  onSelect={(opt) => setFieldValue(`relationWithPartner`, opt.value)}
                  showSearch={false}
                />
                <ErrorMessage
                  name={`relationWithPartner`}
                  component="div"
                  className="text-sm text-danger"
                />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="form-label">Phone Number</label>
                <Field as={Input} name={`phoneNumber`} placeholder="Phone Number" />
                <ErrorMessage
                  name={`phoneNumber`}
                  component="div"
                  className="text-sm text-danger"
                />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="form-label">Email</label>
                <Field as={Input} name={`email`} placeholder="Email" />
                <ErrorMessage name={`email`} component="div" className="text-sm text-danger" />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="form-label">Share Percentage</label>
                <Field
                  as={Input}
                  name={`sharePercentage`}
                  placeholder="Share Percentage"
                  type="number"
                />
                <ErrorMessage
                  name={`sharePercentage`}
                  component="div"
                  className="text-sm text-danger"
                />
              </div>

              <div className="flex flex-col gap-[5px] lg:col-span-2">
                <label className="form-label">Address</label>
                <Field
                  as={TextArea}
                  name={`address`}
                  placeholder="Address"
                  className="min-h-[150px]"
                />
                <ErrorMessage name={`address`} component="div" className="text-sm text-danger" />
              </div>

              <div className="flex flex-col gap-[5px] lg:col-span-2">
                <label className="form-label">Attachment (Document)</label>
                <p className="text-[12px] text-muted">
                  Govment ID/Passport/Birt Certificate/Othe verificaton documents.
                </p>
                <ImageUploader
                  mode="single"
                  title=""
                  acceptPDF
                  onChange={(url) => {
                    setFieldValue(`attachment`, url ? url[0] || "" : "");
                  }}
                />
                <ErrorMessage name={`attachment`} component="div" className="text-sm text-danger" />
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="mt-2">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePartnerNomineeView;
