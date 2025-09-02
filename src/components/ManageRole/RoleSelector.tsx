"use client";

import { useDebounce } from "@/hooks";
import { useGetAllRolesQuery } from "@/redux/features/role/role.api";
import { IRole } from "@/types";
import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface IProps {
  defaultSelectedRole?: IRole | null;
  onSelected?: (role: IRole | null) => void;
  className?: string;
}

const RoleSelector: React.FC<IProps> = ({ defaultSelectedRole, onSelected, className }) => {
  const [selectedRole, setSelectedRole] = useState<IRole | null>(defaultSelectedRole || null);
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetAllRolesQuery({ searchTerm });
  const rolesData = data?.data || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div ref={wrapperRef} className={twMerge("relative w-72", className)}>
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex cursor-pointer items-center justify-between rounded-md border border-gray-300 px-3 py-2 hover:border-blue-500 focus:outline-none"
      >
        <span className="text-sm text-gray-700">{selectedRole?.name || "Select a role"}</span>
        <BiChevronDown className="text-xl text-gray-500" />
      </div>

      {dropdownOpen && (
        <div className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          <div className="border-b border-gray-200 p-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-border-main px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex w-full flex-col">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="mx-2 my-1 h-8 animate-pulse rounded bg-gray-200" />
              ))
            ) : rolesData.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">No roles found</div>
            ) : (
              rolesData.map((role) => (
                <button
                  type="button"
                  key={role._id}
                  onClick={() => {
                    setSelectedRole(role);
                    onSelected?.(role);
                    setDropdownOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-2 text-start text-sm hover:bg-blue-100 ${
                    selectedRole?._id === role._id ? "bg-blue-50" : ""
                  }`}
                >
                  {role.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
