"use client";

import { SelectionBox } from "@/components";
import { useGetAllSuppliersQuery } from "@/redux/features/supplier/supplier.api";
import { twMerge } from "tailwind-merge";

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
  defaultValue?: { label: string; value: string };
  className?: string;
  selectionBoxClassName?: string;
}

const SupplierDropdown: React.FC<IProps> = ({
  onSelect,
  defaultValue,
  className,
  selectionBoxClassName,
}) => {
  const { data } = useGetAllSuppliersQuery({ searchTerm: "", fields: "name,_id" });

  const supplierOptions =
    data?.data?.map((supplier) => ({
      label: `${supplier.name}`,
      value: supplier._id,
    })) || [];

  return (
    <div className={twMerge("flex w-full flex-col gap-[5px]", className)}>
      <span className="text-[12px] font-[700] text-primary">Select Supplier</span>
      <SelectionBox
        data={supplierOptions}
        onSelect={onSelect}
        defaultValue={defaultValue}
        showSearch={true}
        className={selectionBoxClassName}
      />
    </div>
  );
};

export default SupplierDropdown;
