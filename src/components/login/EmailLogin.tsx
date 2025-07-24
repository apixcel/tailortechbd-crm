"use client";

import { useLoginAdminMutation } from "@/redux/features/admin/admin.api";
import { setToken, setUser } from "@/redux/features/user/user.slice";
import { IQueruMutationErrorResponse } from "@/types";
import { Field, FieldProps, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Button from "../ui/Button";
import FormMessage, { IFormMessage } from "../ui/FormMessage";
import Input from "../ui/Input";
import RoleDropdown from "./RoleDropdown";
const initialValues = { email: "", password: "", role: "" };
const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email address"),
  password: yup.string().required("Password is required"),
  role: yup
    .string()
    .oneOf(["admin", "superAdmin"], "Role is required")
    .required("Role is required"),
});

const EmailLogin = () => {
  const [login, { isLoading }] = useLoginAdminMutation(undefined);
  const [formMessage, setFormMessage] = useState<IFormMessage | null>(null);

  const dispatch = useDispatch();

  const router = useRouter();
  const onSubmit = async (values: typeof initialValues) => {
    // setFormMessage(null);
    // const res = await login({
    //   ...values,
    //   mode: "email",
    // });
    // const error = res.error as IQueruMutationErrorResponse;

    // if (error) {
    //   if (error.data?.message) {
    //     setFormMessage({ message: error.data.message, type: "error" });
    //   } else {
    //     setFormMessage({ message: "Something went wrong", type: "error" });
    //   }
    //   return;
    // }

    // const user = res.data?.data.result;
    // const token = res.data?.data.accessToken;

    // if (user) {
    //   dispatch(setUser(user));
    // }

    // if (token) {
    //   dispatch(setToken(token));
    // }
    // const redirect = "/dashboard";
    // Cookies.remove("redirect");
    // setFormMessage(null);

    // router.replace(redirect);
    console.log(values);
  };
  return (
    <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
      {({ touched, errors }) => (
        <Form className="flex w-full flex-col gap-[16px]">
          <div className="flex flex-col gap-[5px]">
            <Field type="email" name="email" placeholder="Enter Your Email Address" as={Input} />

            {touched.email && errors.email && (
              <span className="text-[12px] text-danger">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-[5px]">
            <Field name="role">
              {({ field, form }: FieldProps) => (
                <>
                  <RoleDropdown
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "Super Admin", value: "superAdmin" },
                    ]}
                    selected={field.value}
                    onChange={(val) => form.setFieldValue("role", val)}
                  />
                  {typeof form.errors.role === "string" && form.touched.role && (
                    <span className="text-[12px] text-danger">{form.errors.role}</span>
                  )}
                </>
              )}
            </Field>
          </div>

          <div className="flex flex-col gap-[5px]">
            <Field type="password" name="password" placeholder="Enter Your Password" as={Input} />

            {touched.password && errors.password && (
              <span className="text-[12px] text-danger">{errors.password}</span>
            )}
          </div>

          <FormMessage formMessage={formMessage} />
          <Button isLoading={isLoading} type="submit" className="w-full">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EmailLogin;
