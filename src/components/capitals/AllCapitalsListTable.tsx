"use client";

import { HorizontalLine, Pagination, TableDataNotFound, TableSkeleton } from "@/components";
import { useDebounce } from "@/hooks";
import { useGetAllCapitalJournalQuery } from "@/redux/features/capital/capital.api";
import dateUtils from "@/utils/date";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "date" },
  { label: "Type", field: "" },
  { label: "Description", field: "" },
  { label: "Amount", field: "amount" },
  { label: "Balance", field: "balance" },
];

const AllCapitalsListTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "date", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    sort: "-date", // desc
  });

  const { data, isLoading } = useGetAllCapitalJournalQuery({ ...query, searchTerm });

  const capitalData = data?.data?.data || [];
  console.log(capitalData);
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  const totalCapitalBalance = data?.data?.currentCapitalBalance || 0;

  return (
    <div className="flex flex-col gap-4">
      {/* current balance */}
      <div className="w-full bg-white p-4">
        <h1 className="w-full text-center text-[20px] font-bold text-dashboard">
          Current Balance: {totalCapitalBalance} Tk
        </h1>
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[15px] bg-white p-4">
          <div className="flex flex-col gap-[5px]">
            <h1 className="text-[16px] font-[600]">Balance History</h1>
            <p className="text-[12px] text-muted md:text-[14px]">
              Displaying all the available balance history in your Dashboard. There is total{" "}
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
                ) : capitalData?.length ? (
                  capitalData?.map((capital, index) => {
                    const isCredit = capital.type === "credit";
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        {/* index */}
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                        {/* capital date */}
                        <td className="px-6 py-4">
                          <span className="text-[14px]">{dateUtils.formatDate(capital.date)}</span>
                        </td>

                        {/* capital type */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          <span
                            className={`rounded-[18px] px-[10px] py-[2px] text-sm capitalize ${isCredit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                          >
                            {capital.type}
                          </span>
                        </td>

                        {/* type */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          <span className="text-sm">{capital.description}</span>
                        </td>

                        {/* capital amount */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          <span
                            className={`text-sm ${isCredit ? "text-green-600" : "text-red-600"}`}
                          >
                            {isCredit ? "+" : "-"} {capital.amount}
                          </span>
                        </td>

                        {/* capital balance */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          <span className="text-sm">{capital.balance}</span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <TableDataNotFound span={tableHead.length} message="No Capital Found" />
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          page={(query.page as number) || 1}
          setPage={(page) => setQuery({ ...query, page })}
          totalDocs={metaData.totalDoc}
          onPageChange={(page) => setQuery({ ...query, page })}
        />
      </div>
    </div>
  );
};

export default AllCapitalsListTable;
