"use client";

import { useDebounce } from "@/hooks";
import {
  useDeletePurchaseByIdMutation,
  useGetAllPurchasesQuery,
} from "@/redux/features/purchase/purchase.api";
import { IPurchase } from "@/types";
import dateUtils from "@/utils/date";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FiEye } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";

import {
  DeleteConfirmationDialog,
  HorizontalLine,
  Pagination,
  TableDataNotFound,
  TableSkeleton,
  TimelineDropDown,
} from "@/components";
import { ViewPurchase } from "@/view";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Date", field: "" },
  { label: "INV No", field: "invoiceNumber" },
  { label: "Supplier Name", field: "" },
  { label: "Category", field: "" },
  { label: "Sub Category", field: "" },
  { label: "Purchase Name", field: "nme" },
  { label: "Size", field: "" },
  { label: "Color", field: "" },
  { label: "QTY", field: "" },
  { label: "Unit Price", field: "" },
  { label: "Total Price", field: "" },
  { label: "Actions", field: "" },
];

const ApparelPurchaseListTable = () => {
  const [isViewPurchase, setIsViewPurchase] = useState(false);
  const [purchaseItemView, setPurchaseItemView] = useState<IPurchase | null>(null);

  const [searchTerm, setSearchTerm] = useDebounce("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<Record<string, string | number>>({
    day_count: "",
    purchaseType: "APPAREL",
  });

  const [deletePurchase, { isLoading: isDeleting }] = useDeletePurchaseByIdMutation();
  const { data, isLoading } = useGetAllPurchasesQuery({ ...query, searchTerm, page });

  const purchaseData = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const handlePurchaseView = (purchase: IPurchase) => {
    setPurchaseItemView(purchase);
    setIsViewPurchase(true);
    history.pushState({ viewPurchase: true }, "", location.href);
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsViewPurchase(false);
      setPurchaseItemView(null);
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
              <h1 className="text-[16px] font-[600]">All Apparel Purchases</h1>
              <p className="text-[12px] text-muted md:text-[14px]">
                Displaying all the available purchases in your Dashboard. There is total{" "}
                <span className="font-bold text-dashboard">{metaData.totalDoc}</span> purchases.
                Data is Divided into{" "}
                <span className="font-bold text-dashboard">
                  {Math.ceil(metaData.totalDoc / 10)} pages
                </span>{" "}
                & currently showing page{" "}
                <span className="font-bold text-dashboard">{metaData.page}.</span>
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
                  ) : purchaseData.length ? (
                    purchaseData.map((purchase: IPurchase, idx) => (
                      <tr key={purchase._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{idx + 1}</td>
                        <td className="px-6 py-4">{dateUtils.formatDate(purchase.createdAt)}</td>
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
                          {typeof purchase.products[0]?.category === "object"
                            ? purchase.products[0]?.category?.label
                            : purchase.products[0]?.category}
                        </td>
                        <td className="px-6 py-4">
                          {typeof purchase.products[0]?.category === "object" &&
                          purchase.products[0]?.category?.subcategories?.[0]
                            ? purchase.products[0]?.category?.subcategories?.[0]?.label
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{purchase.purchaseTitle}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {purchase.products[0]?.colors?.[0]?.sizes?.[0]?.size ?? "-"}
                        </td>
                        <td className="px-6 py-4">
                          {purchase.products[0]?.colors?.[0]?.color ?? "-"}
                        </td>
                        {/* Total quantity */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          {purchase.products.reduce(
                            (sum, item) =>
                              sum +
                              (item.colors?.reduce(
                                (colorSum, c) =>
                                  colorSum +
                                  (c.sizes?.reduce(
                                    (sizeSum, sz) => sizeSum + Number(sz.quantity || 0),
                                    0
                                  ) ?? 0),
                                0
                              ) ?? 0),
                            0
                          )}{" "}
                          pcs
                        </td>
                        {/* Unit price */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          {purchase.products[0]?.price} BDT
                        </td>
                        {/* Total Amount */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          {purchase.products
                            .reduce(
                              (sum, item) =>
                                sum +
                                item.price *
                                  (item.colors?.reduce(
                                    (colorSum, color) =>
                                      colorSum +
                                      (color.sizes?.reduce(
                                        (sizeSum, size) => sizeSum + Number(size.quantity || 0),
                                        0
                                      ) ?? 0),
                                    0
                                  ) ?? 0),
                              0
                            )
                            .toFixed(2)}{" "}
                          BDT
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-[8px]">
                            {/* update */}
                            <Link
                              href={`/purchase-list/${purchase._id}?type=apparel`}
                              className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                              title="Edit Purchase"
                            >
                              <GoPencil />
                            </Link>

                            {/* delete */}
                            <DeleteConfirmationDialog
                              entityId={purchase._id}
                              entityName={purchase.purchaseTitle}
                              entityLabel="Purchase"
                              onDelete={(id) => deletePurchase({ purchaseId: id })}
                              isLoading={isDeleting}
                            />
                            {/* view */}
                            <button
                              onClick={() => handlePurchaseView(purchase as IPurchase)}
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
                    <TableDataNotFound span={tableHead.length} message="No Purchase Found" />
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
      ) : purchaseItemView ? (
        <ViewPurchase setIsViewPurchase={setIsViewPurchase} purchaseItem={purchaseItemView} />
      ) : null}
    </>
  );
};

export default ApparelPurchaseListTable;
