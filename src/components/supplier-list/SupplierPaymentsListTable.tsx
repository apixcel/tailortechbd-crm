"use client";

import { useDebounce } from "@/hooks";
import Link from "next/link";

import { GoPencil } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";

import {
  DeleteConfirmationDialog,
  HorizontalLine,
  Pagination,
  TableDataNotFound,
  TableSkeleton,
} from "@/components";
import {
  useDeleteSupplierPaymentByIdMutation,
  useGetAllSupplierPaymentsQuery,
} from "@/redux/features/supplierPayment/supplierPayment.api";
import dateUtils from "@/utils/date";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "" },
  { label: "Invoice No", field: "" },
  { label: "Invoice Bill Amount", field: "" },
  { label: "Advanced Amount", field: "" },
  { label: "Payment Method", field: "" },
  { label: "Payment Document", field: "" },
  { label: "Money Receipt", field: "" },
  { label: "Dues Amount", field: "" },
  { label: "Actions", field: "" },
];

const SupplierPaymentsListTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<Record<string, string | number>>({
    day_count: "",
  });

  const [deleteSupllierPayment, { isLoading: isDeleting }] = useDeleteSupplierPaymentByIdMutation();
  const { data, isLoading } = useGetAllSupplierPaymentsQuery({ ...query, searchTerm, page });

  const supplierPaymentsData = data?.data || [];
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
    <div className="mt-4 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-4">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Supplier Payments List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All the available suppliers payments in your store. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> suppliers. Data is
            divided into{" "}
            <span className="font-bold text-dashboard">
              {Math.ceil(metaData.totalDoc / 10)} pages
            </span>{" "}
            & currently showing page{" "}
            <span className="font-bold text-dashboard">{metaData.page}.</span>
          </p>
        </div>

        <HorizontalLine className="my-[10px]" />

        <div className="flex flex-col justify-between gap-[16px] md:flex-row md:items-center md:gap-[8px]">
          {/* search input */}
          <div className="flex w-full max-w-[300px] items-center rounded-[5px] border border-dashboard/20 p-[5px]">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Supplier Payment"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
            <RxMagnifyingGlass />
          </div>

          <Link
            href="/supplier-payments-list/create"
            className="rounded-[4px] bg-primary px-[14px] py-[8px] text-white"
          >
            Create Supplier Payment
          </Link>
        </div>

        {/* table */}
        <div className="overflow-x-auto bg-white shadow">
          <table className="min-w-full divide-y divide-dashboard/20">
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
              ) : supplierPaymentsData?.length ? (
                supplierPaymentsData.map((supllierPayment, index) => (
                  <tr key={supllierPayment._id} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                    </td>

                    {/* date */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {dateUtils.formatDate(supllierPayment.date)}
                      </span>
                    </td>

                    {/* invoice no */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {supllierPayment.invoiceNo}
                      </span>
                    </td>

                    {/* bill amount */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {supllierPayment.invoiceBillAmount}
                      </span>
                    </td>

                    {/* advanced amount */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {supllierPayment.advancedAmount}
                      </span>
                    </td>

                    {/* payment method */}
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-3">
                        <span className="text-sm">{supllierPayment.paymentMethod}</span>
                      </span>
                    </td>

                    {/* payment document */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {supllierPayment.paymentAttachment ? (
                        <Link
                          href={supllierPayment.paymentAttachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          View
                        </Link>
                      ) : (
                        <span className="text-primary">—</span>
                      )}
                    </td>

                    {/* money receipt */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {supllierPayment.moneyReceipt ? (
                        <Link
                          href={supllierPayment.moneyReceipt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          View
                        </Link>
                      ) : (
                        <span className="text-primary">—</span>
                      )}
                    </td>

                    {/* dues amount */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <span className="flex items-center gap-3">
                        <span className="text-sm">{supllierPayment.duesAmount}</span>
                      </span>
                    </td>

                    {/* actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-[8px]">
                        {/* update */}
                        <Link
                          href={`/supplier-list/${supllierPayment._id}`}
                          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                          title="Edit Supplier"
                        >
                          <GoPencil />
                        </Link>
                        {/* delete */}
                        <DeleteConfirmationDialog
                          entityId={supllierPayment._id}
                          entityName={supllierPayment.invoiceNo}
                          entityLabel="Payment"
                          onDelete={(id) => deleteSupllierPayment(id)}
                          isLoading={isDeleting}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Supplier Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        setPage={setPage}
        page={page}
        totalDocs={metaData.totalDoc}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default SupplierPaymentsListTable;
