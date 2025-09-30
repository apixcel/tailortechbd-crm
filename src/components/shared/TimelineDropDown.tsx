import SelectionBox from "../ui/SelectionBox";

const dayFilterings = [
  {
    label: "All Time",
    value: "",
  },
  {
    label: "Today",
    value: "0",
  },
  {
    label: "Last 7 days",
    value: "7",
  },
  {
    label: "Last 30 days",
    value: "30",
  },
];

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
}

const TimelineDropDown: React.FC<IProps> = ({ onSelect }) => {
  return (
    <div className="flex w-[200px] flex-col gap-[5px]">
      <span className="text-[12px] font-[700] text-primary">Timeline</span>
      <SelectionBox
        data={dayFilterings}
        onSelect={(item) => onSelect?.(item)}
        defaultValue={dayFilterings[0]}
        showSearch={false}
      />
    </div>
  );
};

export default TimelineDropDown;
