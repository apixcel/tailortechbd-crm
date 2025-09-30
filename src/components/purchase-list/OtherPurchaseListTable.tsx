"use client";

import { useEffect, useState } from "react";
import HorizontalLine from "../ui/HorizontalLine";
import { useDebounce } from "@/hooks";
import TimelineDropDown from "../shared/TimelineDropDown";
import { RxMagnifyingGlass } from "react-icons/rx";
import { TableSkeleton, TableDataNotFound } from "@/components";
import Pagination from "../ui/Pagination";
import { GoPencil } from "react-icons/go";
import { DeleteConfirmationDialog } from "@/components";
import dateUtils from "@/utils/date";
import Link from "next/link";
import {
  useDeletePurchaseByIdMutation,
  useGetAllPurchasesQuery,
} from "@/redux/features/purchase/purchase.api";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "" },
  { label: "INV No", field: "invoiceNumber" },
  { label: "Supplier Name", field: "" },
  { label: "Product Name", field: "nme" },
  { label: "Brand", field: "" },
  { label: "Model", field: "" },
  { label: "SN", field: "" },
  { label: "QTY", field: "" },
  { label: "Unit Price", field: "" },
  { label: "Total Price", field: "" },
  { label: "Actions", field: "" },
];

type OtherPurchaseListTableProps = {
  type: "IT" | "ELECTRONIC" | "CIVIL" | "ELECTRICAL";
};

const OtherPurchaseListTable = ({ type }: OtherPurchaseListTableProps) => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<Record<string, string | number>>({
    day_count: "",
  });

  const { data, isLoading } = useGetAllPurchasesQuery({
    purchaseType: type,
    ...query,
    search: searchTerm,
  });
  const metaData = data?.meta;
  const purchaseData = data?.data;

  const [deletePurchase, { isLoading: isDeleting }] = useDeletePurchaseByIdMutation();

  const [isViewPurchase, setIsViewPurchase] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsViewPurchase(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      {!isViewPurchase ? (
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[15px] bg-white p-4">
            <div className="flex flex-col gap-[5px]">
              <h1 className="text-[16px] font-[600]">All {type} Purchases</h1>
              <p className="text-[12px] text-muted md:text-[14px]">
                Displaying all the available purchases in your Dashboard. There is total{" "}
                <span className="font-bold text-dashboard">{metaData?.totalDoc}</span> purchases.
                Data is Divided into{" "}
                <span className="font-bold text-dashboard">
                  {Math.ceil(metaData?.totalDoc || 0 / 10)} pages
                </span>{" "}
                & currently showing page{" "}
                <span className="font-bold text-dashboard">{metaData?.page}.</span>
              </p>
            </div>

            <HorizontalLine className="my-[10px]" />

            <div className="flex flex-col-reverse justify-between gap-[16px] xl:flex-row xl:items-center xl:gap-[8px]">
              {/* search input */}
              <div className="flex w-full items-center rounded-[5px] border border-dashboard/20 p-[5px] xl:max-w-[300px]">
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

              <div className="flex flex-col gap-[10px] sm:flex-row sm:items-end">
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
                  ) : purchaseData?.length ? (
                    purchaseData.map((purchase, index) => (
                      <tr key={purchase._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td>{dateUtils.formatDate(purchase.createdAt)}</td>
                        <td className="px-6 py-4">{purchase.invoiceNumber}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {purchase.supplier?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {purchase.supplier?.phoneNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{purchase.products?.[0]?.productName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{purchase.products?.[0]?.brand}</td>
                        <td className="px-6 py-4">{purchase.products?.[0]?.model}</td>
                        <td className="px-6 py-4">{purchase.products?.[0]?.sn}</td>
                        <td className="px-6 py-4">{purchase.products?.[0]?.quantity}</td>
                        <td className="px-6 py-4">{purchase.products?.[0]?.price ?? "-"}</td>
                        <td className="px-6 py-4">
                          {(purchase.products?.[0]?.price ?? 0) *
                            (purchase.products?.[0]?.quantity ?? 0)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-[8px]">
                            {/* update */}
                            <Link
                              href={`/purchase-list/${purchase._id}?type=${type}`}
                              className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                              title="Edit Purchase"
                            >
                              <GoPencil />
                            </Link>

                            {/* delete */}
                            <DeleteConfirmationDialog
                              entityId={purchase._id}
                              entityName={purchase.productName}
                              entityLabel="Purchase"
                              onDelete={(id) => deletePurchase({ purchaseId: id })}
                              isLoading={isDeleting}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <TableDataNotFound span={tableHead.length} message="No Purchase Found" />
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            setPage={setPage}
            page={page}
            totalDocs={metaData?.totalDoc || 0}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      ) : null}
    </>
  );
};

export default OtherPurchaseListTable;
