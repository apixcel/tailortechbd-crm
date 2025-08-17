"use client";

import { useDebounce } from "@/hooks";
import { IProfitBalance } from "@/types";
import { useState } from "react";
import HorizontalLine from "../ui/HorizontalLine";
import { RxMagnifyingGlass } from "react-icons/rx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import TableSkeleton from "../ui/TableSkeleton";
import TableDataNotFound from "../ui/TableDataNotFound";
import Pagination from "../ui/Pagination";
import { mockProfitBalanceData } from "@/constants/profitBalanceData";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Name", field: "" },
  { label: "Designation", field: "" },
  { label: "Total Profit Amount", field: "totalProfitAmount" },
  { label: "Last Profit Withdrawal Amount", field: "lastProfitWithdrawalAmount" },
  { label: "Current Profit Balance", field: "currentProfitBalance" },
];

const AllProfitBalanceListTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "partnerName,partnerDesignation,profitAmount,profitBalance,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const profitBalanceData: IProfitBalance[] = mockProfitBalanceData;

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
    <div className="flex flex-col gap-4">
      {/* current balance */}
      <div className="bg-white p-4">
        <h1 className="text-[20px] font-bold text-dashboard">Total Profit Amount: 50000 Tk</h1>
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[15px] bg-white p-4">
          <div className="flex flex-col gap-[5px]">
            <h1 className="text-[16px] font-[600]">Profit Balance History List</h1>
            <p className="text-[12px] text-muted md:text-[14px]">
              Displaying All the available profit balance history in your dashboard. There is total{" "}
              <span className="font-bold text-dashboard">{metaData.totalDoc}</span> history. Data is
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
                placeholder="Search Capital"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <RxMagnifyingGlass />
            </div>
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
                ) : profitBalanceData?.length ? (
                  profitBalanceData?.map((profitBalance, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {/* index */}
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                      {/* partner name */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">{profitBalance.partnerName}</span>
                      </td>

                      {/* partner designation */}
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                        <span className="text-sm">{profitBalance.partnerDesignation}</span>
                      </td>

                      {/* total profit amount */}
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                        <span className="text-sm">{profitBalance.totalProfitAmount}</span>
                      </td>

                      {/* last profit withdrawal amount */}
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                        <span className="text-sm">{profitBalance.lastProfitWithdrawalAmount}</span>
                      </td>

                      {/* current profit balance */}
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                        <span className="text-sm">{profitBalance.currentProfitBalance}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <TableDataNotFound span={tableHead.length} message="No Profit Balance Found" />
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
    </div>
  );
};

export default AllProfitBalanceListTable;
