"use client";

import { useGetAllSuppliersQuery } from "@/redux/features/supplier/supplier.api";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import { ISupplier } from "@/types";

import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";

import { FaPlus } from "react-icons/fa";
import { LuX } from "react-icons/lu";
import { RxMagnifyingGlass } from "react-icons/rx";
import { toast } from "sonner";

interface IProps {
  setFieldValue: (field: string, value: string | number | object) => void;
  values: Record<string, unknown>;
}

const validationSchema = Yup.object().shape({
  invoiceNumber: Yup.string().required("Invoice number is required"),
});

const AddSupplierOnPurchase = ({ setFieldValue }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | undefined>();

  const [searchValue, setSearchValue] = useDebounce("");

  const { data, isLoading } = useGetAllSuppliersQuery({ searchTerm: searchValue, page: 1 });

  const supplierData = data?.data || [];

  if (isLoading) {
    return <Loader />;
  }

  const handleAddItem = (values: { invoiceNumber: string }) => {
    if (!selectedSupplier) {
      toast.error("Please select a supplier");
      return;
    }

    const data = {
      _id: selectedSupplier._id,
      name: selectedSupplier.name,
      address: selectedSupplier.address,
      phoneNumber: selectedSupplier.phoneNumber,
      email: selectedSupplier.email,
      logoUrl: selectedSupplier.logoUrl,
      invoiceNumber: values.invoiceNumber,
    };

    setFieldValue("supplier", data);
    setSelectedSupplier(undefined);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center justify-center gap-3 rounded-[4px] bg-success/10 px-[8px] py-[4px] text-sm text-success"
      >
        <FaPlus /> Add Supplier
      </button>
      <DialogProvider
        state={isOpen && !selectedSupplier}
        setState={setIsOpen}
        className="w-[95vw] md:w-[700px]"
      >
        <div className="max-h-[50vh] w-full overflow-auto bg-white p-[16px]">
          <h1 className="text-[18px] font-bold">Select a Supplier</h1>
          <HorizontalLine className="my-[20px]" />

          <div className="sticky top-0 flex w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 bg-white p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Supplier"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>
          <div className="mt-[20px] grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
            {supplierData?.map((supplier) => (
              <div
                key={supplier._id}
                onClick={() => {
                  setSelectedSupplier(supplier);
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center justify-between gap-[8px] rounded-[4px] border border-gray-200 p-[8px] hover:border-success"
              >
                <img
                  src={supplier.logoUrl}
                  alt={supplier.name}
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px] rounded-[4px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/category_blank.png";
                  }}
                />
                <div className="flex w-full flex-col gap-[4px] text-sm">
                  <p className="line-clamp-2 leading-[120%] font-semibold">
                    <span className="font-normal">Name:</span> {supplier.name}
                  </p>
                  <span className="line-clamp-2 leading-[120%] font-semibold">
                    <span className="font-normal">Address:</span> {supplier.address}
                  </span>
                  <span className="line-clamp-2 leading-[120%] font-semibold">
                    <span className="font-normal">Phone:</span> {supplier.phoneNumber}
                  </span>
                  <span className="line-clamp-2 leading-[120%] font-semibold">
                    <span className="font-normal">Email:</span> {supplier.email}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogProvider>

      <DialogProvider
        setState={() => {
          setSelectedSupplier(undefined);
        }}
        state={!!selectedSupplier}
        className="w-[95vw] md:w-[700px]"
      >
        {selectedSupplier ? (
          <div className="w-full bg-white p-[16px]">
            <div className="flex items-center justify-between">
              <h5 className="text-[20px] font-[700] text-strong">Supplier Invoice Number</h5>
              <button
                onClick={() => {
                  setSelectedSupplier(undefined);
                  setIsOpen(true);
                }}
                className="cursor-pointer"
              >
                <LuX />
              </button>
            </div>
            <HorizontalLine className="my-[20px]" />

            <div className="flex flex-col items-center justify-start gap-[20px] md:flex-row md:items-start">
              <div className="flex w-full flex-col gap-[10px]">
                <Formik
                  initialValues={{ invoiceNumber: "" }}
                  onSubmit={handleAddItem}
                  validationSchema={validationSchema}
                >
                  {({ values, setFieldValue, touched, submitCount }) => (
                    <Form>
                      {/* Invoice Number */}
                      <div className="flex w-full flex-col gap-[5px]">
                        <label className="text-[12px] font-semibold text-black">
                          Invoice Number
                        </label>
                        <Field
                          as={Input}
                          name={`invoiceNumber`}
                          placeholder="Enter Invoice Number"
                        />
                        <ErrorMessage
                          name={`invoiceNumber`}
                          component="div"
                          className="text-sm text-danger"
                        />
                      </div>
                      <Button type="submit" className="mt-[20px]">
                        Add Invoice Number
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </DialogProvider>
    </>
  );
};

export default AddSupplierOnPurchase;
