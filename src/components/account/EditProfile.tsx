"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppSelector } from "@/hooks/redux";
import { useUpdateProfileMutation } from "@/redux/features/user/user.api";
import { IQueryMutationErrorResponse } from "@/types";
import { IUser } from "@/types/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("* Full name is required"),
  email: Yup.string().email("Invalid email").optional(),
});
const EditProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const splitDialCode = () => {
    let phoneNumber = user?.phoneNumber || "";
    const dialCode = user?.geo_profile?.phone_code || "+880";
    phoneNumber = phoneNumber.replace(dialCode, "");
    return { dialCode, phoneNumber };
  };

  const { dialCode, phoneNumber } = splitDialCode();

  const initialValues = {
    fullName: user?.fullName || "",
    email: user?.email || "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const payload: Partial<IUser> = {
      fullName: values.fullName,
      email: values.email || undefined,
    };

    const res = await updateProfile(payload);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }

    toast.success("Profile updated successfully");
  };

  return (
    <div className="flex w-full flex-col gap-[16px] border-[1px] border-border-main p-[10px]">
      <h4 className="text-[16px] font-[700] text-strong">Account Information</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <div className="grid grid-cols-1 gap-[8px] sm:grid-cols-2">
            {/* Full Name */}
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Full Name</label>
              <Field name="fullName" as={Input} placeholder="Enter your full name" />
              <ErrorMessage name="fullName" component="div" className="text-[12px] text-red-500" />
            </div>

            {/* Phone Number */}
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Phone No.</label>
              <div className="flex items-center justify-start gap-0">
                <span className="border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                  {dialCode}
                </span>
                <Input
                  value={phoneNumber}
                  disabled
                  type="string"
                  name="phoneNumber"
                  className="bg-solid-slab"
                  placeholder="Enter Your Mobile Number"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Email</label>
              <Field
                disabled={!!user?.email}
                name="email"
                as={Input}
                placeholder="Enter your email"
                className={user?.email ? "bg-solid-slab" : ""}
              />
              <ErrorMessage name="email" component="div" className="text-[12px] text-red-500" />
            </div>
          </div>

          {/* <FormMessage formMessage={formMessage} /> */}
          <Button isLoading={isLoading} type="submit" className="mt-[16px] bg-primary">
            Update Information
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfile;
