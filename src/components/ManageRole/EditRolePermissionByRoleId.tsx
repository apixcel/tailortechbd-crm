"use client";

import {
  useGetAllRoleActionsQuery,
  useGetRoleDetailsByRoleIdQuery,
  useUpdateRoleActionsByRoleIdMutation,
} from "@/redux/features/role/role.api";
import { IQueryMutationErrorResponse, IRoleAction } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { toast } from "sonner";
import Loader from "../ui/Loader";

const EditRolePermissionByRoleId = ({ roleId }: { roleId: string }) => {
  const { data: roleDetailsData, isLoading: roleDetailsLoading } =
    useGetRoleDetailsByRoleIdQuery(roleId);
  const { data: allActionsData, isLoading: allActionsLoading } =
    useGetAllRoleActionsQuery(undefined);

  const [selectedActionIds, setSelectedActionIds] = useState<Set<string>>(new Set());

  const [updateRoleActions, { isLoading: isUpdating }] = useUpdateRoleActionsByRoleIdMutation();

  const router = useRouter();

  useEffect(() => {
    if (roleDetailsData?.data?.actions) {
      setSelectedActionIds(
        new Set(roleDetailsData.data.actions.map((action) => (action as IRoleAction)._id))
      );
    }
  }, [roleDetailsData]);

  const togglePermission = (actionId: string) => {
    setSelectedActionIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(actionId)) {
        newSet.delete(actionId);
      } else {
        newSet.add(actionId);
      }
      return newSet;
    });
  };

  const areAllSelected = allActionsData?.data?.every((action: IRoleAction) =>
    selectedActionIds.has(action._id)
  );

  const toggleSelectAll = () => {
    if (allActionsData?.data) {
      if (areAllSelected) {
        setSelectedActionIds(new Set());
      } else {
        const allIds = allActionsData.data.map((action: IRoleAction) => action._id);
        setSelectedActionIds(new Set(allIds));
      }
    }
  };

  if (roleDetailsLoading || allActionsLoading) {
    return <Loader />;
  }

  const handleSave = async () => {
    if (isUpdating) {
      return;
    }
    const selectedArray = Array.from(selectedActionIds);

    const payload = {
      actions: selectedArray,
    };

    const res = await updateRoleActions({ roleId, payload });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        alert(error.data?.message);
      } else {
        alert("Something went wrong");
      }

      return;
    }
    toast.success("Role permissions updated successfully");
    router.replace("/manage-roles");
  };

  return (
    <div className="rounded-md bg-white p-4">
      <div className="mb-4 flex justify-start">
        <button
          onClick={toggleSelectAll}
          className={`flex h-[24px] w-[24px] items-center justify-center rounded border ${
            areAllSelected ? "border-blue-500 bg-blue-500 text-white" : "border-blue-500"
          }`}
          title={areAllSelected ? "Unselect All" : "Select All"}
        >
          {areAllSelected && <BiCheck size={18} />}
        </button>
        <span className="ml-2 text-sm font-medium text-gray-700">
          {areAllSelected ? "Unselect All" : "Select All"}
        </span>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b py-2">Permission</th>
            <th className="border-b py-2 text-start">Allowed</th>
          </tr>
        </thead>
        <tbody>
          {allActionsData?.data?.map((action) => {
            const isAllowed = selectedActionIds.has(action._id);
            return (
              <tr key={action._id} className="border-b border-border-main hover:bg-gray-50">
                <td className="py-2">{action.label}</td>
                <td className="py-4 text-start">
                  <button
                    onClick={() => togglePermission(action._id)}
                    className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded transition ${
                      isAllowed ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500"
                    }`}
                  >
                    {isAllowed && <BiCheck size={16} />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 text-right">
        <button
          onClick={handleSave}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditRolePermissionByRoleId;
