export interface IInvestment {
  _id: string;
  partnerName: string;
  amount: number;
  investmentDate: string;
  type: string;
  note: string;
  attachment: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateInvestmentPayload = Omit<IInvestment, "_id" | "createdAt" | "updatedAt">;
