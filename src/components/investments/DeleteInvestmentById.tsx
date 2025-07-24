"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { useDeleteInvestmentByIdMutation } from "@/redux/features/investments/investments.api";
import { IQueruMutationErrorResponse } from "@/types";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
const DeleteInvestmentById = ({
  investmentId,
  investmentName,
}: {
  investmentId: string;
  investmentName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [deleteInvestment, { isLoading }] = useDeleteInvestmentByIdMutation();

  const handleDelete = async () => {
    if (inputValue !== "DELETE") return;
    const res = await deleteInvestment(investmentId);
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success("Investment deleted successfully");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-danger bg-danger/5 text-danger"
      >
        <FaRegTrashAlt />
      </button>
      <DialogProvider setState={setIsOpen} state={isOpen}>
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white px-6 py-4 shadow-xl transition-all">
          {/* Header */}
          <div className="">
            <div className="flex items-center">
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
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-primary">Delete Investment</h3>
              <div className="mt-2">
                <p className="text-sm text-muted">
                  Are you sure you want to delete{" "}
                  <span className="bg-danger/10 p-[2px] font-medium text-danger">
                    &quot;{investmentName}&quot;
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="mt-4">
              <label
                htmlFor="confirmation"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
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
          </div>

          <div className="mt-[20px] flex w-full items-center justify-between gap-[10px]">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full cursor-pointer bg-primary/5 text-primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              isLoading={isLoading}
              disabled={inputValue !== "DELETE"}
              type="button"
              className="w-full bg-danger hover:bg-danger/90 disabled:bg-danger/50"
            >
              Delete Investment
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteInvestmentById;
