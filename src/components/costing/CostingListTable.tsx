"use client";

import { useDebounce } from "@/hooks";
import {
  useDeleteCostingByIdMutation,
  useGetAllCostingsQuery,
} from "@/redux/features/costing/costing.api";
import { truncateWords } from "@/utils";
import dateUtils from "@/utils/date";
import Link from "next/link";
import { useState } from "react";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

import { HorizontalLine, Pagination, TableDataNotFound, TableSkeleton } from "@/components";
import DownloadCostingReport from "./DownloadCostingReport";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Name", field: "" },
  { label: "Designation", field: "" },
  { label: "Costing Category", field: "" },
  { label: "Description", field: "" },
  { label: "Date", field: "costingDate" },
  { label: "Cost Amount", field: "costingAmount" },
  { label: "Remarks", field: "" },
  { label: "Documents", field: "" },
];

const costingData = [
  {
    id: 1,
    name: "Munnaf Ali",
    designation: "Sr. Executive-IT",
    costingCategory: "Convence Bill",
    costingDescription: "Mirpur to Dhanmondi",
    costingDate: "10/8/2025",
    costingAmount: 300,
    costingRemark: "By CNG",
  },
  {
    id: 2,
    name: "Rafikul Islam",
    designation: "Manager-IT",
    costingCategory: "Photography",
    costingDescription: "007 Studio at Mirpur",
    costingDate: "10/8/2025",
    costingAmount: 1500,
    costingRemark: "Bank Tr",
    fileUrl: "https://example.com/file.pdf",
  },
  {
    id: 3,
    name: "Shawon",
    designation: "CTO",
    costingCategory: "D. Marketing",
    costingDescription: "Facebook Ad Boosting",
    costingDate: "10/8/2025",
    costingAmount: 2500,
    costingRemark: "Via VISA Card",
    fileUrl: "https://example.com/file.pdf",
  },
  {
    id: 3,
    name: "Faruk Hosen",
    designation: "Test",
    costingCategory: "Office Rent",
    costingDescription: "Month of August",
    costingDate: "10/8/2025",
    costingAmount: 5000,
    costingRemark: "Cash",
    fileUrl: "https://example.com/file.pdf",
  },
];

const CostingListTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "partnerName,costingAmount,costingDate,costingType,note,fileUrl,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const [deleteCosting, { isLoading: isDeleting }] = useDeleteCostingByIdMutation();
  const { data, isLoading } = useGetAllCostingsQuery({ ...query, searchTerm });
  // const costingData = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

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
      <div className="flex flex-col gap-[15px] bg-white p-4">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Costing List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All the available costings in your store. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> costings. Data is
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
              placeholder="Search Costing"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          <DownloadCostingReport />
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
                    className="px-6 py-3 text-left text-sm font-semibold text-dashboard"
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
              ) : costingData?.length ? (
                costingData?.map((costing, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* name */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {!costing.name ? "-" : <span className="font-[500]">{costing.name}</span>}
                    </td>

                    {/* designation */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {!costing.designation ? (
                        "-"
                      ) : (
                        <span className="font-[500]">{costing.designation}</span>
                      )}
                    </td>

                    {/* costing category */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="text-sm">{costing.costingCategory}</span>
                    </td>

                    {/* description */}
                    <td className="max-w-[250px] px-6 py-4 text-sm text-gray-700">
                      {truncateWords(costing.costingDescription || "-", 10)}
                    </td>

                    {/* costing date */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="text-sm">{costing.costingDate}</span>
                    </td>

                    {/* costing amount */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="text-sm">{costing.costingAmount}</span>
                    </td>

                    {/* remarks */}
                    <td className="max-w-[250px] px-6 py-4 text-sm text-gray-700">
                      {truncateWords(costing.costingRemark || "-", 10)}
                    </td>

                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {costing.fileUrl ? (
                        <a
                          href={costing.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-primary">—</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Costing Found" />
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

export default CostingListTable;
