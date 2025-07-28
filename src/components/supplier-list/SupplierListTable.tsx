"use client";

import {
  useDeleteSupplierByIdMutation,
  useGetAllSuppliersQuery,
} from "@/redux/features/supplier/supplier.api";
import { useDebounce } from "@/hooks";
import { useEffect, useState } from "react";
import { ISupplier } from "@/types";
import Link from "next/link";

import { RxMagnifyingGlass } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { FiEye } from "react-icons/fi";

import {
  HorizontalLine,
  TableDataNotFound,
  TableSkeleton,
  Pagination,
  DeleteConfirmationDialog,
  TimelineDropDown,
} from "@/components";
import { ViewSupplier } from "@/view";

const tableHead = [
  { label: "Supplier Name", field: "companyInfo" },
  { label: "Address", field: "" },
  { label: "Contacts", field: "name" },
  { label: "Total Qty", field: "quantityPurchased" },
  { label: "Total Amount", field: "totalAmount" },
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
                  placeholder="Search Purchase"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
                <RxMagnifyingGlass />
              </div>
              {/* timeline dropdown */}
              <div>
                <TimelineDropDown
                  onSelect={({ value }) => {
                    setQuery({ ...query, day_count: value });
                    setPage(1);
                  }}
                />
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
                        className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-dashboard uppercase"
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
                    supplierData.map((supplier: ISupplier) => (
                      <tr key={supplier._id} className="hover:bg-gray-50">
                        {/* name */}
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        </td>
                        {/* address */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{supplier.address}</span>
                          </div>
                        </td>
                        {/* contacts */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <Link
                              href={`tel:${supplier.phoneNumber}`}
                              className="text-sm hover:underline"
                            >
                              {supplier.phoneNumber}
                            </Link>
                            <Link
                              href={`mailto:${supplier.email}`}
                              className="text-sm hover:underline"
                            >
                              {supplier.email}
                            </Link>
                          </div>
                        </td>
                        {/* total quantity */}
                        <td className="px-6 py-4">
                          <div className="text-sm">100 pcs</div>
                        </td>
                        {/* total amount */}
                        <td className="px-6 py-4">
                          <div className="text-sm">1000000 BDT</div>
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
                              entityName={supplier.name}
                              entityLabel="Supplier"
                              onDelete={(id) => deleteSupplier({ supplierId: id })}
                              isLoading={isDeleting}
                            />

                            {/* view */}
                            <button
                              onClick={() => handleSupplierView(supplier as ISupplier)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-dashboard/20 text-dashboard transition-all duration-200 hover:border-dashboard/40 hover:bg-dashboard/10 hover:text-dashboard/80"
                              title="View Details"
                            >
                              <FiEye className="h-4 w-4" />
                            </button>
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
