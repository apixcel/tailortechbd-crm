"use client";

import { ROLE_ACTIONS } from "@/constants/roleAction";
import { useAppSelector } from "@/hooks";
import { useCreateRoleMutation } from "@/redux/features/role/role.api";
import { IQueryMutationErrorResponse } from "@/types";
import { hasPermission } from "@/utils/role";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { toast } from "sonner";
import * as Yup from "yup";
import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";

// Validation schema
const RoleSchema = Yup.object({
  name: Yup.string()
    .min(2, "Role name must be at least 2 characters")
    .max(50, "Role name must be less than 50 characters")
    .required("Role name is required"),
});

const initialValues = {
  name: "",
};

const CreateRole = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [createRole, { isLoading }] = useCreateRoleMutation();

  const { role: myRole } = useAppSelector((state) => state.user);

  const hasAccess = hasPermission(ROLE_ACTIONS.MANAGE_ROLES.value, myRole);

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await createRole(values);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success("Role created successfully");
    setIsOpen(false);
  };

  if (!hasAccess) return <></>;

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <GrUserSettings className="mr-2" />
        Create role
      </Button>

      <DialogProvider state={isOpen} setState={setIsOpen} className="w-full max-w-[700px]">
        <div className="bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Create a New Role</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={RoleSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block font-medium">
                  Role Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Enter role name"
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-danger" />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-danger text-white"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Role"}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </DialogProvider>
    </>
  );
};

export default CreateRole;
