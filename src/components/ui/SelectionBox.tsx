"use client";

import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export interface ISelectOption {
  label: string;
  value: string;
}

interface SelectionBoxProps {
  data: ISelectOption[];
  onSelect: (item: ISelectOption) => void;
  defaultValue?: ISelectOption;
  displayValue?: string;
  onSeachInputChange?: (value: string) => void;
  defaultSearch?: boolean;
  showSearch?: boolean;
  className?: string;
}

const SelectionBox = ({
  data,
  onSelect,
  defaultValue,
  displayValue,
  defaultSearch = true,
  showSearch = true,
  className,
  onSeachInputChange,
}: SelectionBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ISelectOption | null>(defaultValue || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = defaultSearch
    ? data.filter(
        (item) =>
          item.label.toLowerCase().includes(search.toLowerCase()) ||
          item.value.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (defaultValue) {
      onSelect(defaultValue);
    }
  }, []);

  return (
    <div className={twMerge("relative h-fit w-full", className)} ref={dropdownRef}>
      <button
        type="button"
        className="relative h-full w-full cursor-pointer rounded border border-border-main bg-white px-[12px] py-[6px] text-start text-[12px] font-normal"
        onClick={() => setIsOpen(!isOpen)}
      >
        {(typeof displayValue == "string" ? displayValue : selected?.label) || "Select an option"}
        <FaCaretDown
          className={`absolute top-1/2 right-2 -translate-y-1/2 text-strong duration-[0.4s] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border border-gray-300 bg-white shadow">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search..."
              className="sticky top-0 w-full border-b border-gray-200 bg-white px-3 py-2 outline-none"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onSeachInputChange?.(e.target.value);
              }}
              autoFocus
            />
          ) : (
            ""
          )}
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <div
                key={item.value + i}
                className="cursor-pointer border-b-[1px] border-border-muted px-3 py-2 hover:bg-blue-100"
                onClick={() => {
                  onSelect(item);
                  setSelected(item);
                  setSearch("");
                  setIsOpen(false);
                }}
              >
                {item.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectionBox;
