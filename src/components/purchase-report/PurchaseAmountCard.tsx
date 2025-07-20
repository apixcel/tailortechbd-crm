import { TbCurrencyTaka } from "react-icons/tb";

const PurchaseAmountCard = ({
  value,
  selectedFilter,
  // increase,
}: {
  value: number;
  selectedFilter: string;
  increase: number;
}) => {
  return (
    <div className="min-h-[170px] w-full bg-white p-4 2xl:min-h-[180px]">
      <div className="flex flex-col gap-[5px]">
        <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">Total Purchase Amount</h3>
        <p className="text-[14px] font-semibold text-info capitalize">{selectedFilter}</p>
      </div>

      <div className="mt-8 flex w-full items-center gap-4">
        <div className="w-fit">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[5px] bg-success/10 font-bold text-success">
            <TbCurrencyTaka className="size-[25px] 2xl:size-[40px]" />
          </div>
        </div>
        <div className="h-full w-full">
          <h1 className="text-[20px] font-bold 2xl:text-[25px]">{Math.floor(value)}</h1>
          {/* //! please don't remove this line */}
          {/* <p className="text-[14px] font-bold 2xl:text-[16px]">
            <span className="text-success">{increase}%</span> increase
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default PurchaseAmountCard;
