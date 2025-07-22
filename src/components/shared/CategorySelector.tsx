import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useState } from "react";
import { useDebounce } from "@/hooks";

import { SelectionBox } from "@/components";
import { ICategory } from "@/types";

type TOnSelect = (item: { label: string; value: string }) => void;
interface IProps {
  onSelect: TOnSelect;
  category?: string;
}

const SubCategorySelector = ({
  parentId,
  parentLabel,
  onSelect,
}: {
  parentId: string;
  parentLabel?: string;
  onSelect: TOnSelect;
}) => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const { data } = useGetAllCategoriesQuery({ mode: "normal", searchTerm, parent: parentId });
  const formatedData = data?.data.map((category) => ({
    label: category.label,
    value: category._id,
  }));

  return (
    <div className="flex flex-col gap-[8px]">
      <span className="text-[14px] font-[500]">
        {parentLabel ? "Sub Category of " + parentLabel + " (optional)" : "Sub Category (optional)"}
      </span>
      <SelectionBox
        defaultSearch={false}
        onSeachInputChange={setSearchTerm}
        data={formatedData || []}
        onSelect={(item) => {
          const category = data?.data.find((category) => category._id === item.value);
          onSelect(item);
          setSearchTerm("");

          if (category) {
            setSelectedCategory(category);
          }
        }}
      />
      {selectedCategory?.subCount ? (
        <SubCategorySelector
          parentLabel={selectedCategory.label}
          parentId={selectedCategory._id}
          onSelect={onSelect}
        />
      ) : null}
    </div>
  );
};

const CategorySelector: React.FC<IProps> = ({ onSelect, category }) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [searchTerm, setSearchTerm] = useDebounce("");
  const { data } = useGetAllCategoriesQuery({
    mode: "normal",
    searchTerm,
  });
  const formatedData = data?.data.map((category) => ({
    label: category.label,
    value: category._id,
  }));

  return (
    <div className="flex flex-col gap-[10px]">
      <SelectionBox
        defaultSearch={false}
        onSeachInputChange={setSearchTerm}
        displayValue={selectedCategory?.label || category}
        data={formatedData || []}
        onSelect={(item) => {
          const category = data?.data.find((category) => category._id === item.value);
          onSelect(item);
          setSearchTerm("");

          if (category) {
            setSelectedCategory(category);
          }
        }}
      />

      {selectedCategory?.subCount ? (
        <SubCategorySelector
          parentLabel={selectedCategory.label}
          parentId={selectedCategory._id}
          onSelect={onSelect}
        />
      ) : null}
    </div>
  );
};

export default CategorySelector;
