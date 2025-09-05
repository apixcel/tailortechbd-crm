import Button from "@/components/ui/Button";
import CountrySelector from "@/components/ui/CountrySelector";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Input from "@/components/ui/Input";
import { ICountry } from "@/hooks";
// import { useCreateSuperAdminMutation } from "@/redux/features/role/role.api";
// import { IQueruMutationErrorResponse } from "@/types";
import { IUser } from "@/types/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),

  phoneNumber: Yup.string().required("Phone number is required"),

  email: Yup.string().email("Invalid email address"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const initialValues = {
  fullName: "",
  phoneNumber: "",
  email: "",
  password: "",
};
const CreateSuperAdmin = () => {
  const [country, setCountry] = useState<ICountry>();
  const [isOpen, setIsOpen] = React.useState(false);

  // const [createSuperAdmin, { isLoading }] = useCreateSuperAdminMutation();

  const handleSubmit = async (values: typeof initialValues) => {
    const payload = {
      ...values,
      email: values.email || undefined,
      phoneNumber: `${country?.dial_code}${values.phoneNumber}`,
      geo_profile: { country: country?.name || "", phone_code: country?.dial_code || "" },
    };
    // const res = await createSuperAdmin(payload as IUser);
    // const error = res.error as IQueruMutationErrorResponse;

    // if (error) {
    //   if (error.data?.message) {
    //     toast.error(error.data?.message);
    //   } else {
    //     toast.error("Something went wrong");
    //   }
    //   return;
    // }
    // toast.success("Super Admin created successfully");
    // setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Super Admin</Button>
      <DialogProvider state={isOpen} setState={setIsOpen} className="w-[95vw] md:w-[600px]">
        <div className="w-full bg-white">
          <div className="flex w-full flex-col gap-4 p-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-start text-2xl font-semibold">Create Super Admin</h2>
              <p className="text-muted">Creating a new super admin can be done here</p>
            </div>
            <HorizontalLine className="w-full" />

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="font-medium text-primary">
                      Full Name
                    </label>
                    <Field
                      as={Input}
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="border-primary/20 focus:border-primary"
                      placeholder="Enter full name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-sm font-medium text-danger"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="font-medium text-primary">
                      Phone Number
                    </label>
                    <CountrySelector onCountrySelect={(c) => setCountry(c)} />
                    <div className="flex flex-col gap-[5px]">
                      <div className="flex items-center justify-start gap-0">
                        <span className="border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                          {country?.dial_code || "+880"}
                        </span>
                        <Field
                          type="number"
                          name="phoneNumber"
                          placeholder="Enter Your Mobile Number"
                          as={Input}
                        />
                      </div>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <span className="text-[12px] text-danger">{errors.phoneNumber}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="font-medium text-primary">
                      Email <span className="text-muted-foreground">(Optional)</span>
                    </label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      className="border-primary/20 focus:border-primary"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm font-medium text-danger"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="font-medium text-primary">
                      Password
                    </label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      className="border-primary/20 focus:border-primary"
                      placeholder="Enter password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm font-medium text-danger"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 bg-danger hover:bg-danger/90"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 hover:bg-primary/90"
                      // isLoading={isLoading}
                    >
                      Create Super Admin
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default CreateSuperAdmin;
