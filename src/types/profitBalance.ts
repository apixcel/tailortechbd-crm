import { IPartner } from "./partner";

export type TProfitBalance = IPartner & {
  profit: number;
  sharedProfit: number;
  totalWithdrawal: number;
  currentProfitBalance: number;
  lastWithdrawal: number;
};
