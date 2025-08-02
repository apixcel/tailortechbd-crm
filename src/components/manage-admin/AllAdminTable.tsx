"use client";

import { useDebounce } from "@/hooks";
import { useState } from "react";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import HorizontalLine from "@/components/ui/HorizontalLine";
// import {
//   useGetAllAdminsQuery,
//   useToggleAdminAccountActivationMutation,
// } from "@/redux/features/admin/admin.api";

import Pagination from "@/components/ui/Pagination";

import { useAppSelector } from "@/hooks/redux";
import {
  useGetAllAdminsQuery,
  useToggleSuperAdminAccountActivationMutation,
} from "@/redux/features/role/role.api";
import dateUtils from "@/utils/date";
import Image from "next/image";
import { RxMagnifyingGlass } from "react-icons/rx";
import RoleSelector from "../ManageRole/RoleSelector";
import TableDataNotFound from "../ui/TableDataNotFound";
import TableSkeleton from "../ui/TableSkeleton";
import Toggle from "../ui/Toggle";
import CreateAdmin from "./CreateAdmin";
import DeleteAdmin from "./DeleteAdmin";

const tableHead = [
  { label: "Name", field: "name" },
  { label: "Contact", field: "" },
  { label: "Role", field: "" },
  { label: "Activation Status", field: "active" },
  { label: "Date Created", field: "createdAt" },
  { label: "Actions", field: "" },
];

const AllAdminTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const { user: currentUser } = useAppSelector((state) => state.user);

  const [toggleActivation] = useToggleSuperAdminAccountActivationMutation();

  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    role: "",
    fields: "name,slug,price,images,discount,category,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllAdminsQuery({ ...query, searchTerm });
  const userData = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };
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
          <h1 className="text-[16px] font-[600]">Admin List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All {`Admin's`}. There is total{` ${metaData.totalDoc}`} Admins.
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="flex w-full flex-wrap items-center justify-between gap-x-[10px] gap-y-5">
          <div className="flex items-center justify-start gap-[10px]">
            <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
              <input
                type="text"
                className="w-full bg-transparent outline-none"
                placeholder="Search Admin"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <RxMagnifyingGlass />
            </div>
            <RoleSelector onSelected={(role) => setQuery({ ...query, role: role?._id || "" })} />
          </div>

          <CreateAdmin />
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
                userData?.map((user) => (
                  <tr key={user?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-[5px]">
                        <span className="flex aspect-square max-h-[50px] w-[50px] items-center justify-start bg-white">
                          <Image
                            src={user.avatar || "/images/avatar.jpg"}
                            alt={`${user.fullName} image`}
                            width={80}
                            height={80}
                            className="mx-auto h-full w-auto max-w-full object-contain"
                          />
                        </span>
                        <span className="line-clamp-1 text-[14px]">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex flex-col gap-[6px]">
                        <span className="text-[14px]">Email: {user.email || "N/A"}</span>
                        <span className="text-[14px]">Phone: {user.phoneNumber}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      <span className="flex flex-col gap-[6px]">
                        <span className="text-[14px] font-[700]">{user.role?.name}</span>
                        <span className="text-[12px]">{user.role?.actions?.length} Permission</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.isActive ? (
                        <span className="rounded-full bg-success/10 px-[8px] py-[2px] text-[14px] text-success">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-danger/10 px-[8px] py-[2px] text-[14px] text-danger">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">
                        {dateUtils.formateCreateOrUpdateDate(user.createdAt) || "N/A"}
                      </span>
                    </td>
                    <td className="flex items-center justify-start gap-[10px] px-6 py-4">
                      <Toggle
                        disabled={user._id === currentUser?._id}
                        onToggle={() => toggleActivation(user._id)}
                        defaultActive={user.isActive}
                      />
                      <DeleteAdmin admin={user} />
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Admin Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalDocs={metaData.totalDoc}
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </div>
  );
};

export default AllAdminTable;
