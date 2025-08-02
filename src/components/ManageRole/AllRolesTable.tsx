"use client";

import { useDebounce } from "@/hooks";
import { useState } from "react";

import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";

import HorizontalLine from "@/components/ui/HorizontalLine";
import { useGetAllRolesQuery } from "@/redux/features/role/role.api";

import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";

import Link from "next/link";
import { FiEdit, FiUsers } from "react-icons/fi";
import { RxMagnifyingGlass } from "react-icons/rx";
import RoleSelector from "./RoleSelector";

const tableHead = [
  { label: "Name", field: "name" },
  { label: "Total Admin", field: "" },
  { label: "Permission", field: "" },
  { label: "Actions", field: "" },
];

const AllRolesTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });

  const [query, setQuery] = useState<Record<string, string | number | undefined>>({
    page: 1,
    // role: "super-admin",
    fields: "name,email,phoneNumber,isActive,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllRolesQuery({ ...query, searchTerm });
  const roleData = data?.data || [];
  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">All Role List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All {`Roles for admins`}. There is total {roleData.length} Roles.
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="flex w-full flex-wrap items-center justify-between gap-x-[10px] gap-y-5">
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Role Name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>
        
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className="px-6 py-3 text-left text-sm font-semibold text-dashboard uppercase"
                  >
                    {heading.field ? (
                      <button
                        className="flex cursor-pointer items-center gap-1"
                        onClick={() => handleSort(heading.field)}
                      >
                        <span>{heading.label}</span>
                        <span className="flex flex-col text-[10px] leading-[10px]">
                          <FaChevronUp
                            className={`${
                              sort.field === heading.field && sort.order === "asc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                          <FaChevronDown
                            className={`${
                              sort.field === heading.field && sort.order === "desc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                        </span>
                      </button>
                    ) : (
                      heading.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-dashboard/20">
              {isLoading ? (
                <TableSkeleton columns={tableHead.length} />
              ) : data?.data.length ? (
                roleData?.map((role) => (
                  <tr key={role?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{role.name || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-[5px]">
                        <FiUsers />
                        {role.authCount || 0}
                      </span>
                    </td>

                    <td className="px-6 py-4">{role.actions.length}</td>
                    <td className="flex items-center justify-start gap-[10px] px-6 py-4">
                      <span className="flex items-center gap-[10px]">
                        <Link
                          href={`/manage-roles/${role._id}`}
                          className="cursor-pointer text-green-600"
                        >
                          <FiEdit />
                        </Link>
                        <button className="cursor-pointer text-danger">
                          <FaTrashAlt />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Super Admin Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRolesTable;
