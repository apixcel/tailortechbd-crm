"use client";
import React, { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface RoleDropdownProps {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RoleDropdown = ({
  options,
  selected,
  onChange,
  placeholder = "Select Role",
}: RoleDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label || placeholder;

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
    <div ref={dropdownRef} className="relative w-full">
      <span className="mb-1 block text-[12px] text-gray-700">Role:</span>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full cursor-pointer border border-border-main bg-white px-4 py-2 text-left text-[12px] text-gray-700"
      >
        {selectedLabel}
      </button>
      {open && (
        <ul className="absolute top-full left-0 z-10 mt-1 max-h-60 w-full overflow-auto border border-border-main bg-white text-[12px] shadow-md">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-slate-50 ${
                selected === opt.value ? "bg-slate-100 font-medium text-primary" : ""
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

export default RoleDropdown;
