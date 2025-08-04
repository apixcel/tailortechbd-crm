"use client";

import { SelectionBox } from "@/components";
import { useGetAllPartnersQuery } from "@/redux/features/partners/partner.api";

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
  defaultValue?: { label: string; value: string };
}

const PartnerDropDown: React.FC<IProps> = ({ onSelect, defaultValue }) => {
  const { data } = useGetAllPartnersQuery({ searchTerm: "" });

  const partnerOptions =
    data?.data?.map((partner) => ({
      label: `${partner.partnerName} (${partner.partnerDesignation})`,
      value: partner._id,
      partnerDesignation: partner.partnerDesignation,
      joiningDate: partner.joiningDate,
    })) || [];

  return (
    <div className="flex w-full flex-col gap-[5px] lg:max-w-[300px] xl:max-w-[400px]">
      <span className="text-[12px] font-[700] text-primary">Select Partner</span>
      <SelectionBox
        data={partnerOptions}
        onSelect={onSelect}
        defaultValue={defaultValue || partnerOptions[0]}
        showSearch={true}
      />
    </div>
  );
};

export default PartnerDropDown;
