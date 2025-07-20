"use client";

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
import PurchaseTimelineDropDown from "./PurchaseTimelineDropDown";
import ViewPurchase from "./ViewPurchase";
import DeletePurchaseById from "./DeletePurchaseById";

const tableHead = [
  { label: "Company Info", field: "companyInfo" },
  { label: "Name", field: "name" },
  { label: "Purchased Qty", field: "quantityPurchased" },
  { label: "Total Amount", field: "totalAmount" },
  { label: "Date", field: "createdAt" },
  { label: "Actions", field: "" },
];

const PurchaseListTable = () => {
  const [, /* searchTerm */ setSearchTerm] = useDebounce("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<Record<string, string | number>>({
    status: "",
    day_count: "",
  });

  const [isViewPurchase, setIsViewPurchase] = useState(false);
  const [purchaseItemView, setPurchaseItemView] = useState<IPurchase | null>(null);

  const mockPurchases = [
    {
      _id: "1",
      name: "Logitech MX Master 3",
      purchaseFrom: {
        companyName: "Tech Source Ltd.",
        companyAddress: "Dhaka, Bangladesh",
        contact: "+880123456789",
        companyInvoiceNo: "#1234567890",
        email: "techsource@gmail.com",
      },
      purchaseItems: [
        {
          product: "Logitech MX Master 3",
          quantity: 100,
          price: 8500,
          total: 850000,
        },
      ],
      totalAmount: 850000,
      createdAt: "2025-07-15T10:30:00Z",
    },
    {
      _id: "2",
      name: "Apple MacBook Air M2",
      purchaseFrom: {
        companyName: "Apple Resellers BD",
        companyAddress: "Gulshan, Dhaka",
        contact: "+880198765432",
        email: "apple@gmail.com",
        companyInvoiceNo: "#1234567890",
      },
      purchaseItems: [
        {
          product: "Apple MacBook Air M2",
          quantity: 20,
          price: 145000,
          total: 2900000,
        },
      ],
      totalAmount: 2900000,
      createdAt: "2025-07-10T14:15:00Z",
    },
    {
      _id: "3",
      name: "Buy monitor",
      purchaseFrom: {
        companyName: "SmartTech Bangladesh",
        companyAddress: "Banani, Dhaka",
        contact: "+880177665544",
        email: "smarttech@gmail.com",
        companyInvoiceNo: "#1234567890",
      },
      purchaseItems: [
        {
          product: 'Samsung 27" Curved Monitor',
          quantity: 50,
          price: 29500,
          total: 1475000,
        },
        {
          product: 'Samsung 22" Curved Monitor',
          quantity: 10,
          price: 29500,
          total: 295000,
        },
      ],
      totalAmount: 1475000,
      createdAt: "2025-07-05T09:45:00Z",
    },
  ];

  const isLoading = false;
  const data = {
    data: mockPurchases,
    meta: {
      totalDoc: mockPurchases.length,
      page: 1,
    },
  };

  const purchaseData = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const formatPrice = (price: number) => `৳${Math.round(price)}`;

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
                <PurchaseTimelineDropDown
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
                  {isLoading ? (
                    <TableSkeleton columns={tableHead.length} />
                  ) : (
                    purchaseData.map((purchase) => (
                      <tr key={purchase._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {purchase.purchaseFrom.companyName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {purchase.purchaseFrom.contact}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{purchase.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          {purchase.purchaseItems[0]?.quantity || 0} pcs
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                          {formatPrice(purchase.totalAmount)}
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
                            <DeletePurchaseById
                              // purchaseId={purchase._id}
                              purchaseName={purchase.name}
                            />
                            <button
                              onClick={() => handlePurchaseView(purchase)}
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
