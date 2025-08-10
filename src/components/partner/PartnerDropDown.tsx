"use client";

import { SelectionBox } from "@/components";
import { useGetAllPartnersQuery } from "@/redux/features/partners/partner.api";
import { twMerge } from "tailwind-merge";

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
  defaultValue?: { label: string; value: string };
  className?: string;
}

const PartnerDropDown: React.FC<IProps> = ({ onSelect, defaultValue, className }) => {
  const { data } = useGetAllPartnersQuery({ searchTerm: "" });

  const partnerOptions =
    data?.data?.map((partner) => ({
      label: `${partner.partnerName} (${partner.partnerDesignation})`,
      value: partner._id,
      partnerDesignation: partner.partnerDesignation,
      joiningDate: partner.joiningDate,
    })) || [];

  return (
    <div
      className={twMerge(
        "flex w-full flex-col gap-[5px] lg:max-w-[300px] xl:max-w-[350px]",
        className
      )}
    >
      <span className="text-[12px] font-[700] text-primary">Select Partner</span>
      <SelectionBox
        data={partnerOptions}
        onSelect={onSelect}
        defaultValue={defaultValue}
        showSearch={true}
      />
    </div>
  );
};

export default PartnerDropDown;
