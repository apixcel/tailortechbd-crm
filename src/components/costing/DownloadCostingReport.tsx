"use client";
import { useLazyGetAllCostingsQuery } from "@/redux/features/costing/costing.api";
import { ICosting } from "@/types";
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

const DownloadCostingReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [values, setValues] = useState([
    new DateObject().subtract(1, "days"),
    new DateObject().add(6, "days"),
  ]);

  const [trigger, { data, isFetching, isError }] = useLazyGetAllCostingsQuery();

  const handleFetch = async () => {
    const res = await trigger({
      startDate: values[0].format(),
      endDate: values[1].format(),
    });

    if (!res.data?.data?.length) {
      toast.error("No Data Found in this date range");
    } else {
      setShowReport(true);
    }
  };

  const costings: ICosting[] = data?.data || [];

  // Build totals
  const totalAmount = costings.reduce((sum, c) => sum + (Number(c.costingAmount) || 0), 0);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-primary text-white">
        Costing Report
      </Button>

      <DialogProvider state={openModal} setState={setOpenModal} className="w-full max-w-[800px]">
        <div className="w-full rounded-[10px] bg-white">
          <h4 className="p-3 text-[20px] font-[700] text-primary">Costing Report</h4>
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
              {/* Controls */}
              <div className="mb-3 flex flex-wrap items-center gap-2 p-3">
                <Button onClick={handlePrint} className="bg-primary text-white">
                  Print
                  <PiPrinterFill />
                </Button>
                <Button onClick={() => setShowReport(false)}>Change Date Range</Button>
              </div>

              <div ref={printRef} className="p-3">
                <img className="mx-auto mb-3 w-[150px]" src="/images/logos/logo.png" alt="logo" />

                <div className="mb-4 text-center">
                  <h2 className="text-[22px] font-bold text-primary">Costing Report</h2>
                  <p className="text-sm text-gray-600">
                    Costing report of <b>{values[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{values[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                <div className="mb-3 rounded-md border border-primary/20 bg-primary/10 p-3">
                  <p className="text-sm text-primary">
                    Showing costings from <b>{values[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{values[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                {/* Totals */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Entries</div>
                    <div className="text-lg font-semibold text-primary">{costings.length}</div>
                  </div>
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Cost</div>
                    <div className="text-lg font-semibold text-primary">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="w-full min-w-[600px] text-sm">
                    <thead className="bg-primary/10 text-primary">
                      <tr>
                        <th className="px-3 py-2 text-left">Date</th>
                        <th className="px-3 py-2 text-left">Type</th>
                        <th className="px-3 py-2 text-left">Note</th>
                        <th className="px-3 py-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costings.map((c) => (
                        <tr key={c._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{dateUtils.formatDate(c.costingDate)}</td>
                          <td className="px-3 py-2">{c.costingType || "-"}</td>
                          <td className="px-3 py-2">{c.note || "-"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(c.costingAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-primary/10 font-semibold text-primary">
                        <td className="px-3 py-2" colSpan={3}>
                          Grand Total
                        </td>
                        <td className="px-3 py-2 text-right">{formatCurrency(totalAmount)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogProvider>
    </div>
  );
};

export default DownloadCostingReport;
