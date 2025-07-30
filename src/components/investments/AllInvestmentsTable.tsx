"use client";

import {
  useDeleteInvestmentByIdMutation,
  useGetAllInvestmentsQuery,
} from "@/redux/features/investments/investments.api";
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
  PartnerDropDown,
} from "@/components";
import { mockInvestmentData } from "@/constants/investmentsData";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "investmentDate" },
  { label: "Amount", field: "investmentAmount" },
  { label: "Remarks", field: "" },
  // { label: "Actions", field: "" },
];

const AllInvestmentsTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "investmentAmount,investmentDate,type,note,attachment,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const [deleteInvestment, { isLoading: isDeleting }] = useDeleteInvestmentByIdMutation();
  // const { data, isLoading } = useGetAllInvestmentsQuery({ ...query, searchTerm });

  const investmentData = mockInvestmentData || [];
  // const metaData = data?.meta || { totalDoc: 0, page: 1 };

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
          <h1 className="text-[16px] font-[600]">Investment List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All the available investments in your store. There is total{" "}
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

        <div className="flex flex-wrap gap-y-5 items-end justify-between">
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

          <div className="flex md:flex-nowrap flex-wrap items-end gap-4">
            <PartnerDropDown onSelect={() => {}} />

            {/* create investment link */}
            <Link
              href="/investments/create"
              className="inline-block w-full rounded-[5px] bg-primary px-[20px] py-[6px] text-white"
            >
              Create Investment
            </Link>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[16px] font-[600]">Investor Name: Munnaf Ali</h1>
            <p className="text-[12px] text-muted md:text-[14px]">Designation: CEO</p>
            <span className="text-[12px] text-muted md:text-[14px]">Joining Date: 01-05-2025</span>
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
              ) : investmentData?.length ? (
                investmentData?.map((investment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* investment date */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment.investmentDate}</span>
                    </td>

                    {/* investment amount */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment.investmentAmount}</span>
                    </td>

                    {/* investment remark */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment.investmentRemark}</span>
                    </td>

                    {/* actions */}
                    {/* <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700"> */}
                    {/* <div className="flex items-center gap-2"> */}
                    {/* update */}
                    {/* <Link
                          href={`/investments/${investment._id}`}
                          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                          title="Edit Investment"
                        >
                          <GoPencil />
                        </Link> */}

                    {/* delete */}
                    {/* <DeleteConfirmationDialog
                          entityId={investment._id!}
                          entityName={investment.investmentRemark}
                          entityLabel="Investment"
                          onDelete={(id) => deleteInvestment({ investmentId: id })}
                          isLoading={isDeleting}
                        /> */}
                    {/* </div> */}
                    {/* </td> */}
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
