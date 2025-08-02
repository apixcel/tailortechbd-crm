import { IPartner } from "./partner";

export interface IInvestment {
  _id: string;
  investmentAmount: number;
  investmentDate: string;
  investmentDescription: string;
  partner: IPartner;
  createdAt?: string;
  updatedAt?: string;
}
