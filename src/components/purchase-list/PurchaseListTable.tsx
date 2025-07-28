"use client";

import {
  useDeletePurchaseByIdMutation,
  useGetAllPurchasesQuery,
} from "@/redux/features/purchase/purchase.api";
import { useDebounce } from "@/hooks";
import dateUtils from "@/utils/date";
import { useEffect, useState } from "react";
import { IPurchase } from "@/types";
import Link from "next/link";

import { RxMagnifyingGlass } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { FiEye } from "react-icons/fi";

import HorizontalLine from "../ui/HorizontalLine";
import TableSkeleton from "../ui/TableSkeleton";
import Pagination from "../ui/Pagination";
import TimelineDropDown from "../shared/TimelineDropDown";
import DeleteConfirmationDialog from "../shared/DeleteConfirmationDialog";
import { ViewPurchase } from "@/view";

const tableHead = [
  { label: "Supplier Info", field: "companyInfo" },
  { label: "Purchase Title", field: "name" },
  { label: "Purchased Qty", field: "quantityPurchased" },
  { label: "Total Amount", field: "totalAmount" },
  { label: "Date", field: "createdAt" },
  { label: "Actions", field: "" },
];

const PurchaseListTable = () => {
  const [isViewPurchase, setIsViewPurchase] = useState(false);
  const [purchaseItemView, setPurchaseItemView] = useState<IPurchase | null>(null);

  const [searchTerm, setSearchTerm] = useDebounce("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<Record<string, string | number>>({
    day_count: "",
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
              <h1 className="text-[16px] font-[600]">Purchase List</h1>
              <p className="text-[12px] text-muted md:text-[14px]">
                Displaying All the available purchases in your store. There is total{" "}
                <span className="font-bold text-dashboard">{metaData.totalDoc}</span> purchases.
              </p>
            </div>
            <HorizontalLine className="my-[10px]" />

            <div className="flex flex-col justify-between gap-[16px] md:flex-row md:items-center md:gap-[8px]">
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
              <div>
                <TimelineDropDown
                  onSelect={({ value }) => {
                    setQuery({ ...query, day_count: value });
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Table */}
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
                  {isLoading && purchaseData.length > 0 ? (
                    <TableSkeleton columns={tableHead.length} />
                  ) : (
                    purchaseData.map((purchase) => (
                      <tr key={purchase._id} className="hover:bg-gray-50">
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
                            <span className="text-sm">{purchase.purchaseTitle}</span>
                          </div>
                        </td>
                        {/* Total Quantity */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          {purchase.products.reduce(
                            (sum, item) =>
                              sum +
                              item.colors.reduce(
                                (sum, c) =>
                                  sum + c.sizes.reduce((s, sz) => s + Number(sz.quantity || 0), 0),
                                0
                              ),
                            0
                          )}{" "}
                          pcs
                        </td>
                        {/* Total Amount */}
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          {purchase.products
                            .reduce(
                              (sum, item) =>
                                sum +
                                item.price *
                                  item.colors.reduce(
                                    (colorSum, color) =>
                                      colorSum +
                                      color.sizes.reduce(
                                        (sizeSum, size) => sizeSum + Number(size.quantity || 0),
                                        0
                                      ),
                                    0
                                  ),
                              0
                            )
                            .toFixed(2)}{" "}
                          BDT
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {dateUtils.formateCreateOrUpdateDate(purchase.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-[8px]">
                            <Link
                              href={`/purchase-list/${purchase._id}`}
                              className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                              title="Edit Purchase"
                            >
                              <GoPencil />
                            </Link>
                            <DeleteConfirmationDialog
                              entityId={purchase._id}
                              entityName={purchase.purchaseTitle}
                              entityLabel="Purchase"
                              onDelete={(id) => deletePurchase({ purchaseId: id })}
                              isLoading={isDeleting}
                            />
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
                  )}
                </tbody>
              </table>

              {!purchaseData.length && (
                <div className="py-12 text-center">
                  <div className="text-lg text-gray-500">No orders found</div>
                  <p className="mt-2 text-gray-400">Try changing your search criteria</p>
                </div>
              )}
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

export default PurchaseListTable;
