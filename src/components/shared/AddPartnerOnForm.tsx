"use client";

import useDebounce from "@/hooks/useDebounce";
import { IPartner } from "@/types";
import { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

import { DialogProvider, HorizontalLine, Skeleton } from "@/components";
import { useGetAllPartnersQuery } from "@/redux/features/partners/partner.api";
import dateUtils from "@/utils/date";

interface IProps {
  setFieldValue?: (field: string, value: IPartner) => void;
  values: Record<string, unknown>;
  onSelect?: (partner: Omit<IPartner, "createdAt" | "updatedAt">) => void;
}

const AddPartnerOnForm = ({ setFieldValue, onSelect }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useDebounce("");

  const { data, isLoading } = useGetAllPartnersQuery({ searchTerm });
  const partnerData = data?.data || [];

  if (isLoading)
    return (
      <div>
        <Skeleton className="h-[40px] w-[100%]" />
      </div>
    );

  const handleSelectPartner = (partner: Omit<IPartner, "createdAt" | "updatedAt">) => {
    setFieldValue?.("partner", {
      ...partner,
      phoneNumber: (partner as IPartner).phoneNumber ?? "",
      email: (partner as IPartner).email ?? "",
      address: (partner as IPartner).address ?? "",
      bankDetails: (partner as IPartner).bankDetails ?? "",
      activeStatus: (partner as IPartner).activeStatus ?? true,
      remarks: (partner as IPartner).remarks ?? "",
    });
    onSelect?.(partner);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center justify-center gap-3 rounded-[4px] bg-success/10 px-[8px] py-[4px] text-sm text-success"
      >
        <FaPlus /> Add Partner
      </button>
      <DialogProvider state={isOpen} setState={setIsOpen} className="w-[95vw] md:w-[700px]">
        <div className="max-h-[50vh] w-full overflow-auto bg-white p-[16px]">
          <h1 className="text-[18px] font-bold">Select a Partner</h1>
          <HorizontalLine className="my-[20px]" />

          <div className="sticky top-0 flex w-[300px] items-center justify-between rounded-[5px] border border-dashboard/20 bg-white p-[5px]">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Partner"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          <div className="mt-[20px] grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
            {partnerData
              .filter((partner) =>
                partner.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((partner) => (
                <div
                  key={partner._id}
                  onClick={() => handleSelectPartner(partner)}
                  className="flex cursor-pointer items-center justify-between gap-[8px] rounded-[4px] border border-gray-200 p-[8px] hover:border-success"
                >
                  <div className="flex w-full flex-col items-center gap-[4px] text-sm">
                    <p>
                      <strong>Name:</strong> {partner.partnerName}
                    </p>
                    <p>
                      <strong>Designation:</strong> {partner.partnerDesignation}
                    </p>
                    <p>
                      <strong>Joining Date:</strong> {dateUtils.formatDate(partner.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default AddPartnerOnForm;
