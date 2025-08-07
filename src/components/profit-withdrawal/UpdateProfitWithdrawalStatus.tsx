import { useUpdateProfiteWithdrawalStatusByIdMutation } from "@/redux/features/profit-withdrawal/profit-withdrawal.api";
import { IProfitWithdrawal, IQueryMutationErrorResponse, TProfitWithdrawalStatus } from "@/types";
import dateUtils from "@/utils/date";
import { useState } from "react";
import { toast } from "sonner";
import Button from "../ui/Button";
import DialogProvider from "../ui/DialogProvider";
import HorizontalLine from "../ui/HorizontalLine";
const statusOptions: { value: TProfitWithdrawalStatus; label: string; color: string }[] = [
  { value: "paid", label: "Paid", color: "bg-success/10 text-success" },
];
const UpdateProfitWithdrawalStatus = ({
  profitWithdrawal,
}: {
  profitWithdrawal: IProfitWithdrawal;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedStatus] = useState<TProfitWithdrawalStatus>(statusOptions[0].value);
  const [update, { isLoading }] = useUpdateProfiteWithdrawalStatusByIdMutation();

  const getSelectedStatusConfig = () => {
    return statusOptions.find((option) => option.value === selectedStatus) || statusOptions[0];
  };

  const handleUpdate = async () => {
    const res = await update({ id: profitWithdrawal._id, payload: { status: selectedStatus } });
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error("Something went wrong");
    }
    setIsOpen(false);
  };

  const newStatus = getSelectedStatusConfig();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-fit cursor-pointer text-start text-[12px] font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
      >
        Change Status
      </button>

      <DialogProvider state={isOpen} setState={setIsOpen} className="w-full max-w-[700px]">
        <div className="w-full rounded-[12px] bg-white p-[24px] shadow-lg">
          {/* Header */}
          <div className="mb-[8px] flex items-center gap-[12px]">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-primary/10">
              <svg
                className="h-[20px] w-[20px] text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div>
              <h5 className="text-[22px] font-[600] text-gray-900">Update Withdrawal Status</h5>
              <p className="mt-[2px] text-[14px] text-gray-500">
                Manage the status of this profit withdrawal request
              </p>
            </div>
          </div>

          <HorizontalLine className="my-[20px]" />

          {/* Withdrawal Information Card */}
          <div className="mb-[24px] rounded-[8px] bg-gray-50 p-[20px]">
            <h6 className="mb-[16px] text-[16px] font-[600] text-gray-800">Withdrawal Details</h6>

            <div className="grid gap-[16px]">
              {/* Profit Period */}
              <div className="flex items-start gap-[12px]">
                <div className="mt-[2px] flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-[6px] bg-blue-100">
                  <svg
                    className="h-[16px] w-[16px] text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="mb-[4px] block text-[14px] font-[600] text-gray-600">
                    Profit Period
                  </span>
                  <span className="text-[15px] font-[500] text-gray-900">
                    {dateUtils.formatDate(profitWithdrawal.profitPeriod?.startDate)} to{" "}
                    {dateUtils.formatDate(profitWithdrawal.profitPeriod?.endDate)}
                  </span>
                </div>
              </div>

              {/* Partner Information */}
              <div className="flex items-start gap-[12px]">
                <div className="mt-[2px] flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-[6px] bg-green-100">
                  <svg
                    className="h-[16px] w-[16px] text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="mb-[4px] block text-[14px] font-[600] text-gray-600">
                    Partner Details
                  </span>
                  <span className="block text-[15px] font-[500] text-gray-900">
                    {profitWithdrawal.partner.partnerName}
                  </span>
                  <span className="text-[13px] text-gray-500">
                    {profitWithdrawal.partner.partnerDesignation}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-start gap-[12px]">
                <div className="mt-[2px] flex h-[32px] w-[32px] flex-shrink-0 items-center justify-center rounded-[6px] bg-purple-100">
                  <svg
                    className="h-[16px] w-[16px] text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="mb-[4px] block text-[14px] font-[600] text-gray-600">
                    Total Amount
                  </span>
                  <span className="text-[18px] font-[700] text-gray-900">
                    ৳{profitWithdrawal.totalProfitAmount?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="mb-[24px]">
            <span className="mb-[8px] block text-[14px] font-[600] text-gray-600">
              Current Status
            </span>
            <span
              className={`inline-flex items-center gap-[6px] rounded-[6px] bg-amber-100 px-[12px] py-[6px] text-[14px] font-[500] text-amber-400 capitalize`}
            >
              {profitWithdrawal.status.replace("_", " ")}
            </span>
          </div>

          {/* Status Selection */}
          <div className="mb-[24px]">
            <span className="mb-[12px] block text-[14px] font-[600] text-gray-600">
              Update Status
            </span>
            <div className="grid grid-cols-2 gap-[8px]">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-[8px] rounded-[8px] border-2 p-[12px] transition-all duration-200 ${
                    selectedStatus === option.value
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    defaultChecked={selectedStatus === option.value}
                    className="h-[16px] w-[16px] text-primary"
                  />
                  <span
                    className={`text-[14px] font-[500] ${selectedStatus === option.value ? "text-primary" : "text-gray-700"}`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Change Preview */}
          {selectedStatus !== (profitWithdrawal.status || "paid") && (
            <div className="mb-[24px] rounded-[8px] border border-blue-200 bg-blue-50 p-[16px]">
              <div className="flex items-center gap-[8px] text-[14px]">
                <svg
                  className="h-[16px] w-[16px] text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-[500] text-blue-700">Status will be changed from</span>
                <span
                  className={`rounded-[4px] bg-amber-100 px-[8px] py-[2px] text-[12px] font-[500] text-amber-500`}
                >
                  Not Paid
                </span>
                <span className="font-[500] text-blue-700">to</span>
                <span
                  className={`rounded-[4px] px-[8px] py-[2px] text-[12px] font-[500] ${newStatus.color}`}
                >
                  {newStatus.label}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-[12px] pt-[8px]">
            <button
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
              className="rounded-[6px] bg-gray-100 px-[20px] py-[10px] text-[14px] font-[500] text-gray-600 transition-colors duration-200 hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <Button
              onClick={handleUpdate}
              disabled={selectedStatus === (profitWithdrawal.status || "paid") || isLoading}
              className={`min-w-[100px] px-[24px] py-[10px] text-[14px] font-[500] ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isLoading ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default UpdateProfitWithdrawalStatus;
