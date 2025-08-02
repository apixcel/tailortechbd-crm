import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { useDeleteSuperAdminByIdMutation } from "@/redux/features/role/role.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IUser } from "@/types/user";
import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

const DeleteSuperAdmin = ({ admin }: { admin: IUser }) => {
  const [deleteSuperAdmin, { isLoading }] = useDeleteSuperAdminByIdMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isConfirmValid = confirmText === admin.fullName;

  const handleDelete = async () => {
    const res = await deleteSuperAdmin(admin._id);
    const error = res.error as IQueruMutationErrorResponse;

    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success("Super Admin deleted successfully");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-full bg-danger/10 p-[4px] text-[15px] text-danger"
      >
        <FaRegTrashAlt />
      </button>
      <DialogProvider state={isOpen} setState={setIsOpen}>
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
          {/* Modal Header */}
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-danger">Delete Super Administrator</h3>
            <p className="mt-2 text-sm text-primary">
              This action cannot be undone. This will permanently delete the super administrator
              account.
            </p>
          </div>

          {/* Modal Body */}
          <div className="space-y-4 p-6">
            {/* Admin Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary">
                Super Administrator Name
              </label>
              <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                <span className="font-medium text-primary">{admin.fullName}</span>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="space-y-2">
              <label htmlFor="confirm" className="block text-sm font-medium text-primary">
                Type <span className="font-mono font-bold text-danger">{admin.fullName}</span> to
                confirm
              </label>
              <input
                ref={inputRef}
                id="confirm"
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="w-full rounded-md border border-danger px-3 py-2 shadow-sm outline-none"
              />
            </div>

            {/* Validation Message */}
            {confirmText && !isConfirmValid && (
              <p className="text-sm text-danger">
                Please type {`"${admin.fullName}"`} exactly to confirm
              </p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 border-t border-gray-200 p-6">
            <Button onClick={() => setIsOpen(false)} className="bg-danger text-white">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              isLoading={isLoading}
              disabled={!isConfirmValid}
              className={`rounded-md px-4 py-2 ${
                isConfirmValid
                  ? "bg-danger text-white hover:bg-danger/90"
                  : "cursor-not-allowed bg-primary text-white"
              } transition-colors`}
            >
              Delete Super Administrator
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteSuperAdmin;
