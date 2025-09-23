"use client";

import { useParams } from "next/navigation";
import { useGetAllNomineesByPartnerIdQuery } from "@/redux/features/partners/partner.api";
import Pagination from "../ui/Pagination";
import Link from "next/link";
import TableSkeleton from "../ui/TableSkeleton";
import DeletePartnerNomineeDialog from "./DeletePartnerNomineeDialog";
import { useState } from "react";
import TableDataNotFound from "../ui/TableDataNotFound";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Name", field: "" },
  { label: "Relation", field: "" },
  { label: "Contact No", field: "" },
  { label: "Email", field: "" },
  { label: "Address", field: "" },
  { label: "Profit Share", field: "" },
  { label: "Attachment", field: "" },
  {
    label: "Action",
    field: "",
  },
];

const AllNomineeListTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    nomineeCount: "true",
  });

  const { id } = useParams();
  const { data, isLoading } = useGetAllNomineesByPartnerIdQuery(id as string, {
    skip: !id,
    ...query,
  });
  const nominees = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-wrap items-center justify-end gap-y-5">
          {/* create partner link */}
          <Link
            href={`/partner-list/nominee/${id}/create`}
            className="rounded-[5px] bg-primary px-[20px] py-[6px] text-white"
          >
            Create Nominee
          </Link>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-dashboard/20">
            {/* table head */}
            <thead className="bg-dashboard/10">
              <tr>
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className="px-6 py-3 text-left text-sm font-semibold tracking-wider text-dashboard"
                  >
                    {heading.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <TableSkeleton columns={tableHead.length} />
              ) : nominees?.length ? (
                nominees?.map((nominee, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* name */}
                    <td className="px-6 py-4">
                      <span className="line-clamp-1 text-[14px]">{nominee.fullName}</span>
                    </td>

                    {/* relation */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{nominee.relationWithPartner}</span>
                    </td>

                    {/* contact no */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{nominee.phoneNumber || "-"}</span>
                    </td>

                    {/* email */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{nominee.email || "-"}</span>
                    </td>

                    {/* address */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{nominee.address || "-"}</span>
                    </td>

                    {/* profit share */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{nominee.sharePercentage}%</span>
                    </td>

                    {/* attachment */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {nominee.attachment ? (
                        <Link href={nominee.attachment} target="_blank" className="underline">
                          View
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <DeletePartnerNomineeDialog
                        onDelete={() => setIsOpen(false)}
                        nominee={nominee}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Nominee Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalDocs={metaData.totalDoc}
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </div>
  );
};

export default AllNomineeListTable;
