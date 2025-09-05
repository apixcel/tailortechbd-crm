import { formatNumberWithSuffix } from "@/utils";
import React from "react";
import { MdOutlineTrendingUp } from "react-icons/md";

const TotalSalesAmountCard = ({
  value,
  selectedFilter,
  increase,
}: {
  value: number;
  selectedFilter: string;
  increase: number;
}) => {
  const isIncreased = increase > 0;
  return (
    <div className="w-full bg-white p-4">
      <div className="flex flex-col gap-[5px]">
        <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">Total Sales Amount</h3>
        <p className="text-[14px] font-semibold text-info capitalize">{selectedFilter}</p>
      </div>

      <div className="mt-8 mb-5 flex w-full items-center gap-4">
        <div className="w-fit">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[5px] bg-cyan-200/80 font-bold text-sky-400">
            <MdOutlineTrendingUp className="size-[25px] 2xl:size-[30px]" />
          </div>
        </div>
        <div className="h-full w-full">
          <h1 className="text-[20px] font-bold 2xl:text-[25px]">{formatNumberWithSuffix(value)}</h1>
        </div>
      </div>
      <p
        className={`text-[14px] font-bold 2xl:text-[16px] ${isIncreased ? "text-success" : "text-danger"}`}
      >
        <span>{increase.toFixed(2)}%</span> {isIncreased ? "increase" : "decrease"}
      </p>
    </div>
  );
};

export default TotalSalesAmountCard;
