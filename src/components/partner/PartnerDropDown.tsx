import {SelectionBox} from "@/components";
import { mockPartners } from "@/constants/partnerData";

const partnerOptions = mockPartners.map((partner) => ({
  label: `${partner.partnerName} (${partner.partnerDesignation})`,
  value: partner._id,
}));

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
}

const PartnerDropDown: React.FC<IProps> = ({ onSelect }) => {
  return (
    <div className="flex w-full md:min-w-[300px] flex-col gap-[5px]">
      <span className="text-[12px] font-[700] text-primary">Select Partner</span>
      <SelectionBox
        data={partnerOptions}
        onSelect={(item) => onSelect?.(item)}
        defaultValue={partnerOptions[0]}
        showSearch={true}
      />
    </div>
  );
};

export default PartnerDropDown;
