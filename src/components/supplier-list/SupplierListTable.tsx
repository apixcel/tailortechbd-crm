"use client";

import { useDebounce } from "@/hooks";
import {
  useDeleteSupplierByIdMutation,
  useGetAllSuppliersQuery,
} from "@/redux/features/supplier/supplier.api";
import { ISupplier } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

import { GoPencil } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";

import {
  DeleteConfirmationDialog,
  HorizontalLine,
  Pagination,
  TableDataNotFound,
  TableSkeleton,
} from "@/components";
import { ViewSupplier } from "@/view";

const tableHead = [
  { label: "Supplier ID", field: "" },
  { label: "Supplier Name", field: "" },
  { label: "Contact Person", field: "" },
  { label: "Phone Number", field: "" },
  { label: "Email", field: "" },
  { label: "Address", field: "" },
  { label: "Supplied Products Categories", field: "" },
  { label: "Preferred Payment Method", field: "" },
  { label: "Supplier Document", field: "" },
  { label: "Notes", field: "" },
  { label: "Actions", field: "" },
];

const SupplierListTable = () => {
  const [isViewSupplier, setIsViewSupplier] = useState(false);
  const [supplierItemView, setSupplierItemView] = useState<ISupplier | null>(null);

  const [searchTerm, setSearchTerm] = useDebounce("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<Record<string, string | number>>({
    day_count: "",
  });

  const [deleteSupplier, { isLoading: isDeleting }] = useDeleteSupplierByIdMutation();
  const { data, isLoading } = useGetAllSuppliersQuery({ ...query, searchTerm, page });

  const supplierData = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const handleSupplierView = (supplier: ISupplier) => {
    setSupplierItemView(supplier);
    setIsViewSupplier(true);
    history.pushState({ viewSupplier: true }, "", location.href);
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsViewSupplier(false);
      setSupplierItemView(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      {!isViewSupplier ? (
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[15px] bg-white p-4">
            <div className="flex flex-col gap-[5px]">
              <h1 className="text-[16px] font-[600]">Supplier List</h1>
              <p className="text-[12px] text-muted md:text-[14px]">
                Displaying All the available suppliers in your store. There is total{" "}
                <span className="font-bold text-dashboard">{metaData.totalDoc}</span> suppliers.
                Data is divided into{" "}
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
                  placeholder="Search Supplier"
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
              <table className="min-w-[1400px] table-auto divide-y divide-dashboard/20">
                <thead className="bg-dashboard/10">
                  <tr>
                    {tableHead.map((heading) => (
                      <th
                        key={heading.field || heading.label}
                        className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap text-dashboard"
                      >
                        {heading.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <TableSkeleton columns={tableHead.length} />
                  ) : supplierData?.length ? (
                    supplierData.map((supplier) => (
                      <tr key={supplier._id} className="hover:bg-gray-50">
                        {/* Supplier ID */}
                        <td className="min-w-[120px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {supplier.supplierId}
                          </div>
                        </td>

                        {/* Supplier Name */}
                        <td className="min-w-[180px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        </td>

                        {/* Contact Person */}
                        <td className="min-w-[180px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {supplier.contactPerson}
                          </div>
                        </td>

                        {/* Phone Number */}
                        <td className="min-w-[150px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          <Link
                            href={`tel:${supplier.phoneNumber}`}
                            className="text-sm hover:underline"
                          >
                            {supplier.phoneNumber}
                          </Link>
                        </td>

                        {/* Email */}
                        <td className="min-w-[220px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          <Link
                            href={`mailto:${supplier.email}`}
                            className="text-sm hover:underline"
                          >
                            {supplier.email}
                          </Link>
                        </td>

                        {/* Address */}
                        <td className="min-w-[220px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          <span className="text-sm">{supplier.address}</span>
                        </td>

                        {/* Supplied Products Categories */}
                        <td className="min-w-[260px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          <div className="text-sm">
                            {supplier.suppliedProductsCategories.length ? (
                              supplier.suppliedProductsCategories.join(", ")
                            ) : (
                              <span className="text-primary">—</span>
                            )}
                          </div>
                        </td>

                        {/* Preferred Payment Method */}
                        <td className="min-w-[180px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          <div className="text-sm">{supplier.preferredPaymentMethod || "—"}</div>
                        </td>

                        {/* Supplier Document */}
                        <td className="min-w-[140px] px-6 py-4 align-top break-normal whitespace-nowrap">
                          {supplier.docuemnt ? (
                            <a
                              href={supplier.docuemnt}
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

                        {/* Notes (show full text; no truncation) */}
                        <td
                          className="min-w-[300px] px-6 py-4 align-top break-normal whitespace-nowrap"
                          title={supplier.notes || "—"}
                        >
                          <span className="text-sm">{supplier.notes || "—"}</span>
                        </td>

                        {/* Actions */}
                        <td className="min-w-[150px] px-6 py-4 align-top whitespace-nowrap">
                          <div className="flex items-center gap-[8px]">
                            <Link
                              href={`/supplier-list/${supplier._id}`}
                              className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                              title="Edit Supplier"
                            >
                              <GoPencil />
                            </Link>

                            <DeleteConfirmationDialog
                              entityId={supplier._id!}
                              entityName={supplier.name}
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
      ) : supplierItemView ? (
        <ViewSupplier setIsViewSupplier={setIsViewSupplier} supplierItem={supplierItemView} />
      ) : null}
    </>
  );
};

export default SupplierListTable;
