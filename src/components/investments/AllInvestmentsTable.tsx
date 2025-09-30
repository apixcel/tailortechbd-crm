"use client";

import { useDebounce } from "@/hooks";
import { useGetAllInvestmentsQuery } from "@/redux/features/investments/investments.api";
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
import { truncateWords } from "@/utils";
import DownloadInvestmentReport from "./DownloadInvestmentReport";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "" },
  { label: "Partner Name", field: "" },
  { label: "Description", field: "" },
  { label: "Transaction Method", field: "" },
  { label: "Last Invested Amount", field: "" },
  // { label: "Last Investment", field: "" },
  { label: "Total Investment Balance", field: "" },
  { label: "Remarks", field: "" },
];

const AllInvestmentsTable = () => {
  const [selectedPartner, setSelectedPartner] = useState<{
    label: string;
    value: string;
    partnerDesignation?: string;
    joiningDate?: string;
  } | null>(null);

  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "investmentDate", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
    partner: "",
  });

  const { data, isLoading } = useGetAllInvestmentsQuery({
    ...query,
    searchTerm,
    ...(selectedPartner?.value ? { partner: selectedPartner.value } : {}),
  });

  const investmentData = data?.data || [];

  // const investmentData = data?.data || [];
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
              setQuery((prev) => ({ ...prev, partnerId: item.value, page: 1 }));
            }}
            defaultValue={
              selectedPartner
                ? { label: selectedPartner.label, value: selectedPartner.value }
                : undefined
            }
          />

          {/* create investment link */}
          <Link
            href="/investments/create"
            className="rounded-[5px] bg-primary px-[20px] py-[6px] text-white"
          >
            Create Investment
          </Link>
        </div>
        {selectedPartner ? (
          <div className="mb-4 flex justify-center">
            <div className="flex flex-col items-center gap-[5px]">
              <h1 className="text-[16px] font-[600]">
                Investor: {selectedPartner?.label || "N/A"}
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

        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">All Investments</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying all the available investments in your Dashboard. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> investments. Data
            is Divided into{" "}
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
              placeholder="Search Investment"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>
          <DownloadInvestmentReport />
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
              ) : investmentData?.length ? (
                investmentData?.map((investment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* investment date */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">
                        {dateUtils.formatDate(investment?.investmentDate)}
                      </span>
                    </td>

                    {/* partner name */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment?.partner?.partnerName || "N/A"}</span>
                    </td>

                    {/* description */}
                    <td className="max-w-[250px] px-6 py-4 text-sm text-gray-700">
                      {truncateWords(investment?.description || "-", 10)}
                    </td>

                    {/* transaction method */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {investment?.transactionMethod ? (
                        <span className="text-sm">{investment?.transactionMethod}</span>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>

                    {/* last invested amount */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment?.investmentAmount}</span>
                    </td>

                    {/* total investment balance */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment?.totalBalance}</span>
                    </td>

                    {/* remarks */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment?.remarks || "N/A"}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Investment Found" />
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

export default AllInvestmentsTable;
