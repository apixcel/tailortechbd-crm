"use client";

import { useLoginUserMutation } from "@/redux/features/user/user.api";
import { setToken, setUser } from "@/redux/features/user/user.slice";
import { IQueryMutationErrorResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/hooks";

import { IFormMessage } from "../ui/FormMessage";
import { Button, Input, FormMessage } from "@/components";

const initialValues = { email: "", password: "" };

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email address"),
  password: yup.string().required("Password is required"),
});

const EmailLogin = () => {
  const [login, { isLoading }] = useLoginUserMutation(undefined);
  const [formMessage, setFormMessage] = useState<IFormMessage | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (values: typeof initialValues) => {
    setFormMessage(null);
    const res = await login({
      ...values,
      mode: "email",
    });
    console.log(res);
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      if (error.data?.message) {
        setFormMessage({ message: error.data.message, type: "error" });
      } else {
        setFormMessage({ message: "Something went wrong", type: "error" });
      }
      return;
    }

    const user = res.data?.data.result;
    console.log(user, "from user after login");
    const token = res.data?.data.accessToken;
    console.log(token, "from token after login");

    if (user) {
      dispatch(setUser(user));
    }

    if (token) {
      dispatch(setToken(token));
    }
    const redirect = "/";
    Cookies.remove("redirect");
    setFormMessage(null);

    router.replace(redirect);
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
