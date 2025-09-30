import { IPartner } from "./partner";

export interface IInvestment {
  _id: string;
  investmentAmount: number;
  investmentDate: string;
  description: string;
  remarks: string;
  transactionMethod?: string;
  partner: IPartner;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInvestmentPayload {
  investmentAmount: number;
  investmentDate: string;
  description: string;
  partner: string;
  transactionMethod: string;
  remarks: string;
}
