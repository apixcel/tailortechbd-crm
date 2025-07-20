"use client";

import { IPurchase } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

type ViewPurchaseProps = {
  setIsViewPurchase: React.Dispatch<React.SetStateAction<boolean>>;
  purchaseItem: IPurchase;
};

const tableHead = [
  { label: "#" },
  { label: "Product" },
  { label: "Quantity", field: "quantity" },
  { label: "Unit Price", field: "price" },
  { label: "Total", field: "total" },
];

const ViewPurchase = ({ setIsViewPurchase, purchaseItem }: ViewPurchaseProps) => {
  return (
    <div className="mb-32 rounded-md bg-white p-6">
      <button
        onClick={() => setIsViewPurchase(false)}
        className="mb-5 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
      >
        <BsArrowLeft size={14} />
      </button>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Company information */}
        <div className="rounded-md border border-border-muted bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-dashboard">Company Information</h2>

          <div className="space-y-2">
            <div className="h-14 w-14 overflow-hidden rounded-full border border-border-muted object-cover object-center">
              <Image
                src={"/images/avatar.jpg"}
                width={100}
                height={100}
                alt={`${purchaseItem?.purchaseFrom?.companyName || "Company"} avatar`}
              />
            </div>

            <p>
              <span className="text-[14px] font-[700] text-primary">Name: </span>
              {purchaseItem?.purchaseFrom?.companyName}
            </p>
            <div className="flex flex-col gap-2">
              <p>
                <span className="text-[14px] font-[700] text-primary">Call: </span>
                <Link
                  className="hover:underline"
                  href={`tel:${purchaseItem?.purchaseFrom?.contact}`}
                >
                  {purchaseItem?.purchaseFrom?.contact || "N/A"}
                </Link>
              </p>

              <p>
                <span className="text-[14px] font-[700] text-primary">Email: </span>
                <Link
                  className="hover:underline"
                  href={`mailto:${purchaseItem?.purchaseFrom?.email}`}
                >
                  {purchaseItem?.purchaseFrom?.email || "N/A"}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Shipping information */}
        <div className="w-full rounded-md border border-border-muted bg-white p-6">
          <h2 className="mb-[16px] text-[20px] font-semibold text-dashboard">
            Shipping Information
          </h2>
          <div className="w-full space-y-2">
            <p>
              <span className="text-[14px] font-[700] text-primary">Name: </span>
              {purchaseItem?.purchaseFrom?.companyName}
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">Division: </span>
              {purchaseItem?.purchaseFrom?.companyAddress}
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">District: </span>
              {purchaseItem?.purchaseFrom?.companyAddress}
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">Upazila/City: </span>
              {purchaseItem?.purchaseFrom?.companyAddress}
            </p>
            <p className="flex w-full flex-col gap-[10px]">
              <span className="text-[14px] font-[700] text-primary">Shipping Address: </span>
              <span className="w-full rounded-[5px] bg-primary/5 p-[8px]">
                {purchaseItem?.purchaseFrom?.companyAddress}
              </span>
            </p>
          </div>
        </div>

        {/* Purchase summary */}
        <div className="rounded-md border border-border-muted bg-white p-6">
          <h2 className="mb-[16px] text-[20px] font-semibold">Purchase Summary</h2>
          <div className="space-y-2">
            <p>
              <span className="text-[14px] font-[700] text-primary">Company Invoice No: </span>
              {purchaseItem?.purchaseFrom?.companyInvoiceNo || "N/A"}
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">Purchase Date: </span>
              {purchaseItem?.createdAt
                ? new Date(purchaseItem.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">Total Amount: </span>
              {Math.round(purchaseItem?.totalAmount || 0)} BDT
            </p>
          </div>
        </div>
      </div>

      {/* purchased items */}
      <div className="mt-6 mb-6 rounded-md border border-border-muted bg-white p-6">
        <div className="mb-[10px] flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold">Purchased Items</h2>
        </div>
        {/* Purchase items table */}
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
              {purchaseItem?.purchaseItems?.map((purchase, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={"/placeholder/mouse.jpg"}
                        width={0}
                        height={0}
                        alt={purchase.product}
                        className="h-16 w-16 object-contain object-center"
                      />
                      <span className="text-sm">{purchase.product}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                    {purchase.quantity || 0} pcs
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                    {purchase.price} BDT
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{purchase.total} BDT</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!purchaseItem?.purchaseItems?.length && (
            <div className="py-12 text-center">
              <div className="text-lg text-gray-500">No orders found</div>
              <p className="mt-2 text-gray-400">Try changing your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPurchase;
