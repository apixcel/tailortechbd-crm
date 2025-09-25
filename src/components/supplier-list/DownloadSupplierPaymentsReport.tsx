"use client";
import { useLazyGetAllSupplierPaymentsQuery } from "@/redux/features/supplierPayment/supplierPayment.api";
import { formatCurrency } from "@/utils/currency";
import dateUtils from "@/utils/date";
import { useMemo, useRef, useState } from "react";
import { PiPrinterFill } from "react-icons/pi";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";
import HorizontalLine from "../ui/HorizontalLine";
import { ISupplierPayment } from "@/types/supplierPayment";

const DownloadSupplierPaymentsReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [dateRange, setDateRange] = useState<[DateObject, DateObject]>([
    new DateObject().subtract(6, "days"),
    new DateObject(),
  ]);

  const [trigger, { data, isFetching, isError }] = useLazyGetAllSupplierPaymentsQuery();

  const handleFetch = async () => {
    const res = await trigger({
      startDate: dateRange[0].format(),
      endDate: dateRange[1].format(),
    });

    if (!res.data?.data?.length) {
      toast.error("No Data Found in this date range");
      setShowReport(false);
    } else {
      setShowReport(true);
    }
  };

  const supplierPayments: ISupplierPayment[] = data?.data || [];

  // ----- Aggregates -----
  const {
    totalInvoiceAmount,
    totalAdvancedAmount,
    totalDuesAmount,
    paymentMethodCount,
    receiptCount,
  } = useMemo(() => {
    const agg = {
      totalInvoiceAmount: 0,
      totalAdvancedAmount: 0,
      totalDuesAmount: 0,
      paymentMethodCount: {} as Record<string, number>,
      attachmentCount: 0,
      receiptCount: 0,
    };

    for (const p of supplierPayments) {
      agg.totalInvoiceAmount += Number(p.invoiceBillAmount) || 0;
      agg.totalAdvancedAmount += Number(p.advancedAmount) || 0;
      agg.totalDuesAmount += Number(p.duesAmount) || 0;

      const method = (p.paymentMethod || "Unknown").toString();
      agg.paymentMethodCount[method] = (agg.paymentMethodCount[method] || 0) + 1;

      if (p.paymentAttachment) agg.attachmentCount += 1;
      if (p.moneyReceipt) agg.receiptCount += 1;
    }
    return agg;
  }, [supplierPayments]);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-primary text-white">
        Supplier Payments Report
      </Button>

      <DialogProvider
        state={openModal}
        setState={setOpenModal}
        className={`w-full ${showReport ? "max-w-[1000px]" : "max-w-[560px]"}`}
      >
        <div className="w-full rounded-[10px] bg-white">
          <h4 className="p-3 text-[20px] font-[700] text-primary">Supplier Payments Report</h4>
          <HorizontalLine className="my-[10px]" />

          {/* Report View */}
          {showReport ? (
            <div className="mt-2">
              {/* Controls */}
              <div className="mb-3 flex flex-wrap items-center gap-2 p-3">
                <Button onClick={handlePrint} className="bg-primary text-white">
                  Print <PiPrinterFill />
                </Button>
                <Button
                  onClick={() => {
                    setShowReport(false);
                  }}
                >
                  Change Date Range
                </Button>
              </div>

              <div ref={printRef} className="p-3">
                <img className="mx-auto mb-3 w-[150px]" src="/images/logos/logo.png" alt="logo" />

                {/* Title + Description */}
                <div className="mb-4 text-center">
                  <h2 className="text-[22px] font-bold text-primary">Supplier Payments Report</h2>
                  <p className="text-sm text-gray-600">
                    Showing supplier payments from <b>{dateRange[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{dateRange[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                {/* Range summary */}
                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Invoice Amount</div>
                    <div className="text-lg font-semibold text-primary">
                      {formatCurrency(totalInvoiceAmount)}
                    </div>
                  </div>
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Advanced (Paid)</div>
                    <div className="text-lg font-semibold text-primary">
                      {formatCurrency(totalAdvancedAmount)}
                    </div>
                  </div>
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Dues</div>
                    <div className="text-lg font-semibold text-primary">
                      {formatCurrency(totalDuesAmount)}
                    </div>
                  </div>
                </div>

                {/* Payment method breakdown */}
                <div className="mb-4 rounded-md border border-gray-200 p-3">
                  <div className="mb-2 text-sm font-semibold text-gray-700">
                    Payment Method Breakdown
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {Object.entries(paymentMethodCount).map(([k, v]) => (
                      <span key={k} className="rounded bg-gray-100 px-2 py-[2px] text-gray-700">
                        {k}: {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="w-full min-w-[700px] text-sm">
                    <thead className="bg-primary/10 text-primary">
                      <tr>
                        <th className="px-3 py-2 text-left">SL</th>
                        <th className="px-3 py-2 text-left">Date</th>
                        <th className="px-3 py-2 text-left">Invoice No</th>
                        <th className="px-3 py-2 text-right">Inv Bill Amount</th>
                        <th className="px-3 py-2 text-right">Advanced Amount</th>
                        <th className="px-3 py-2 text-left">Payment Method</th>
                        <th className="px-3 py-2 text-right">Dues Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierPayments.map((p, i) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{i + 1}</td>
                          <td className="px-3 py-2">
                            {p.date ? dateUtils.formatDate(p.date) : "-"}
                          </td>
                          <td className="px-3 py-2">{p.invoiceNo || "-"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.invoiceBillAmount) || 0)}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.advancedAmount) || 0)}
                          </td>
                          <td className="px-3 py-2">{p.paymentMethod || "-"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.duesAmount) || 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-primary/10 font-semibold text-primary">
                        <td className="px-3 py-2" colSpan={3}>
                          Grand Totals
                        </td>
                        <td className="px-3 py-2 text-right">
                          {formatCurrency(totalInvoiceAmount)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          {formatCurrency(totalAdvancedAmount)}
                        </td>
                        <td className="px-3 py-2" colSpan={1}></td>
                        <td className="px-3 py-2 text-right">{formatCurrency(totalDuesAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Date range picker screen */
            <div className="flex flex-col gap-[12px] p-3">
              <div className="mt-2 flex flex-col items-start justify-start gap-[12px]">
                <span className="text-[15px] font-[600]">Date Range</span>
                <Calendar
                  className="z-3"
                  range
                  numberOfMonths={2}
                  value={dateRange}
                  onChange={(val) => setDateRange(val as [DateObject, DateObject])}
                />
              </div>
              <Button onClick={handleFetch} className="mt-4 w-full bg-primary text-white">
                {isFetching ? "Loading..." : "Show Report"}
              </Button>
              {isError && (
                <span className="text-sm text-red-600">Failed to load. Please try again.</span>
              )}
            </div>
          )}
        </div>
      </DialogProvider>
    </div>
  );
};

export default DownloadSupplierPaymentsReport;
