"use client";
import { useLazyGetAllInvestmentsQuery } from "@/redux/features/investments/investments.api";
import { IInvestment } from "@/types";
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

const DownloadInvestmentReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [dateRange, setDateRange] = useState([
    new DateObject().subtract(1, "days"),
    new DateObject().add(6, "days"),
  ]);

  const [partner, setPartner] = useState<string | null>(null);

  const [trigger, { data, isFetching, isError }] = useLazyGetAllInvestmentsQuery();

  const handleFetch = async () => {
    const query = {
      startDate: dateRange[0].format(),
      endDate: dateRange[1].format(),
      partner: partner || "",
    };
    const res = await trigger(query);

    if (!res.data?.data?.length) {
      toast.error("No Data Found in this date range");
    } else {
      setShowReport(true);
    }
  };

  const investments: IInvestment[] = [...(data?.data || [])].sort(
    (a, b) =>
      new Date(a.investmentDate || "").getTime() - new Date(b.investmentDate || "").getTime()
  );
  console.log(investments);

  const totalAmount = investments.reduce(
    (sum, inv) => sum + (Number(inv.investmentAmount) || 0),
    0
  );

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-primary text-white">
        Investment Report
      </Button>

      <DialogProvider
        state={openModal}
        setState={setOpenModal}
        className={`w-full ${showReport ? "max-w-[900px]" : "max-w-[550px]"}`}
      >
        <div className="w-full rounded-[6px] bg-white">
          <h4 className="p-3 text-[20px] font-[700] text-primary">Investment Report</h4>
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

                <div className="mb-4 text-center">
                  <h2 className="text-[22px] font-bold text-primary">Investment Report</h2>
                  <p className="text-sm text-gray-600">
                    Investment report from <b>{dateRange[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{dateRange[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                <div className="mb-3 rounded-md border border-primary/20 bg-primary/10 p-3">
                  <p className="text-sm text-primary">
                    Showing investments from <b>{dateRange[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{dateRange[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                {/* Totals */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Entries</div>
                    <div className="text-lg font-semibold text-primary">{investments.length}</div>
                  </div>
                  <div className="rounded-md border border-primary/20 p-3">
                    <div className="text-xs opacity-70">Total Investment</div>
                    <div className="text-lg font-semibold text-primary">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="w-full min-w-[700px] text-sm">
                    <thead className="bg-primary/10 text-primary">
                      <tr>
                        <th className="px-3 py-2 text-left">Date</th>
                        <th className="px-3 py-2 text-left">Partner</th>
                        <th className="px-3 py-2 text-left">Designation</th>
                        <th className="px-3 py-2 text-left">Note</th>
                        <th className="px-3 py-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map((inv) => (
                        <tr key={inv._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{dateUtils.formatDate(inv.investmentDate)}</td>
                          <td className="px-3 py-2">{inv.partner?.partnerName || "-"}</td>
                          <td className="px-3 py-2">{inv.partner?.partnerDesignation || "-"}</td>
                          <td className="px-3 py-2">{inv.description || "-"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(inv.investmentAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-primary/10 font-semibold text-primary">
                        <td className="px-3 py-2" colSpan={4}>
                          Grand Total
                        </td>
                        <td className="px-3 py-2 text-right">{formatCurrency(totalAmount)}</td>
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

export default DownloadInvestmentReport;
