"use client";

import { useDeleteCostingByIdMutation } from "@/redux/features/costing/costing.api";
import { ICosting, IQueryMutationErrorResponse } from "@/types";
import { useMemo, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";

const DeleteCostingById = ({ costing }: { costing: ICosting }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [deleteCosting, { isLoading }] = useDeleteCostingByIdMutation();

  const displayTitle = useMemo(() => {
    // Human-friendly title for the dialog
    const amount = Number(costing.costingAmount || 0).toLocaleString();
    const date = new Date(costing.costingDate || costing.createdAt).toLocaleDateString();
    const category = costing.costingCategory || "Costing";
    return `${category} • ${amount} • ${date}`;
  }, [costing]);

  const canConfirm = inputValue.trim().toUpperCase() === "DELETE";

  const handleDelete = async () => {
    if (!canConfirm || isLoading) return;
    try {
      await deleteCosting(costing._id).unwrap();
      toast.success("Costing deleted successfully");
      setIsOpen(false);
      setInputValue("");
    } catch (e) {
      const err = e as IQueryMutationErrorResponse;
      toast.error(err?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-danger bg-danger/5 text-danger"
        title="Delete Costing"
        aria-label="Delete Costing"
      >
        <FaRegTrashAlt />
      </button>

      <DialogProvider setState={setIsOpen} state={isOpen}>
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white px-6 py-5 shadow-xl transition-all">
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
            <h3 className="text-lg font-medium text-primary">Delete Costing</h3>
            <p className="mt-2 text-sm text-muted">
              Are you sure you want to delete{" "}
              <span className="rounded bg-danger/10 px-1 py-0.5 font-medium text-danger">
                “{displayTitle}”
              </span>
              ? This action cannot be undone.
            </p>

            {/* Compact costing summary */}
            <div className="mt-4 grid grid-cols-1 gap-2 rounded-md border border-gray-100 bg-gray-50 p-3 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Amount</span>
                <span className="font-medium">
                  {Number(costing.costingAmount || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Date</span>
                <span className="font-medium">
                  {new Date(costing.costingDate || costing.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Category</span>
                <span className="font-medium">{costing.costingCategory || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Prepared By</span>
                <span className="font-medium">
                  {costing.preparedByName || "—"}
                  {costing.preparedByDesignation ? `, ${costing.preparedByDesignation}` : ""}
                </span>
              </div>
              {costing.costingRemark ? (
                <div className="mt-1">
                  <span className="text-muted">Remark: </span>
                  <span className="font-medium">{costing.costingRemark}</span>
                </div>
              ) : null}
            </div>
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
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              isLoading={isLoading}
              disabled={!canConfirm || isLoading}
              type="button"
              className="w-full bg-danger hover:bg-danger/90 disabled:bg-danger/50"
            >
              Delete Costing
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteCostingById;
