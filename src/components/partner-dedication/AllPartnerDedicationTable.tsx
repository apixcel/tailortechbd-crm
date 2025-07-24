"use client";

import { HorizontalLine, TableDataNotFound, TableSkeleton, Pagination } from "@/components";
import { useDebounce } from "@/hooks";

import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";
import dateUtils from "@/utils/date";
import { format } from "date-fns";
import { useGetAllPartnerDedicationQuery } from "@/redux/features/partner-dedication/partner-dedication.api";
import DeletePartnerDedicationById from "./DeletePartnerDedicationById";
import { partnerDedications } from "@/constants/partnerDedication";

const tableHead = [
  { label: "#", field: "" },
  { label: "Partner name", field: "" },
  { label: "Work type", field: "" },
  { label: "Time (hours)", field: "" },
  { label: "Date", field: "" },
  { label: "Comment", field: "" },
  { label: "Attachment", field: "" },
  { label: "Actions", field: "" },
];

const AllPartnerDedicationTable = () => {
  const [, /* searchTerm */ setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });

  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "partnerName,amount,investmentDate,type,note,attachment,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  // const { data, isLoading } = useGetAllInvestmentsQuery({ ...query, searchTerm });
  // console.log(data, "all products table");
  // const investmentData = data?.data || [];
  // const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const mockPartnerDedicationData = partnerDedications;
  const metaData = { totalDoc: 0, page: 1 };
  const isLoading = false;

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Partner Dedication List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All the available partner dedications in your store. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> partner
            distributions. Data is Divided into{" "}
            <span className="font-bold text-dashboard">
              {Math.ceil(metaData.totalDoc / 10)} pages
            </span>{" "}
            & currently showing page{" "}
            <span className="font-bold text-dashboard">{metaData.page}.</span>
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="flex flex-wrap items-center justify-between gap-y-5">
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Profit Distribution"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          <Link
            href="/partner-dedication/create"
            className="rounded-[5px] bg-primary px-[20px] py-[6px] text-white"
          >
            Create Partner Dedication
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className="px-6 py-3 text-left text-sm font-semibold text-dashboard uppercase"
                  >
                    {heading.field ? (
                      <button
                        className="flex cursor-pointer items-center gap-1"
                        onClick={() => handleSort(heading.field)}
                      >
                        <span>{heading.label}</span>
                        <span className="flex flex-col text-[10px] leading-[10px]">
                          <FaChevronUp
                            className={`${
                              sort.field === heading.field && sort.order === "asc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                          <FaChevronDown
                            className={`${
                              sort.field === heading.field && sort.order === "desc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                        </span>
                      </button>
                    ) : (
                      heading.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <TableSkeleton columns={tableHead.length} />
              ) : mockPartnerDedicationData?.length ? (
                mockPartnerDedicationData?.map((partnerDedication, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* Index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* Partner name */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{partnerDedication.partnerName}</span>
                    </td>

                    {/* Work type */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{partnerDedication.workType}</span>
                    </td>

                    {/* Time */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{partnerDedication.time} hours</span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{partnerDedication.date}</span>
                    </td>

                    {/* Comment */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{partnerDedication.comment}</span>
                    </td>

                    {/* Attachment */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <Link
                        href={partnerDedication.attachment}
                        target="_blank"
                        className="text-sm hover:underline"
                      >
                        link
                      </Link>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/partner-dedication/${partnerDedication._id}`}
                          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                          title="Edit Partner Dedication"
                        >
                          <GoPencil />
                        </Link>

                        <DeletePartnerDedicationById
                          partnerDedicationId={partnerDedication._id}
                          partnerDedicationName={partnerDedication.partnerName}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Partner Dedication Found" />
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

export default AllPartnerDedicationTable;
