"use client";

import {
  useDeleteProfitWithdrawalByIdMutation,
  useGetAllProfitWithdrawalQuery,
} from "@/redux/features/profit-withdrawal/profit-withdrawal.api";
import { useDebounce } from "@/hooks";
import { useState } from "react";
import Link from "next/link";
import dateUtils from "@/utils/date";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";

import {
  HorizontalLine,
  TableDataNotFound,
  TableSkeleton,
  Pagination,
  DeleteConfirmationDialog,
  ProfitWithdrawalDropdown,
} from "@/components";
import { profitDistributions } from "@/constants/profitDistributionData";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "profitWithdrawalDate" },
  { label: "Amount", field: "profitWithdrawalAmount" },
  { label: "Description", field: "" },
  // { label: "Actions", field: "" },
];

const AllProfitWithdrawalTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields:
      "partnerName,totalProfitAmount,percentage,withdrawalDate,profitPeriod,status,comment,attachment,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const [deleteProfitWithdrawal, { isLoading: isDeleting }] =
    useDeleteProfitWithdrawalByIdMutation();
  // const { data, isLoading } = useGetAllProfitWithdrawalQuery({ ...query, searchTerm });
  const profitWithdrawalData = profitDistributions || [];
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
        <div className="flex flex-col-reverse flex-wrap items-end justify-between gap-y-5 lg:flex-row">
          <ProfitWithdrawalDropdown onSelect={() => {}} />

          {/* create profit distribution link */}
          <Link
            href="/profit-withdrawal/create"
            className="rounded-[5px] bg-primary px-[20px] py-[6px] text-white"
          >
            Create Profit Withdrawal
          </Link>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[16px] font-[600]">Withdrawer: Munnaf Ali</h1>
            <p className="text-[12px] text-muted md:text-[14px]">Designation: CEO</p>
            <span className="text-[12px] text-muted md:text-[14px]">Joining Date: 01-05-2025</span>
          </div>
        </div>

        <HorizontalLine className="my-[10px]" />

        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Profit Withdrawal List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All the available profit withdrawals in your store. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> profit
            withdrawals. Data is Divided into{" "}
            <span className="font-bold text-dashboard">
              {Math.ceil(metaData.totalDoc / 10)} pages
            </span>{" "}
            & currently showing page{" "}
            <span className="font-bold text-dashboard">{metaData.page}.</span>
          </p>
        </div>

        <HorizontalLine className="my-[10px]" />

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
              ) : profitWithdrawalData?.length ? (
                profitWithdrawalData?.map((profitWithdrawal, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* profit withdrawal date */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{profitWithdrawal.profitWithdrawalDate}</span>
                    </td>

                    {/* profit withdrawal amount */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{profitWithdrawal.profitWithdrawalAmount}</span>
                    </td>

                    {/* description */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{profitWithdrawal.description}</span>
                    </td>

                    {/* actions */}
                    {/* <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700"> */}
                    {/* <div className="flex items-center gap-2"> */}
                    {/* update */}
                    {/* <Link
                          href={`/profit-withdrawal/${profitWithdrawal._id}`}
                          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                          title="Edit Profit Withdrawal"
                        >
                          <GoPencil />
                        </Link> */}

                    {/* delete */}
                    {/* <DeleteConfirmationDialog
                          entityId={profitWithdrawal._id!}
                          entityName={profitWithdrawal.partnerName}
                          entityLabel="Profit Withdrawal"
                          onDelete={(id) => deleteProfitWithdrawal({ profitWithdrawalId: id })}
                          isLoading={isDeleting}
                        /> */}
                    {/* </div> */}
                    {/* </td> */}
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
