"use client";
import { useLazyGetAllProfitWithdrawalQuery } from "@/redux/features/profit-withdrawal/profit-withdrawal.api";
import { IProfitWithdrawal } from "@/types";
import { formatCurrency } from "@/utils/currency";
import dateUtils from "@/utils/date";
import { useRef, useState } from "react";
import { PiPrinterFill } from "react-icons/pi";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import PartnerDropDown from "../partner/PartnerDropDown";
import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";
import HorizontalLine from "../ui/HorizontalLine";

const DownloadProfitWithdrawalReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [dateRange, setDateRange] = useState([
    new DateObject().subtract(1, "days"),
    new DateObject().add(6, "days"),
  ]);

  const [partner, setPartner] = useState<string | null>(null);
  const [trigger, { data, isFetching, isError }] = useLazyGetAllProfitWithdrawalQuery();

  const handleFetch = async () => {
    const res = await trigger({
      startDate: dateRange[0].format(),
      endDate: dateRange[1].format(),
      partner: partner || "",
    });

    if (!res.data?.data?.length) {
      toast.error("No Data Found in this date range");
    } else {
      setShowReport(true);
    }
  };

  const withdrawals: IProfitWithdrawal[] = data?.data || [];

  // totals + breakdown
  const totalAmount = withdrawals.reduce((sum, w) => sum + (Number(w.totalProfitAmount) || 0), 0);
  const paidCount = withdrawals.filter((w) => w.status === "paid").length;
  const notPaidCount = withdrawals.length - paidCount;

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-primary text-white">
        Profit Withdrawal Report
      </Button>

      <DialogProvider
        state={openModal}
        setState={setOpenModal}
        className={`w-full ${showReport ? "max-w-[900px]" : "max-w-[550px]"}`}
      >
        <div className="w-full rounded-[10px] bg-white">
          <h4 className="p-3 text-[20px] font-[700] text-primary">Profit Withdrawal Report</h4>
          <HorizontalLine className="my-[10px]" />

          {/* Report View */}
          {showReport ? (
            <div className="mt-2">
              {/* Controls */}
              <div className="mb-3 flex flex-wrap items-center gap-2 p-3">
                <Button onClick={handlePrint} className="bg-primary text-white">
                  Print
                  <PiPrinterFill />
                </Button>
                <Button
                  onClick={() => {
                    setShowReport(false);
                    setPartner(null);
                  }}
                >
                  Change Date Range
                </Button>
              </div>

              <div ref={printRef} className="p-3">
                <img className="mx-auto mb-3 w-[150px]" src="/images/logos/logo.png" alt="logo" />

                {/* Title + Description (for print clarity) */}
                <div className="mb-4 text-center">
                  <h2 className="text-[22px] font-bold text-primary">Profit Withdrawal Report</h2>
                  <p className="text-sm text-gray-600">
                    Showing profit withdrawals from <b>{dateRange[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{dateRange[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                {/* Range summary */}
                <div className="mb-3 rounded-md border border-primary/20 bg-primary/10 p-3">
                  <p className="text-sm text-primary">
                    Period covered: <b>{dateRange[0].format("MMM DD, YYYY")}</b> -{" "}
                    <b>{dateRange[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                {/* Totals */}
                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Entries</div>
                    <div className="text-lg font-semibold text-primary">{withdrawals.length}</div>
                  </div>
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Withdrawn</div>
                    <div className="text-lg font-semibold text-primary">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Status</div>
                    <div className="text-sm">
                      <span className="mr-3 inline-block rounded bg-green-100 px-2 py-[2px] text-xs text-green-700">
                        Paid: {paidCount}
                      </span>
                      <span className="inline-block rounded bg-amber-100 px-2 py-[2px] text-xs text-amber-700">
                        Not Paid: {notPaidCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="w-full min-w-[900px] text-sm">
                    <thead className="bg-primary/10 text-primary">
                      <tr>
                        <th className="px-3 py-2 text-left">Withdrawal Date</th>
                        <th className="max-w-[150px] px-3 py-2 text-left">Partner</th>
                        <th className="px-3 py-2 text-left">Profit Period</th>
                        <th className="px-3 py-2 text-right">Share</th>
                        <th className="px-3 py-2 text-right">Amount</th>
                        <th className="px-3 py-2 text-left">Status</th>
                        <th className="px-3 py-2 text-left">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.map((w) => (
                        <tr key={w._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{dateUtils.formatDate(w.withdrawalDate)}</td>
                          <td className="max-w-[150px] px-3 py-2">
                            {w.partner?.partnerName || "-"}({w.partner?.partnerDesignation || "-"})
                          </td>

                          <td className="px-3 py-2">
                            {dateUtils.formatDate(w.profitPeriod?.startDate)}-{" "}
                            {dateUtils.formatDate(w.profitPeriod?.endDate)}
                          </td>
                          <td className="px-3 py-2 text-right">{Number(w.percentage) || 0}%</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(w.totalProfitAmount)}
                          </td>
                          <td className="px-3 py-2">
                            {w.status === "paid" ? (
                              <span className="rounded text-center text-xs text-green-700">
                                Paid
                              </span>
                            ) : (
                              <span className="rounded text-center text-xs text-amber-700">
                                Not Paid
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2">{w.comment || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-primary/10 font-semibold text-primary">
                        <td className="px-3 py-2" colSpan={5}>
                          Grand Total
                        </td>
                        <td className="px-3 py-2 text-right">{formatCurrency(totalAmount)}</td>
                        <td className="px-3 py-2" colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[12px] p-3">
              <div className="mx-auto w-fit">
                <PartnerDropDown
                  className="w-full !max-w-[unset]"
                  selectionBoxClassName="w-full"
                  onSelect={(item) => setPartner(item.value)}
                />
                <div className="mt-2 flex flex-col items-start justify-start gap-[12px]">
                  <span className="text-[15px] font-[600]">Date Range</span>
                  <Calendar
                    className="z-3"
                    range
                    numberOfMonths={2}
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
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

export default DownloadProfitWithdrawalReport;
