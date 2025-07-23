export interface IDeposit {
  _id: string;
  partnerName: string;
  amount: number;
  source: string;
  depositDate: string;
  type: string;
  note: string;
  attachment: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateDepositPayload = Omit<IDeposit, "_id" | "createdAt" | "updatedAt">;
