import { ROLE_ACTIONS } from "@/constants/roleAction";
import { useAppSelector } from "@/hooks";
import { useDeleteRoleByIdMutation } from "@/redux/features/role/role.api";
import { IQueryMutationErrorResponse, IRole } from "@/types";
import { hasPermission } from "@/utils/role";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";

interface IProps {
  role: IRole;
}

const DeleteRole: React.FC<IProps> = ({ role }) => {
  const [open, setOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [deleteRole, { isLoading }] = useDeleteRoleByIdMutation();

  const { role: myRole } = useAppSelector((state) => state.user);

  const hasAccess = hasPermission(ROLE_ACTIONS.MANAGE_ROLES.value, myRole);

  const handleDelete = async () => {
    try {
      const res = await deleteRole(role._id);
      const error = res.error as IQueryMutationErrorResponse;
      if (error) {
        if (error.data?.message) {
          toast.error(error.data?.message);
        } else {
          toast.error("Something went wrong");
        }
        return;
      }
      toast.success("Role deleted successfully");
      setOpen(false);
      setConfirmationText("");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!hasAccess) {
    return <></>;
  }

  return (
    <>
      <button className="cursor-pointer text-danger" onClick={() => setOpen(true)}>
        <FaTrashAlt />
      </button>

      <DialogProvider state={open} setState={setOpen} className="w-full max-w-md">
        <div className="bg-white p-6">
          <h2 className="mb-2 text-lg font-[700] text-danger">Confirm Deletion</h2>
          <p className="mb-4 text-sm text-primary">
            To delete the role{" "}
            <span className="bg-danger/20 px-[5px] font-medium text-danger">{role.name}</span>,
            please type the role name below.
          </p>

          <span className="mb-[15px] flex w-full bg-danger/10 p-[10px] text-[14px] text-danger">
            ⚠️ Warning: Deleting this role may cause some admin&apos;s with this role may lose their
            permission to access all the features.
          </span>
          <input
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
            placeholder="Enter role name"
          />

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirmationText("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              className="bg-danger text-white"
              disabled={confirmationText !== role.name || isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Role"}
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteRole;
