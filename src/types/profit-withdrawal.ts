export interface IProfitWithdrawal {
  _id: string;
  profitPeriod: {
    startDate: string;
    endDate: string;
  };
  totalProfitAmount: number;
  partnerName: string;
  percentage: number;
  status: string;
  comment: string;
  withdrawalDate: string;
  attachment: string;
  createdAt?: string;
  updatedAt?: string;
}
