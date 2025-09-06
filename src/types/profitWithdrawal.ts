import { IPartner } from "./partner";

export type TProfitWithdrawalStatus = "paid" | "not_paid";
export interface IProfitWithdrawal {
  _id: string;
  totalProfitAmount: number;
  percentage: number;
  withdrawalDate: string;
  paymentMethod: string;
  status: TProfitWithdrawalStatus;
  comment: string;
  attachment?: string;
  withdrawalAmount: number;
  partner: IPartner;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProfitWithdrawalPayload {
  percentage: number;
  status: string;
  comment: string;
  attachment?: string;
  withdrawalAmount: number;
  partner: string;
}
