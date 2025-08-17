export interface IProfitBalance {
  _id: string;
  partnerName: string;
  partnerDesignation: string;
  totalProfitAmount: number;
  lastProfitWithdrawalAmount: number;
  currentProfitBalance: number;
  createdAt?: string;
  updatedAt?: string;
}
