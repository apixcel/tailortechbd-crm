export interface IProfitDistribution {
  _id: string;
  period: {
    startDate: string;
    endDate: string;
  };
  totalProfit: number;
  partnerName: string;
  percentage: number;
  status: string;
  comment: string;
  distributionDate: string;
  attachment: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProfitDistributionPayload = Omit<
  IProfitDistribution,
  "_id" | "createdAt" | "updatedAt"
>;
