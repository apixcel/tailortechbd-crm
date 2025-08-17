"use client";

import {
  useDeleteSupplierByIdMutation,
  useGetAllSuppliersQuery,
} from "@/redux/features/supplier/supplier.api";
import { useDebounce } from "@/hooks";
import Link from "next/link";

import { RxMagnifyingGlass } from "react-icons/rx";
import { GoPencil } from "react-icons/go";

import {
  HorizontalLine,
  TableDataNotFound,
  TableSkeleton,
  Pagination,
  DeleteConfirmationDialog,
} from "@/components";
import { truncateWords } from "@/utils";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useState } from "react";

const supplierPaymentsData = [
  {
    _id: "1",
    date: "24/06/2025",
    invoiceNo: "#INV-001",
    invoiceBillAmount: 2000,
    advancedAmount: 1500,
    paymentMethod: "Bank Transfer",
    paymentAttachment: "https://example.com/attachments/inv-001.pdf",
    moneyReceipt: "https://example.com/receipts/rec-001.pdf",
    duesAmount: 500,
  },
  {
    _id: "2",
    date: "02/07/2025",
    invoiceNo: "#INV-002",
    invoiceBillAmount: 3500,
    advancedAmount: 1000,
    paymentMethod: "Cash",
    paymentAttachment: "https://example.com/attachments/inv-002.pdf",
    moneyReceipt: "https://example.com/receipts/rec-002.pdf",
    duesAmount: 2500,
  },
  {
    _id: "3",
    date: "15/07/2025",
    invoiceNo: "#INV-003",
    invoiceBillAmount: 5000,
    advancedAmount: 5000,
    paymentMethod: "Credit Card",
    paymentAttachment: "https://example.com/attachments/inv-003.pdf",
    moneyReceipt: "https://example.com/receipts/rec-003.pdf",
    duesAmount: 0,
  },
  {
    _id: "4",
    date: "22/07/2025",
    invoiceNo: "#INV-004",
    invoiceBillAmount: 4200,
    advancedAmount: 3000,
    paymentMethod: "Mobile Banking",
    paymentAttachment: "https://example.com/attachments/inv-004.pdf",
    moneyReceipt: "https://example.com/receipts/rec-004.pdf",
    duesAmount: 1200,
  },
  {
    _id: "5",
    date: "30/07/2025",
    invoiceNo: "#INV-005",
    invoiceBillAmount: 2750,
    advancedAmount: 1000,
    paymentMethod: "Cheque",
    paymentAttachment: "https://example.com/attachments/inv-005.pdf",
    moneyReceipt: "https://example.com/receipts/rec-005.pdf",
    duesAmount: 1750,
  },
  {
    _id: "6",
    date: "05/08/2025",
    invoiceNo: "#INV-006",
    invoiceBillAmount: 6000,
    advancedAmount: 2500,
    paymentMethod: "Bank Transfer",
    paymentAttachment: "https://example.com/attachments/inv-006.pdf",
    moneyReceipt: "https://example.com/receipts/rec-006.pdf",
    duesAmount: 3500,
  },
];

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

  const [deleteSupplier, { isLoading: isDeleting }] = useDeleteSupplierByIdMutation();
  //   const { data, isLoading } = useGetAllSuppliersQuery({ ...query, searchTerm, page });

  // const supplierData = data?.data || [];
  //   const metaData = data?.meta || { totalDoc: 0, page: 1 };
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
                supplierPaymentsData.map((supplier, index) => (
                  <tr key={supplier._id} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                    </td>

                    {/* date */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{supplier.date}</div>
                    </td>

                    {/* invoice no */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{supplier.invoiceNo}</div>
                    </td>

                    {/* bill amount */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {supplier.invoiceBillAmount}
                      </div>
                    </td>

                    {/* advanced amount */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {supplier.advancedAmount}
                      </div>
                    </td>

                    {/* payment method */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{supplier.paymentMethod}</span>
                      </div>
                    </td>

                    {/* payment document */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {supplier.paymentAttachment ? (
                        <a
                          href={supplier.paymentAttachment}
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

                    {/* money receipt */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {supplier.moneyReceipt ? (
                        <a
                          href={supplier.moneyReceipt}
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

                    {/* dues amount */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{supplier.duesAmount}</span>
                      </div>
                    </td>

                    {/* actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-[8px]">
                        {/* update */}
                        <Link
                          href={`/supplier-list/${supplier._id}`}
                          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                          title="Edit Supplier"
                        >
                          <GoPencil />
                        </Link>
                        {/* delete */}
                        <DeleteConfirmationDialog
                          entityId={supplier._id!}
                          entityName={supplier.invoiceNo}
                          entityLabel="Supplier"
                          onDelete={(id) => deleteSupplier({ supplierId: id })}
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
