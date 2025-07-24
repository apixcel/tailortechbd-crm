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
import { useGetAllInvestmentsQuery } from "@/redux/features/investments/investments.api";
import { profitDistributions } from "@/constants/profitDistributionData";
import DeleteProfitDistributionById from "./DeleteProfitDistributionById";

const tableHead = [
  { label: "#", field: "" },
  { label: "Period", field: "" },
  { label: "Total profit", field: "" },
  { label: "Partner name", field: "" },
  { label: "Percentage", field: "" },
  { label: "Getting Amount", field: "" },
  { label: "Status", field: "" },
  { label: "Comment", field: "" },
  { label: "Profit Distribution Date", field: "" },
  { label: "Attachment", field: "" },
  { label: "Created Date", field: "createdAt" },
  { label: "Actions", field: "" },
];

const AllProfitDistributionTable = () => {
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

  const mockProfitDistributionData = profitDistributions;
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
          <h1 className="text-[16px] font-[600]">Profit Distribution List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All the available profit distributions in your store. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> profit
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
            href="/profit-distribution/create"
            className="rounded-[5px] bg-primary px-[20px] py-[6px] text-white"
          >
            Create Profit Distribution
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
              ) : mockProfitDistributionData?.length ? (
                mockProfitDistributionData?.map((profitDistribution, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* Index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* Period */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">
                        {profitDistribution.period.startDate && profitDistribution.period.endDate
                          ? `${format(new Date(profitDistribution.period.startDate), "MMM")}–${format(
                              new Date(profitDistribution.period.endDate),
                              "MMM yyyy"
                            )}`
                          : ""}
                      </span>
                    </td>

                    {/* Total profit */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{profitDistribution.totalProfit}</span>
                    </td>

                    {/* Partner name */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{profitDistribution.partnerName}</span>
                    </td>

                    {/* Profit percentage */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{profitDistribution.percentage}%</span>
                    </td>

                    {/* Getting amount */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">
                        {Number(profitDistribution.totalProfit) *
                          (Number(profitDistribution.percentage) / 100)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span
                        className={`text-sm ${
                          profitDistribution.status.toLowerCase() === "paid"
                            ? "text-green-500"
                            : "text-red-400"
                        }`}
                      >
                        {profitDistribution.status}
                      </span>
                    </td>

                    {/* Comment */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{profitDistribution.comment}</span>
                    </td>

                    {/* Profit distribution date */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">
                        {dateUtils.formateCreateOrUpdateDate(profitDistribution.distributionDate)}
                      </span>
                    </td>

                    {/* Attachment */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <Link
                        href={profitDistribution.attachment}
                        target="_blank"
                        className="text-sm hover:underline"
                      >
                        link
                      </Link>
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">
                        {dateUtils.formateCreateOrUpdateDate(profitDistribution.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/profit-distribution/${profitDistribution._id}`}
                          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                          title="Edit Profit Distribution"
                        >
                          <GoPencil />
                        </Link>

                        <DeleteProfitDistributionById
                          profitDistributionId={profitDistribution._id}
                          profitDistributionName={profitDistribution.partnerName}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Profit Distribution Found" />
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

export default AllProfitDistributionTable;
