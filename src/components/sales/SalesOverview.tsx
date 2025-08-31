"use client";

import {
  OverallInvestmentStatistics,
  OverallProfitWithdrawalsStatistics,
  OverallSalesStatistics,
  ProductSalesOverview,
  SalesCapitalsCard,
  SalesExpenseCard,
  SalesOverviewChart,
  SalesProfitAmountCard,
  TotalSalesAmountCard,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { useGetFinancialOverViewQuery } from "@/redux/features/statistics/statistics.api";
import { DateObject } from "react-multi-date-picker";
import CapitalFlowChart from "../capitals/CapitalFlowChart";

// Dummy sales chart data
const salesChartData = [
  { time: "2025-07-01", totalSales: 120, totalSalesAmount: 24000, totalSalesProfit: 6000 },
  { time: "2025-07-02", totalSales: 140, totalSalesAmount: 28000, totalSalesProfit: 7000 },
  { time: "2025-07-03", totalSales: 130, totalSalesAmount: 26000, totalSalesProfit: 6500 },
  { time: "2025-07-04", totalSales: 160, totalSalesAmount: 32000, totalSalesProfit: 8000 },
  { time: "2025-07-05", totalSales: 150, totalSalesAmount: 30000, totalSalesProfit: 7500 },
  { time: "2025-07-06", totalSales: 170, totalSalesAmount: 34000, totalSalesProfit: 8500 },
  { time: "2025-07-07", totalSales: 180, totalSalesAmount: 36000, totalSalesProfit: 9000 },
  { time: "2025-07-08", totalSales: 160, totalSalesAmount: 32000, totalSalesProfit: 8000 },
  { time: "2025-07-09", totalSales: 190, totalSalesAmount: 38000, totalSalesProfit: 9500 },
  { time: "2025-07-10", totalSales: 200, totalSalesAmount: 40000, totalSalesProfit: 10000 },
  { time: "2025-07-11", totalSales: 210, totalSalesAmount: 42000, totalSalesProfit: 10500 },
  { time: "2025-07-12", totalSales: 190, totalSalesAmount: 38000, totalSalesProfit: 9500 },
  { time: "2025-07-13", totalSales: 220, totalSalesAmount: 44000, totalSalesProfit: 11000 },
  { time: "2025-07-14", totalSales: 230, totalSalesAmount: 46000, totalSalesProfit: 11500 },
  { time: "2025-07-15", totalSales: 240, totalSalesAmount: 48000, totalSalesProfit: 12000 },
];

interface SalesOverviewProps {
  selectedRange: DateObject[] | undefined;
}

const SalesOverview = ({ selectedRange }: SalesOverviewProps) => {
  // Filter sales data by selected date range
  const filteredData = salesChartData.filter((item) => {
    if (!selectedRange || selectedRange.length !== 2) return true;

    const from = selectedRange[0].toDate();
    const to = selectedRange[1].toDate();
    const itemDate = new Date(item.time);

    return itemDate >= from && itemDate <= to;
  });

  // Calculate totals
  const totals = {
    capitals: 50000, // Static dummy data
    sales: filteredData.reduce((acc, item) => acc + item.totalSalesAmount, 0),
    expense: 15000, // You can calculate based on other data if needed
    profit: filteredData.reduce((acc, item) => acc + item.totalSalesProfit, 0),
  };

  // Format the selected filter label
  const formatDate = (dateObj: DateObject) => dateObj?.format("DD-MM-YYYY");

  const selectedFilterLabel =
    selectedRange && selectedRange.length === 2
      ? `${formatDate(selectedRange[0])} to ${formatDate(selectedRange[1])}`
      : "Custom";

  const { data } = useGetFinancialOverViewQuery({
    startDate: selectedRange?.[0]?.format("YYYY-MM-DD"),
    endDate: selectedRange?.[1]?.format("YYYY-MM-DD"),
  });

  const financeOverview = data?.data;
  const { user } = useAppSelector((state) => state.user);
  return (
    <section className="flex flex-col gap-4">
      <div className="flex h-full items-stretch justify-between gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex h-full items-center justify-between bg-white p-4">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
              <span className="animate-waving-hand text-2xl">👋</span>
              <span>
                Hi, <span className="mr-1 font-bold">{user?.fullName}!</span> Welcome to the
                Dashboard.
              </span>
            </h1>
          </div>

          <div className="grid min-h-[250px] flex-1 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            <SalesCapitalsCard
              value={financeOverview?.capital?.amount || 0}
              selectedFilter={selectedFilterLabel}
              increase={financeOverview?.capital?.increasePct || 0}
            />
            <TotalSalesAmountCard
              value={financeOverview?.sales?.amount || 0}
              selectedFilter={selectedFilterLabel}
              increase={financeOverview?.sales?.increasePct || 0}
            />
            <SalesExpenseCard
              value={financeOverview?.expenses?.amount || 0}
              selectedFilter={selectedFilterLabel}
              increase={financeOverview?.expenses?.increasePct || 0}
            />
            <SalesProfitAmountCard
              value={financeOverview?.profit?.amount || 0}
              selectedFilter={selectedFilterLabel}
              increase={financeOverview?.profit?.increasePct || 0}
            />
          </div>
        </div>

        <SalesOverviewChart
          sales={totals.sales}
          expense={totals.expense}
          selectedFilterLabel={selectedFilterLabel}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-2">
        <CapitalFlowChart selectedFilter={selectedFilterLabel} />
        <OverallSalesStatistics />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-2">
        <OverallInvestmentStatistics />
        <OverallProfitWithdrawalsStatistics />
      </div>

      <ProductSalesOverview />
    </section>
  );
};

export default SalesOverview;
