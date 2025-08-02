import { SelectionBox } from "@/components";
import { mockPartners } from "@/constants/partnerData";

const profitWithdrawalOptions = mockPartners.map((partner) => ({
  label: `${partner.partnerName} (${partner.partnerDesignation})`,
  value: partner._id,
}));

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
}

const ProfitWithdrawalDropdown: React.FC<IProps> = ({ onSelect }) => {
  return (
    <div className="flex w-full flex-col gap-[5px] lg:max-w-[300px] xl:max-w-[400px]">
      <span className="text-[12px] font-[700] text-primary">Select Partner</span>
      <SelectionBox
        data={profitWithdrawalOptions}
        onSelect={(item) => onSelect?.(item)}
        defaultValue={profitWithdrawalOptions[0]}
        showSearch={true}
      />
    </div>
  );
};

export default ProfitWithdrawalDropdown;
