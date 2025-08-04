"use client";

import { HorizontalLine, Pagination, TableDataNotFound, TableSkeleton } from "@/components";
import { useDebounce } from "@/hooks";

import { RxMagnifyingGlass } from "react-icons/rx";
import React, { useState } from "react";
import Link from "next/link";
import { useGetAllPartnersQuery } from "@/redux/features/partners/partner.api";
import dateUtils from "@/utils/date";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Name", field: "" },
  { label: "Designation", field: "" },
  { label: "Joining Date", field: "" },
];

const AllPartnerListTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
  });

  const { data, isLoading } = useGetAllPartnersQuery({ ...query, searchTerm });

  const partnerData = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Partner List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All the available partners in your dashboard. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> partners. Data is
            Divided into{" "}
            <span className="font-bold text-dashboard">
              {Math.ceil(metaData.totalDoc / 10)} pages
            </span>{" "}
            & currently showing page{" "}
            <span className="font-bold text-dashboard">{metaData.page}.</span>
          </p>
        </div>

        <HorizontalLine className="my-[10px]" />

        <div className="flex flex-wrap items-center justify-between gap-y-5">
          {/* search input */}
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Partner"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          {/* create partner link */}
          <Link
            href="/partner-list/create"
            className="rounded-[5px] bg-primary px-[20px] py-[6px] text-white"
          >
            Create Partner
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
              ) : partnerData?.length ? (
                partnerData?.map((partner, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* name */}
                    <td className="px-6 py-4">
                      <span className="line-clamp-1 text-[14px]">{partner.partnerName}</span>
                    </td>

                    {/* designation */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{partner.partnerDesignation}</span>
                    </td>

                    {/* joining date */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">
                        {dateUtils.formateCreateOrUpdateDate(partner.joiningDate)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Partner Found" />
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

export default AllPartnerListTable;
