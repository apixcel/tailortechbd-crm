"use client";

import useDebounce from "@/hooks/useDebounce";
import { useGetAllSuppliersQuery } from "@/redux/features/supplier/supplier.api";
import { ISupplier } from "@/types";
import { useState } from "react";

import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Loader from "@/components/ui/Loader";

import { FaPlus } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

interface IProps {
  setFieldValue: (field: string, value: string | number | object) => void;
  values: Record<string, unknown>;
}

const AddSupplierOnPurchase = ({ setFieldValue }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | undefined>();

  const [searchValue, setSearchValue] = useDebounce("");

  const { data, isLoading } = useGetAllSuppliersQuery({ searchTerm: searchValue, page: 1 });

  const supplierData = data?.data || [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center justify-center gap-3 rounded-[4px] bg-success/10 px-[8px] py-[4px] text-sm text-success"
      >
        <FaPlus /> {selectedSupplier ? "Change Supplier" : "Add Supplier"}
      </button>
      <DialogProvider state={isOpen} setState={setIsOpen} className="w-[95vw] md:w-[700px]">
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
                  setFieldValue("supplier", supplier);
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center justify-between gap-[8px] rounded-[4px] border border-gray-200 p-[8px] hover:border-success"
              >
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
    </>
  );
};

export default AddSupplierOnPurchase;
