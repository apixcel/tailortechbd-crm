import { useDeletePartnerNomineeMutation } from "@/redux/features/partners/partner.api";
import { IPartnerNominee, IQueryMutationErrorResponse } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";

interface IProp {
  nominee: IPartnerNominee;
  onDelete?: () => void;
}
const DeletePartnerNomineeDialog: React.FC<IProp> = ({ nominee, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const canConfirm = inputValue.trim().toUpperCase() === "DELETE";

  const [delteNominee, { isLoading }] = useDeletePartnerNomineeMutation();

  const handleDelete = async () => {
    if (!canConfirm || isLoading) return;

    const res = await delteNominee(nominee._id);
    const err = res.error as IQueryMutationErrorResponse;
    if (err) {
      toast.error(err?.data?.message ?? "Something went wrong");
      return;
    }
    toast.success("Nominee deleted successfully");
    onDelete?.();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-2 rounded-md border bg-danger/10 px-3 py-1 text-sm text-danger hover:text-red-800"
      >
        Delete Nominee
      </Button>

      <DialogProvider state={isOpen} setState={setIsOpen} className="w-full max-w-[500px]">
        <div className="relative w-full transform overflow-hidden rounded-lg bg-white px-6 py-5 shadow-xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
              <svg
                className="h-6 w-6 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
          </div>

          <div className="mt-3 text-center">
            <h3 className="text-lg font-medium text-primary">Delete Nominee</h3>
            <p className="mt-2 text-sm text-muted">
              Are you sure you want to delete{" "}
              <span className="rounded bg-danger/10 px-1 py-0.5 font-medium text-danger">
                “{nominee.fullName}”
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          {/* Confirmation input */}
          <div className="mt-5">
            <label htmlFor="confirmation" className="mb-2 block text-sm font-medium text-gray-700">
              Type{" "}
              <span className="rounded bg-danger/10 px-1 py-0.5 font-mono text-xs text-danger">
                DELETE
              </span>{" "}
              to confirm:
            </label>
            <input
              id="confirmation"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-danger focus:ring-2 focus:ring-danger/20 focus:outline-none"
              placeholder="Type DELETE to confirm"
              autoComplete="off"
            />
          </div>

          {/* Actions */}
          <div className="mt-5 flex w-full items-center justify-between gap-2">
            <Button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setInputValue("");
              }}
              className="w-full cursor-pointer bg-primary/5 text-primary"
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              disabled={!canConfirm || isLoading}
              type="button"
              onClick={handleDelete}
              className="w-full bg-danger hover:bg-danger/90 disabled:bg-danger/50"
            >
              Delete Nominee
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeletePartnerNomineeDialog;
