"use client";
import { useLazyGetAllPurchasesQuery } from "@/redux/features/purchase/purchase.api";
import { IProduct, IPurchase } from "@/types";
import { formatCurrency } from "@/utils/currency";
import dateUtils from "@/utils/date";
import { useRef, useState } from "react";
import { PiPrinterFill } from "react-icons/pi";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";
import HorizontalLine from "../ui/HorizontalLine";

const sumQty = (product: IProduct) =>
  product.colors?.reduce((acc, c) => {
    const s = c.sizes?.reduce((a, sz) => a + (Number(sz.quantity) || 0), 0) || 0;
    return acc + s;
  }, 0) || 0;

const PurchaseReportDialog = () => {
  const [show, setShow] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [values, setValues] = useState([
    new DateObject().subtract(1, "days"),
    new DateObject().add(6, "days"),
  ]);

  const [trigger, { data, isFetching, isError }] = useLazyGetAllPurchasesQuery();

  const handleFetch = async () => {
    const data = await trigger({
      startDate: values[0].format(),
      endDate: values[1].format(),
    });

    if (!data.data?.data?.length) {
      toast.error("No Data Found in this date range");
    } else {
      setShowReport(true);
    }
  };

  const purchases: IPurchase[] = data?.data || [];

  // build rows + totals on each render (no memoization)
  const items =
    purchases.flatMap((p) =>
      (p.products || []).map((prod) => {
        const qty = sumQty(prod);
        const lineTotal = qty * (Number(prod.price) || 0);
        return {
          purchaseId: p._id,
          createdAt: p.createdAt,
          invoiceNumber: p.invoiceNumber,
          supplier: p.supplier?.name ?? "-",
          productName: prod.productName,
          unitPrice: Number(prod.price) || 0,
          quantity: qty,
          total: lineTotal,
        };
      })
    ) || [];

  const totals = items.reduce(
    (acc, r) => {
      acc.qty += r.quantity;
      acc.amount += r.total;
      acc.lines += 1;
      return acc;
    },
    { qty: 0, amount: 0, lines: 0 }
  );

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });
  return (
    <div>
      <Button onClick={() => setShow(true)} className="bg-primary text-white">
        Purchase Report
      </Button>

      <DialogProvider state={show} setState={setShow} className="w-full max-w-[950px]">
        <div className="w-full rounded-[10px] bg-white">
          <h4 className="p-3 text-[20px] font-[700] text-primary">Purchase Report</h4>
          <HorizontalLine className="my-[10px]" />

          {/* DATE RANGE VIEW */}
          {!showReport && (
            <div className="flex flex-col gap-[12px] p-3">
              <span className="text-[15px] font-[600]">Date Range</span>
              <Calendar
                range
                numberOfMonths={2}
                className="mx-auto"
                value={values}
                onChange={setValues}
              />
              <div className="mt-[12px] flex items-center gap-2">
                <Button onClick={handleFetch} className="bg-primary text-white">
                  {isFetching ? "Loading..." : "Show Report"}
                </Button>
                {isError && (
                  <span className="text-sm text-red-600">Failed to load. Please try again.</span>
                )}
              </div>
            </div>
          )}

          {/* REPORT VIEW */}
          {showReport && (
            <div className="mt-2">
              {/* Controls (hidden on print) */}
              <div className="mb-3 flex flex-wrap items-center gap-2 p-3">
                <Button onClick={handlePrint} className="bg-primary text-white">
                  Print
                  <PiPrinterFill />
                </Button>

                <Button onClick={() => setShowReport(false)}>
                  Change Date Range
                </Button>
              </div>

              <div ref={printRef} className="p-3">
                <img className="mx-auto mb-3 w-[150px]" src="/images/logos/logo.png" alt="logo" />

                <div className="mb-4 text-center">
                  <h2 className="text-[22px] font-bold text-primary">Costing Report</h2>
                  <p className="text-sm text-gray-600">
                    Purchase report of <b>{values[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{values[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>
                {/* Range summary */}
                <div className="mb-3 rounded-md border border-primary/20 bg-primary/10 p-3">
                  <p className="text-sm text-primary">
                    Showing purchases from <b>{values[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{values[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                {/* Totals */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Lines</div>
                    <div className="text-lg font-semibold text-primary">{totals.lines}</div>
                  </div>
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Quantity</div>
                    <div className="text-lg font-semibold text-primary">{totals.qty}</div>
                  </div>
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Amount</div>
                    <div className="text-lg font-semibold text-primary">
                      {formatCurrency(totals.amount)}
                    </div>
                  </div>
                </div>

                {/* Table (category removed) */}
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead className="bg-primary/10 text-primary">
                      <tr>
                        <th className="px-3 py-2 text-left">Date</th>
                        <th className="px-3 py-2 text-left">Invoice</th>
                        <th className="px-3 py-2 text-left">Supplier</th>
                        <th className="px-3 py-2 text-left">Product</th>
                        <th className="px-3 py-2 text-right">Unit Price</th>
                        <th className="px-3 py-2 text-right">Qty</th>
                        <th className="px-3 py-2 text-right">Line Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((r, idx) => (
                        <tr key={idx} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{dateUtils.formatDate(r.createdAt)}</td>
                          <td className="px-3 py-2">{r.invoiceNumber}</td>
                          <td className="px-3 py-2">{r.supplier}</td>
                          <td className="px-3 py-2">{r.productName}</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(r.unitPrice)}</td>
                          <td className="px-3 py-2 text-right">{r.quantity}</td>
                          <td className="px-3 py-2 text-right">{formatCurrency(r.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-primary/10 font-semibold text-primary">
                        <td className="px-3 py-2" colSpan={5}>
                          Grand Total
                        </td>
                        <td className="px-3 py-2 text-right">{totals.qty}</td>
                        <td className="px-3 py-2 text-right">{formatCurrency(totals.amount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Supplier mini-cards */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {purchases.map((p) => (
                    <div key={p._id} className="rounded-md border border-primary/20 p-3">
                      <div className="text-xs opacity-70">Supplier</div>
                      <div className="font-semibold">{p.supplier?.name}</div>
                      <div className="mt-1 text-xs opacity-70">Invoice</div>
                      <div>{p.invoiceNumber}</div>
                      <div className="mt-1 text-xs opacity-70">Created</div>
                      <div>{dateUtils.formatDate(p.createdAt)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogProvider>
    </div>
  );
};

export default PurchaseReportDialog;
