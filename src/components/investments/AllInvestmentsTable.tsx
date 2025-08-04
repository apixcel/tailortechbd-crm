"use client";

import { useGetAllInvestmentsQuery } from "@/redux/features/investments/investments.api";
import { useDebounce } from "@/hooks";
import { useState } from "react";
import Link from "next/link";
import dateUtils from "@/utils/date";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

import {
  HorizontalLine,
  TableDataNotFound,
  TableSkeleton,
  Pagination,
  PartnerDropDown,
} from "@/components";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "investmentDate" },
  { label: "Amount", field: "investmentAmount" },
  { label: "Note", field: "" },
  { label: "Attachment", field: "" },
];

const AllInvestmentsTable = () => {
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
    fields: "investmentAmount,investmentDate,type,note,attachment,createdAt,partner",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
    partner: "",
  });

  const { data, isLoading } = useGetAllInvestmentsQuery({
    ...query,
    searchTerm,
    ...(selectedPartner?.value ? { partner: selectedPartner.value } : {}),
  });

  const investmentData = data?.data || [];
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

        <div className="mb-4 flex justify-center">
          <div className="flex flex-col items-center gap-[5px]">
            <h1 className="text-[16px] font-[600]">Investor: {selectedPartner?.label || "N/A"}</h1>
            <p className="text-[12px] text-muted md:text-[14px]">
              Designation: {selectedPartner?.partnerDesignation || "N/A"}
            </p>
            <span className="text-[12px] text-muted md:text-[14px]">
              Joining Date:{" "}
              {selectedPartner?.joiningDate
                ? dateUtils.formateCreateOrUpdateDate(selectedPartner.joiningDate)
                : "N/A"}
            </span>
          </div>
        </div>

        <HorizontalLine className="my-[10px]" />

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
                        {dateUtils.formateCreateOrUpdateDate(investment.investmentDate)}
                      </span>
                    </td>

                    {/* investment amount */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment.investmentAmount}</span>
                    </td>

                    {/* investment note */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="text-sm">{investment.note}</span>
                    </td>

                    {/* attachment */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {investment.attachment ? (
                        <Link
                          target="_blank"
                          href={investment.attachment}
                          className="text-primary underline"
                        >
                          View
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-300">—</span>
                      )}
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
