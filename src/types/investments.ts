import { IPartner } from "./partner";

export interface IInvestment {
  _id: string;
  investmentAmount: number;
  investmentDate: string;
  note: string;
  attachment?: string;
  partner: IPartner;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInvestmentPayload {
  investmentAmount: number;
  investmentDate: string;
  note: string;
  partner: string;
  attachment?: string;
}
