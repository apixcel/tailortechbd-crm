"use client";

import { Button } from "@/components"; // Assuming Button is a reusable component
import { useGetAllNomineesByPartnerIdQuery } from "@/redux/features/partners/partner.api";
import { IPartner } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import DialogProvider from "../ui/DialogProvider";
import DeletePartnerNomineeDialog from "./DeletePartnerNomineeDialog";

interface Props {
  partner: IPartner;
}

const PartnerNomineeManageMent: React.FC<Props> = ({ partner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetAllNomineesByPartnerIdQuery(partner._id, { skip: !isOpen });

  const nominees = data?.data || [];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-1 text-sm text-blue-600 hover:underline"
      >
        <AiOutlineUserSwitch /> {partner.nomineeCount || 0} Nominees
      </button>

      <DialogProvider state={isOpen} setState={setIsOpen} className="w-full max-w-[600px]">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-6 text-xl font-semibold text-gray-800">
            {partner.partnerName} Nominees
          </h3>

          {/* Check if data is still loading */}
          {isLoading ? (
            <div className="text-gray-500">Loading nominees...</div>
          ) : nominees.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-[4px] border-[1px] border-border-main py-4 text-gray-500">
              <span className="flex h-4 w-4 items-center justify-center rounded-full">
                <CiWarning />
              </span>
              <span>No nominees found for this partner.</span>
              <Link
                className="w-fit rounded-[2px] bg-primary px-4 py-1 text-sm text-white hover:bg-primary/70"
                href={`/partner-list/nominee/${partner._id}/create`}
              >
                Add Nominee
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {nominees.map((nominee) => (
                <div
                  key={nominee._id}
                  className="flex flex-col items-start justify-start rounded-md border-[1px] border-b border-border-main bg-primary/5 p-3"
                >
                  <div className="flex-1">
                    <div className="font-bold text-gray-700">{nominee.fullName}</div>
                    <div className="text-sm text-gray-600">Rel: {nominee.relationWithPartner}</div>
                    <div className="mt-2 text-sm text-gray-500">
                      <div>Email: {nominee.email}</div>
                      <div>Phone: {nominee.phoneNumber}</div>
                      <div>Address: {nominee.address}</div>
                      <div>Share Percentage: {nominee.sharePercentage}%</div>
                    </div>
                  </div>
                  <DeletePartnerNomineeDialog onDelete={() => setIsOpen(false)} nominee={nominee} />
                  <Link
                    target="_blank"
                    href={nominee.attachment}
                    className="mt-2 text-sm underline hover:italic"
                  >
                    View Attachment
                  </Link>
                </div>
              ))}
              {nominees.length < 3 ? (
                <Link
                  className="w-fit rounded-[2px] bg-primary px-4 py-1 text-sm text-white hover:bg-primary/70"
                  href={`/partner-list/nominee/${partner._id}`}
                >
                  Add Nominee
                </Link>
              ) : (
                ""
              )}
            </div>
          )}

          {/* Close button */}
          <div className="mt-6 text-right">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default PartnerNomineeManageMent;
