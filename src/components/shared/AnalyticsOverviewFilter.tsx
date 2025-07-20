"use client";

import { useRef, useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface AnalyticsOverviewFilterProps {
  options: Option[];
  selected: Option;
  onChange: (option: Option) => void;
}

const AnalyticsOverviewFilter = ({ options, selected, onChange }: AnalyticsOverviewFilterProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <label className="mr-2 text-[14px]">Filter</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h-[28px] w-[90px] cursor-pointer rounded-[3px] border border-quaternary bg-white text-[14px] text-primary transition-colors duration-200 hover:border-primary"
      >
        {selected.label}
      </button>
      {open && (
        <ul className="absolute top-full left-0 z-10 m-0 max-h-[250px] w-full list-none overflow-y-auto border border-quaternary bg-white p-0">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`cursor-pointer px-2 py-2 text-[14px] text-info hover:bg-slate-50 ${
                selected.value === opt.value ? "bg-slate-100 font-semibold text-primary" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnalyticsOverviewFilter;
