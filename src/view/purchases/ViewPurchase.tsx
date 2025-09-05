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
  { label: "Category" },
  { label: "Color & Size" },
  { label: "Quantity", field: "quantity" },
  { label: "Unit Price", field: "price" },
  { label: "Total", field: "total" },
];

const ViewPurchase = ({ setIsViewPurchase, purchaseItem }: ViewPurchaseProps) => {
  return (
    <div className="rounded-md bg-white p-6">
      <button
        onClick={() => setIsViewPurchase(false)}
        className="mb-5 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
      >
        <BsArrowLeft size={14} />
      </button>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Supplier Information */}
        <div className="rounded-md border border-border-muted bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-dashboard">Supplier Information</h2>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-col gap-2">
              <p>
                <span className="text-[14px] font-[700] text-primary">Name: </span>
                {purchaseItem?.supplier?.name}
              </p>
              <p>
                <span className="text-[14px] font-[700] text-primary">Address: </span>
                {purchaseItem?.supplier?.address || "N/A"}
              </p>

              <p>
                <span className="text-[14px] font-[700] text-primary">Phone: </span>
                <Link
                  className="hover:underline"
                  href={`tel:${purchaseItem?.supplier?.phoneNumber}`}
                >
                  {purchaseItem?.supplier?.phoneNumber || "N/A"}
                </Link>
              </p>

              <p>
                <span className="text-[14px] font-[700] text-primary">Email: </span>
                <Link className="hover:underline" href={`mailto:${purchaseItem?.supplier?.email}`}>
                  {purchaseItem?.supplier?.email || "N/A"}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Purchase summary */}
        <div className="rounded-md border border-border-muted bg-white p-6">
          <h2 className="mb-[16px] text-[20px] font-semibold">Purchase Summary</h2>
          <div className="space-y-2">
            <p>
              <span className="text-[14px] font-[700] text-primary">Invoice Number: </span>
              {purchaseItem?.invoiceNumber || "N/A"}
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
              <span className="text-[14px] font-[700] text-primary">Total Quantity: </span>
              {purchaseItem?.products.reduce(
                (sum, item) =>
                  sum +
                  item.colors.reduce(
                    (sum, c) => sum + c.sizes.reduce((s, sz) => s + Number(sz.quantity || 0), 0),
                    0
                  ),
                0
              )}{" "}
              pcs
            </p>
            <p>
              <span className="text-[14px] font-[700] text-primary">Total Amount: </span>
              {purchaseItem?.products
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
            </p>
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
            <tbody className="divide-y divide-gray-200 bg-white">
              {purchaseItem?.products?.map((product, index) => {
                const totalQuantity = product.colors.reduce(
                  (colorSum, color) =>
                    colorSum +
                    color.sizes.reduce((sizeSum, size) => sizeSum + Number(size.quantity || 0), 0),
                  0
                );

                const totalPrice = totalQuantity * product.price;

                // Create a string like: Black - M (20), L (15), Red - XL (5)
                const colorSizeString = product.colors
                  .map((color) => {
                    const sizes = color.sizes
                      .map((size) => `${size.size} (${size.quantity})`)
                      .join(", ");
                    return `${color.color} - ${sizes}`;
                  })
                  .join(", ");

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* Index */}
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

                    {/* Product */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.images?.[0] || "/placeholder.jpg"}
                          width={0}
                          height={0}
                          alt={`${product.productName || "Product"} image`}
                          className="h-12 w-12 object-contain object-center"
                        />
                        <span>{product.productName}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {typeof product.category === "object" &&
                      product.category !== null &&
                      "label" in product.category
                        ? (product.category as { label: string }).label
                        : typeof product.category === "string"
                          ? product.category
                          : "N/A"}
                    </td>

                    {/* Color & Size */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {colorSizeString}
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {totalQuantity} pcs
                    </td>

                    {/* Unit Price */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {product.price} BDT
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {totalPrice} BDT
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!purchaseItem?.products?.length && (
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
