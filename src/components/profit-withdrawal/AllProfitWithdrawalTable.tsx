"use client";

import { useDebounce } from "@/hooks";
import { useGetAllProfitWithdrawalQuery } from "@/redux/features/profit-withdrawal/profit-withdrawal.api";
import dateUtils from "@/utils/date";
import Link from "next/link";
import { useState } from "react";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

import {
  HorizontalLine,
  Pagination,
  PartnerDropDown,
  TableDataNotFound,
  TableSkeleton,
} from "@/components";
import DownloadProfitWithdrawalReport from "./DownloadProfitWithdrawalReport";
import UpdateProfitWithdrawalStatus from "./UpdateProfitWithdrawalStatus";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "withdrawalDate" },
  { label: "Name", field: "" },
  { label: "Designation", field: "" },
  { label: "Current Profit Balance", field: "" },
  { label: "Withdrawal Amount", field: "totalProfitAmount" },
  { label: "Payment Method", field: "percentage" },
  { label: "Payment Status", field: "status" },
  { label: "Documents", field: "" },
];

const AllProfitWithdrawalTable = () => {
  const [selectedPartner, setSelectedPartner] = useState<{
    label: string;
    value: string;
    partnerDesignation?: string;
    joiningDate?: string;
  } | null>(null);

  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
    partner: "",
  });

  const { data, isLoading } = useGetAllProfitWithdrawalQuery({
    ...query,
    searchTerm,
    ...(selectedPartner?.value ? { partner: selectedPartner.value } : {}),
  });

  const profitWithdrawalData = data?.data || [];
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
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col-reverse flex-wrap items-end justify-between gap-y-5 lg:flex-row">
          <PartnerDropDown
            onSelect={(item) => {
              setSelectedPartner(item);
              setQuery((prev) => ({
                ...prev,
                partner: item.value,
                page: 1,
              }));
            }}
            defaultValue={
              selectedPartner
                ? { label: selectedPartner.label, value: selectedPartner.value }
                : undefined
            }
          />

          {/* create profit withdrawal link */}
          <Link
            href="/profit-withdrawal/create"
            className="rounded-[5px] bg-primary px-[20px] py-[6px] text-white"
          >
            Create Profit Withdrawal
          </Link>
        </div>

        {selectedPartner ? (
          <div className="mb-4 flex justify-center">
            <div className="flex flex-col items-center gap-[5px]">
              <h1 className="text-[16px] font-[600]">
                Withdrawer: {selectedPartner?.label || "N/A"}
              </h1>
              <p className="text-[12px] text-muted md:text-[14px]">
                Designation: {selectedPartner?.partnerDesignation || "N/A"}
              </p>
              <span className="text-[12px] text-muted md:text-[14px]">
                Joining Date:{" "}
                {selectedPartner?.joiningDate
                  ? dateUtils.formatDate(selectedPartner.joiningDate)
                  : "N/A"}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}

        <HorizontalLine className="my-[10px]" />

        {/* table Title */}
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Profit Withdrawal List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying all available profit withdrawals in your store. There is a total of{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> profit
            withdrawals. Data is divided into{" "}
            <span className="font-bold text-dashboard">{Math.ceil(metaData.totalDoc / 10)}</span>{" "}
            pages &amp; currently showing page{" "}
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
              placeholder="Search Profit Withdrawal"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>
          <DownloadProfitWithdrawalReport />
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
              ) : profitWithdrawalData.length ? (
                profitWithdrawalData.map((pw, index) => (
                  <tr key={pw._id} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* withdrawal date */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {dateUtils.formatDateToDDMMYYYY?.(pw.withdrawalDate)}
                    </td>

                    {/* partner name */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {pw.partner?.partnerName || "N/A"}
                    </td>

                    {/* partner designation */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {pw.partner?.partnerDesignation || "N/A"}
                    </td>

                    {/* current profit balance */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-primary">{pw.totalProfitAmount}</span>
                    </td>

                    {/* get amount */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="font-bold">{pw.withdrawalAmount} TK</span>
                      <span className="text-success"> ({pw.percentage}%)</span>
                    </td>

                    {/* payment method */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-primary">{pw.paymentMethod || "N/A"}</span>
                    </td>

                    {/* status */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700 capitalize">
                      <span className="flex flex-col gap-[5px]">
                        <span
                          className={
                            pw.status === "paid"
                              ? "font-semibold text-green-600"
                              : "font-semibold text-yellow-500"
                          }
                        >
                          {pw.status.replace("_", " ")}
                        </span>
                        {pw.status === "not_paid" ? (
                          <UpdateProfitWithdrawalStatus profitWithdrawal={pw} />
                        ) : (
                          ""
                        )}
                      </span>
                    </td>

                    {/* attachment */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {pw.attachment ? (
                        <a
                          href={pw.attachment}
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
                <TableDataNotFound span={tableHead.length} message="No Profit Withdrawal Found" />
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

export default AllProfitWithdrawalTable;
