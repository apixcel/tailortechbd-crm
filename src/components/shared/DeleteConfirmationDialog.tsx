"use client";

import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";
import { IQueryMutationErrorResponse } from "@/types";

interface DeleteConfirmationDialogProps {
  entityId: string;
  entityName: string;
  onDelete: (id: string) => Promise<unknown>;
  entityLabel?: string;
  confirmationKeyword?: string;
  triggerClassName?: string;
  isLoading: boolean;
}

const DeleteConfirmationDialog = ({
  entityId,
  entityName,
  entityLabel = "Item",
  onDelete,
  confirmationKeyword = "DELETE",
  triggerClassName = "",
  isLoading = false,
}: DeleteConfirmationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDelete = async () => {
    if (inputValue !== confirmationKeyword) return;

    const res = (await onDelete(entityId)) as { error?: IQueryMutationErrorResponse };
    const error = res?.error as IQueryMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success(`${entityLabel} deleted successfully`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`center aspect-square w-[30px] cursor-pointer rounded-full border border-danger bg-danger/5 text-danger ${triggerClassName}`}
        title={`Delete ${entityLabel}`}
      >
        <FaRegTrashAlt />
      </button>

      <DialogProvider setState={setIsOpen} state={isOpen}>
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white px-6 py-4 shadow-xl transition-all">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
              <svg
                className="h-6 w-6 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-primary">Delete {entityLabel}</h3>
            <p className="mt-2 text-sm text-muted">
              Are you sure you want to delete{" "}
              <span className="bg-danger/10 p-[2px] font-medium text-danger">
                &quot;{entityName}&quot;
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <div className="mt-4">
            <label htmlFor="confirmation" className="mb-2 block text-sm font-medium text-gray-700">
              Type{" "}
              <span className="rounded bg-danger/10 px-1 py-0.5 font-mono text-xs text-danger">
                {confirmationKeyword}
              </span>{" "}
              to confirm:
            </label>
            <input
              id="confirmation"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-danger focus:ring-2 focus:ring-danger/20 focus:outline-none"
              placeholder={`Type ${confirmationKeyword} to confirm`}
              autoComplete="off"
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary/5 text-primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              isLoading={isLoading}
              disabled={inputValue !== confirmationKeyword}
              type="button"
              className="w-full bg-danger hover:bg-danger/90 disabled:bg-danger/50"
            >
              Delete {entityLabel}
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteConfirmationDialog;
