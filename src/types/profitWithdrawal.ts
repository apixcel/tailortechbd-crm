import { IPartner } from "./partner";

export type TProfitWithdrawalStatus = "paid" | "not_paid";
export interface IProfitWithdrawal {
  _id: string;
  totalProfitAmount: number;
  percentage: number;
  withdrawalDate: string;
  status: TProfitWithdrawalStatus;
  comment: string;
  attachment?: string;
  profitPeriod: {
    startDate: string;
    endDate: string;
  };
  partner: IPartner;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProfitWithdrawalPayload {
  totalProfitAmount: number;
  percentage: number;
  withdrawalDate: string;
  status: string;
  comment: string;
  attachment?: string;
  profitPeriod: {
    startDate: string;
    endDate: string;
  };
  partner: string;
}
