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
} from "@/components";
import { ViewSupplier } from "@/view";
import { truncateWords } from "@/utils";

const supplierData = [
  {
    _id: "1",
    supplierId: "SUP-001",
    supplierName: "ABC Garments",
    contactPerson: "Mr. Karim",
    phoneNumber: "0123456789",
    email: "abc@garments.com",
    address: "123 Street, Dhaka",
    suppliedProductsCategories: ["Clothing", "Accessories"],
    preferredPaymentMethod: "Bank Transfer",
    attachment: "https://example.com/attachment.pdf",
    notes: "Long-term supplier with good payment history.",
  },
  {
    _id: "2",
    supplierId: "SUP-002",
    supplierName: "XYZ Fabrics",
    contactPerson: "Ms. Rina",
    phoneNumber: "0198765432",
    email: "xyz@fabrics.com",
    address: "45 Textile Road, Chittagong",
    suppliedProductsCategories: ["Fabrics", "Textiles"],
    preferredPaymentMethod: "Cash",
    notes: "Specializes in premium fabrics, quick delivery.",
  },
  {
    _id: "3",
    supplierId: "SUP-003",
    supplierName: "Global Accessories Ltd.",
    contactPerson: "Mr. Hasan",
    phoneNumber: "01722334455",
    email: "contact@globalacc.com",
    address: "22 Market Street, Narayanganj",
    suppliedProductsCategories: ["Zippers", "Buttons", "Labels"],
    preferredPaymentMethod: "Cheque",
    attachment: "https://example.com/globalacc-invoice.pdf",
    notes: "Reliable supplier for garment accessories.",
  },
  {
    _id: "4",
    supplierId: "SUP-004",
    supplierName: "Fresh Cotton Mills",
    contactPerson: "Mrs. Sultana",
    phoneNumber: "01655443322",
    email: "freshcotton@mills.com",
    address: "Industrial Area, Gazipur",
    suppliedProductsCategories: ["Cotton", "Threads"],
    preferredPaymentMethod: "Bank Transfer",
    notes: "High-quality cotton supplier, requires advance payment.",
  },
  {
    _id: "5",
    supplierId: "SUP-005",
    supplierName: "Modern Packaging Ltd.",
    contactPerson: "Mr. Rakib",
    phoneNumber: "01899001122",
    email: "info@modernpack.com",
    address: "Packaging Zone, Savar",
    suppliedProductsCategories: ["Packaging Boxes", "Poly Bags"],
    preferredPaymentMethod: "Online Payment",
    attachment: "https://example.com/modernpack-terms.pdf",
    notes: "Flexible supplier for packaging needs.",
  },
];

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

  // const supplierData = data?.data || [];
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
              <table className="min-w-full divide-y divide-dashboard/20">
                {/* table head */}
                <thead className="bg-dashboard/10">
                  <tr>
                    {tableHead.map((heading) => (
                      <th
                        key={heading.field || heading.label}
                        className="px-6 py-3 text-left text-sm font-semibold text-dashboard"
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
                        {/* supplier id */}
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {supplier.supplierId}
                          </div>
                        </td>

                        {/* name */}
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {supplier.supplierName}
                          </div>
                        </td>

                        {/* contact person */}
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {supplier.contactPerson}
                          </div>
                        </td>

                        {/* phone number */}
                        <td className="px-6 py-4">
                          <Link
                            href={`tel:${supplier.phoneNumber}`}
                            className="text-sm hover:underline"
                          >
                            {supplier.phoneNumber}
                          </Link>
                        </td>

                        {/* email */}
                        <td className="px-6 py-4">
                          <Link
                            href={`mailto:${supplier.email}`}
                            className="text-sm hover:underline"
                          >
                            {supplier.email}
                          </Link>
                        </td>

                        {/* address */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{supplier.address}</span>
                          </div>
                        </td>

                        {/* supplied products categories */}
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {supplier.suppliedProductsCategories.length > 0 ? (
                              supplier.suppliedProductsCategories.join(", ")
                            ) : (
                              <span className="text-primary">—</span>
                            )}
                          </div>
                        </td>

                        {/* preferred payment method */}
                        <td className="px-6 py-4">
                          <div className="text-sm">{supplier.preferredPaymentMethod || "—"}</div>
                        </td>

                        {/* document */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          {supplier.attachment ? (
                            <a
                              href={supplier.attachment}
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

                        {/* notes */}
                        <td
                          className="px-6 py-4 text-sm whitespace-nowrap text-gray-700"
                          title={supplier.notes || "-"}
                        >
                          {truncateWords(supplier.notes || "-", 4)}
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
                              entityName={supplier.supplierName}
                              entityLabel="Supplier"
                              onDelete={(id) => deleteSupplier({ supplierId: id })}
                              isLoading={isDeleting}
                            />

                            {/* view */}
                            <button
                              // onClick={() => handleSupplierView(supplier)}
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
