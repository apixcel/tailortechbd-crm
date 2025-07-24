"use client";

import { useAppDispatch } from "@/hooks/redux";
import { ICountry } from "@/hooks/useCountries";
import { useLoginAdminMutation } from "@/redux/features/admin/admin.api";
import { setToken, setUser } from "@/redux/features/user/user.slice";
import { IQueruMutationErrorResponse } from "@/types";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";
import Button from "../ui/Button";
import Input from "../ui/Input";
import FormMessage, { IFormMessage } from "../ui/FormMessage";
import RoleDropdown from "./RoleDropdown";

const initialValues = { phoneNumber: "", password: "", role: "" };

const validationSchema = yup.object({
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup.string().required("Password is required"),
  role: yup
    .string()
    .oneOf(["admin", "superAdmin"], "Role is required")
    .required("Role is required"),
});

const PhoneNumberLogin = () => {
  const [country, setCountry] = useState<ICountry>();

  const [login, { isLoading }] = useLoginAdminMutation(undefined);
  const [formMessage, setFormMessage] = useState<IFormMessage | null>(null);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSubmit = async (
    values: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    setFormMessage(null);
    // const phone = `${country?.dial_code}${values.phoneNumber}`;

    // if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
    //   helper.setFieldError("phoneNumber", "* Invalid phone number");
    //   return;
    // }

    // const res = await login({
    //   ...values,
    //   phoneNumber: phone,
    //   mode: "phoneNumber",
    // });
    // const redirect = "/dashboard";
    // Cookies.remove("redirect");

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

    // setFormMessage(null);
    // router.replace(redirect);

    console.log(values);
  };
  return (
    <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
      {({ touched, errors }) => (
        <Form className="flex w-full flex-col gap-[16px]">
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

export default PhoneNumberLogin;
