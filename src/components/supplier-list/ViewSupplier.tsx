"use client";

import { ISupplier } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

type ViewSupplierProps = {
  setIsViewSupplier: React.Dispatch<React.SetStateAction<boolean>>;
  supplierItem: ISupplier;
};

const tableHead = [
  { label: "#" },
  { label: "Product" },
  { label: "Category" },
  { label: "Color & Size" },
  { label: "Quantity", field: "quantity" },
  { label: "Unit Price", field: "price" },
  { label: "Total", field: "total" },
];

const ViewSupplier = ({ setIsViewSupplier, supplierItem }: ViewSupplierProps) => {
  return (
    <div className="rounded-md bg-white p-6">
      <button
        onClick={() => setIsViewSupplier(false)}
        className="mb-5 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
      >
        <BsArrowLeft size={14} />
      </button>

      {/* Supplier Information */}
      <div className="rounded-md border border-border-muted bg-white p-6">
        <h2 className="lg:mb-0 mb-4 text-xl font-semibold text-dashboard">Supplier Information</h2>
        <div className="flex flex-col items-center gap-6">
          <div className="h-25 w-25 overflow-hidden rounded-full border border-border-muted object-cover object-center">
            <Image
              src={"/images/avatar.jpg"}
              width={200}
              height={200}
              alt={`${supplierItem?.name || "Company"} avatar`}
            />
          </div>

          <div className="flex gap-6 flex-wrap xl:justify-start justify-center">
            <div className="flex flex-col gap-2 items-center">
            <p>
              <span className="text-[14px] font-[700] text-primary">Name: </span>
              {supplierItem?.name}
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">Address: </span>
              {supplierItem?.address || "N/A"}
            </p>
            </div>

            <div className="flex flex-col gap-2 items-center">
            <p>
              <span className="text-[14px] font-[700] text-primary">Phone: </span>
              <Link className="hover:underline" href={`tel:${supplierItem?.phoneNumber}`}>
                {supplierItem?.phoneNumber || "N/A"}
              </Link>
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">Email: </span>
              <Link className="hover:underline" href={`mailto:${supplierItem?.email}`}>
                {supplierItem?.email || "N/A"}
              </Link>
            </p>
            </div>

            <div className="flex flex-col gap-2 items-center">
            <p>
              <span className="text-[14px] font-[700] text-primary">Total Qty Purchased: </span>
              100 pcs
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">Total Amount: </span>
              1000000 BDT
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* purchased products */}
      <div className="mt-6 mb-6 rounded-md border border-border-muted bg-white p-6">
        <div className="mb-[10px] flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold">Purchased Products</h2>
        </div>
        {/* Purchase products table */}
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
          </table>

          {/* {!supplierItem?.purchasedProducts?.length && (
            <div className="py-12 text-center">
              <div className="text-lg text-gray-500">No orders found</div>
              <p className="mt-2 text-gray-400">Try changing your search criteria</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ViewSupplier;
