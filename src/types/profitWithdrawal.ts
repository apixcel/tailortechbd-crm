import { IPartner } from "./partner";

export interface IProfitWithdrawal {
  _id: string;
  withdrawalAmount: number;
  withdrawalDate: string;
  withdrawalDescription: string;
  partner: IPartner;
  createdAt?: string;
  updatedAt?: string;
}
